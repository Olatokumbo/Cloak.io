import { firestore, storage, auth } from "../../firebase/firebase";
import * as actionTypes from "../../redux/actions/actionTypes";
import { successNotification } from "../../utils/notifications";

export const getAllProfileId = () => {
  const users = [];
  return firestore
    .collection("users")
    .get()
    .then((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        users.push(doc.id);
      });
    })
    .then(() => {
      return JSON.stringify(users);
    });
};

export const fetchUser = (userId) => {
  return firestore
    .collection("users")
    .doc(userId)
    .get()
    .then((doc) => {
      return JSON.stringify({ ...doc.data(), id: doc.id });
    })
    .catch((e) => {
      return new Error(e.message);
    });
};

export const updateProfileDescription = (profile) => {
  return firestore
    .collection("users")
    .doc(profile.id)
    .update({
      description: profile.description,
    })
    .then(() => {
      successNotification("Success", "Successfully Updated Your Description");
    })
    .catch((e) => {
      throw new Error(e.message);
    });
};

export const updateProfileSocialLink = (
  twitterUrl,
  facebookUrl,
  instagramUrl,
  userId
) => {
  return firestore
    .collection("users")
    .doc(userId)
    .update({
      twitterUrl,
      facebookUrl,
      instagramUrl,
    })
    .then(() => {
      successNotification("Success", "Updated");
    })
    .catch((e) => {
      throw new Error(e.message);
    });
};

export const getProfileDetails = (id) => {
  return (dispatch) => {
    const unsubscribe = firestore
      .collection("users")
      .doc(id)
      .onSnapshot((doc) => {
        console.log(doc);
        dispatch({
          type: actionTypes.FETCH_PROFILE,
          user: { id: doc.id, ...doc.data() },
        });
      });
    return unsubscribe;
  };
};

export const uploadProfilePhoto = (userId, file) => {
  let uploadTask = storage.ref(`${userId}/profile/${userId}`).put(file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
    },
    (error) => {
      // Handle unsuccessful uploads
      console.log(error);
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log("File available at", downloadURL);
        updatePhotoUrl(userId, downloadURL);
      });
    }
  );
};

const updatePhotoUrl = (userId, photoURL) => {
  return firestore
    .collection("users")
    .doc(userId)
    .update({
      photoURL,
    })
    .then(() => {
      auth.currentUser.updateProfile({
        photoURL,
      });
    });
};

export const resetProfile = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.RESET_PROFILE });
  };
};
