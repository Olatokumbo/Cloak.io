import { firestore } from "../../firebase/firebase";

export const fetchJobById = (documentId) => {
  let promises = [];
  let job;
  return firestore
    .collection("jobs")
    .doc(documentId)
    .get()
    .then((doc) => {
      job = doc.data();
      job.id = doc.id;
      promises.push(
        job.authorRef.get().then((res) => {
          job.authorData = res.data();
        })
      );
      return Promise.all(promises);
    })
    .then(() => {
      return JSON.stringify(job);
    });
};

export const getAllJobsId = () => {
  let jobs = [];
  return firestore
    .collection("jobs")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        jobs.push(doc.id);
      });
    })
    .then(() => JSON.stringify(jobs))
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
};
