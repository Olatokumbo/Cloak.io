import firebase, { firestore, storage } from "../../firebase/firebase";

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
  return firestore
    .collection("posters")
    .where("category", "==", category)
    .get()
    .then((querySnapshot) => {
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
      return JSON.stringify(posters);
    })
    .catch((err) => err.message);
};

export const fetchPostersbyId = (documentId) => {
  let promises = [];
  let poster;
  return firestore
    .collection("posters")
    .doc(documentId)
    .get()
    .then((doc) => {
      poster = doc.data();
      poster.id = doc.id;
      promises.push(
        poster.authorRef.get().then((res) => {
          poster.authorData = res.data();
        })
      );
      return Promise.all(promises);
    })
    .then(() => {
      return JSON.stringify(poster);
    });
};

export const fetchPosters = () => {
  let posters = [];
  let promises = [];
  return firestore
    .collection("posters")
    .limit(10)
    .get()
    .then((querySnapshot) => {
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
      return JSON.stringify(posters);
    })
    .catch((err) => err.message);
};

export const fetchPostersByUserId = (userId) => {
  const posters = [];
  return firestore
    .collection("posters")
    .where("userId", "==", userId)
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
export const uploadPoster = (poster) => {
  // return () => {
  const promises = [];
  const photoURLs = [];
  poster.photos.forEach((file) => {
    const name = Date.now().toString() + Math.random(3).toFixed(3);
    var path = `${poster.userId}/posters/${name}`;
    var storageRef = storage.ref(path);
    //Upload file
    var task = storageRef.put(file);
    promises.push(task);
    //Update progress bar
    task.on(
      "state_changed",
      (snapshot) => {
        var percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(percentage);
      },
      (err) => {
        // console.log(err);
        alert(err.message);
        throw new Error(err.message);
      },
      () => {
        task.snapshot.ref.getDownloadURL().then((url) => {
          console.log("File available at", url);
          photoURLs.push(url);
        });
      }
    );
  });
  Promise.all(promises)
    .then(() => {
      console.log("Upload complete");
      firestore.collection("posters").add({
        title: poster.title,
        description: poster.description,
        works: photoURLs,
        userId: poster.userId,
        authorRef: `/users/${poster.userId}`,
        price: poster.price,
        location: poster.location,
      });
    })
    .catch((err) => {
      alert(err.message);
      throw new Error(err.message);
    });
};
// };

//   });
