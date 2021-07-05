import firebase, { firestore, storage } from "../../firebase/firebase";
import * as actionTypes from "../../redux/actions/actionTypes";
import { successNotification } from "../../utils/notifications";

export const getAllPostersId = () => {
  let posters = [];
  return firestore
    .collection("posters")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        posters.push(doc.id);
      });
    })
    .then(() => JSON.stringify(posters))
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
};

export const fetchPostersbyCategory = (category) => {
  let posters = [];
  let promises = [];
  let lastVisible;
  return firestore
    .collection("posters")
    .where("category", "==", category)
    .where("visibility", "==", true)
    .orderBy("ratingsCount", "desc")
    .limit(5)
    .get()
    .then((querySnapshot) => {
      console.log(querySnapshot);
      lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      querySnapshot.forEach((doc) => {
        let posterData = doc.data();
        posterData.id = doc.id;
        if (posterData.authorRef) {
          promises.push(
            posterData.authorRef.get().then((res) => {
              posterData.authorData = res.data();
            })
          );
        }
        posters.push(posterData);
      });
      return Promise.all(promises);
    })
    .then(() => {
      // return JSON.stringify(posters);
      return { posters, lastVisible };
    })
    .catch((err) => new Error(err.message));
};

export const fetchNextPostersbyCategory = (category, last) => {
  let posters = [];
  let promises = [];
  let lastVisible;
  return firestore
    .collection("posters")
    .where("category", "==", category)
    .where("visibility", "==", true)
    .orderBy("ratingsCount", "desc")
    .startAfter(last)
    .limit(5)
    .get()
    .then((querySnapshot) => {
      if (last) lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      else lastVisible = null;
      querySnapshot.forEach((doc) => {
        let posterData = doc.data();
        posterData.id = doc.id;
        if (posterData.authorRef) {
          promises.push(
            posterData.authorRef.get().then((res) => {
              posterData.authorData = res.data();
            })
          );
        }
        posters.push(posterData);
      });
      return Promise.all(promises);
    })
    .then(() => {
      // return JSON.stringify(posters);
      return { posters, lastVisible };
    })
    .catch((err) => new Error(err.message));
};

export const fetchPostersbyId = (documentId) => {
  let promises = [];
  let poster;
  return firestore
    .collection("posters")
    .doc(documentId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        poster = doc.data();
        poster.id = doc.id;
        promises.push(
          poster.authorRef.get().then((res) => {
            poster.authorData = res.data();
          })
        );
        return Promise.all(promises);
      } else return {};
    })
    .then(() => {
      return JSON.stringify(poster);
    });
};

export const fetchPosters = () => {
  let posters = [];
  let promises = [];
  let lastVisible;
  return firestore
    .collection("posters")
    .where("visibility", "==", true)
    .orderBy("ratingsCount", "desc")
    .limit(5)
    .get()
    .then((querySnapshot) => {
      lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      querySnapshot.forEach((doc) => {
        let posterData = doc.data();
        posterData.id = doc.id;
        if (posterData.authorRef) {
          promises.push(
            posterData.authorRef.get().then((res) => {
              posterData.authorData = res.data();
            })
          );
        }
        posters.push(posterData);
      });
      return Promise.all(promises);
    })
    .then(() => {
      // return JSON.stringify(posters);
      return { posters, lastVisible };
    })
    .catch((err) => new Error(err.message));
};

export const fetchNextPosters = (last) => {
  let posters = [];
  let promises = [];
  let lastVisible;
  return firestore
    .collection("posters")
    .where("visibility", "==", true)
    .orderBy("ratingsCount", "desc")
    .startAfter(last)
    .limit(5)
    .get()
    .then((querySnapshot) => {
      if (last) lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      else lastVisible = null;

      querySnapshot.forEach((doc) => {
        let posterData = doc.data();
        posterData.id = doc.id;
        if (posterData.authorRef) {
          promises.push(
            posterData.authorRef.get().then((res) => {
              posterData.authorData = res.data();
            })
          );
        }
        posters.push(posterData);
      });
      return Promise.all(promises);
    })
    .then(() => {
      // return JSON.stringify(posters);
      return { posters, lastVisible };
    })
    .catch((err) => new Error(err.message));
};

export const fetchPostersByUserId = (userId) => {
  const posters = [];
  return firestore
    .collection("posters")
    .where("userId", "==", userId)
    .orderBy("date", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        posters.push({ ...doc.data(), id: doc.id });
      });
    })
    .then(() => {
      return JSON.stringify(posters);
    });
};

export const fetchPostersByUserId2 = (userId) => {
  return (dispatch) => {
    const unsubscribe = firestore
      .collection("posters")
      .where("userId", "==", userId)
      .orderBy("date", "desc")
      .onSnapshot((querySnapshot) => {
        let posters = [];
        querySnapshot.forEach((doc) => {
          posters.push({ id: doc.id, ...doc.data() });
        });
        dispatch({
          type: actionTypes.FETCH_MY_POSTERS,
          posters: posters,
        });
      });
    return unsubscribe;
  };
};

export const fetchPostersByUserId3 = (userId) => {
  return (dispatch) => {
    const unsubscribe = firestore
      .collection("posters")
      .where("userId", "==", userId)
      .where("visibility", "==", true)
      .orderBy("date", "desc")
      .onSnapshot((querySnapshot) => {
        let posters = [];
        querySnapshot.forEach((doc) => {
          posters.push({ id: doc.id, ...doc.data() });
        });
        dispatch({
          type: actionTypes.FETCH_MY_POSTERS,
          posters: posters,
        });
      });
    return unsubscribe;
  };
};
export const uploadPoster = (poster) => {
  firestore
    .collection("posters")
    .add({
      title: poster.title,
      description: poster.description,
      category: poster.category,
      works: [],
      ratings: [],
      userId: poster.userId,
      visibility: true,
      ratingsCount: 0,
      authorRef: firestore.doc(`/users/${poster.userId}`),
      price: parseInt(poster.price),
      location: poster.location,
      phoneNumber: poster.phoneNumber,
      date: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((docRef) => {
      const promises = [];
      const urls = [];
      poster.photos.forEach((file) => {
        const name = Date.now().toString() + Math.random(3).toFixed(3);
        const uploadTask = storage
          .ref()
          .child(`${poster.userId}/posters/${docRef.id}/${name}`)
          .put(file);
        promises.push(uploadTask);
        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (snapshot.state === firebase.storage.TaskState.RUNNING) {
              console.log(`Progress: ${progress}%`);
            }
          },
          (error) => console.log(error.code),
          async () => {
            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
            // do something with the url
            firestore
              .collection("posters")
              .doc(docRef.id)
              .update({
                works: firebase.firestore.FieldValue.arrayUnion(downloadURL),
              });
          }
        );
      });
      return Promise.all(promises)
        .then(() => {
          successNotification("Success", "Poster Uploaded");
          console.log(urls);
          return urls;
        })
        .catch((err) => console.log(err.code));
    });
};

export const updatePoster = (poster) => {
  return firestore
    .collection("posters")
    .doc(poster.id)
    .update({
      title: poster.title,
      description: [poster.description],
      category: poster.category,
      price: parseInt(poster.price),
      location: poster.location,
      phoneNumber: poster.phoneNumber,
    })
    .then(() => {
      successNotification("Success", "Successfully Updated Poster");
    })
    .catch((e) => {
      return new Error(e.message);
    });
};

export const updatePosterVisibility = (id, visibility) => {
  return firestore
    .collection("posters")
    .doc(id)
    .update({
      visibility,
    })
    .then(() => {
      successNotification("Success", "Successfully Updated Poster");
    })
    .catch((e) => {
      return new Error(e.message);
    });
};

export const deletePoster = (id) => {
  firestore
    .collection("posters")
    .doc(id)
    .delete()
    .then(() => {
      successNotification("Success", "Poster Deleted");
    })
    .catch((e) => {
      throw new Error(e.message);
    });
};

export const resetPosters = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.RESET_POSTERS });
  };
};
