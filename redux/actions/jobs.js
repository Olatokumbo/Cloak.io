import firebase, { firestore } from "../../firebase/firebase";

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

export const addJob = (job) => {
  return firestore
    .collection("jobs")
    .add({
      title: job.title,
      description: [job.description],
      price: parseInt(job.price),
      location: job.location,
      userId: job.userId,
      authorRef: firestore.doc(`/users/${job.userId}`),
      date: firebase.firestore.FieldValue.serverTimestamp(),
      applied: [],
    })
    .then(() => alert("Posted Your Job"))
    .catch((e) => {
       return new Error(e.message);
    });
};

export const fetchJobs = () => {
  let jobs = [];
  let promises = [];
  return firestore
    .collection("jobs")
    .limit(10)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let jobData = doc.data();
        jobData.id = doc.id;
        if (jobData.authorRef) {
          promises.push(
            jobData.authorRef.get().then((res) => {
              jobData.authorData = res.data();
            })
          );
        }
        jobs.push(jobData);
      });
      return Promise.all(promises);
    })
    .then(() => {
      return JSON.stringify(jobs);
    })
    .catch((err) => err.message);
};

export const updateJob = (job) => {
  return firestore
    .collection("jobs")
    .doc(job.id)
    .update({
      title: job.title,
      description: [job.description],
      price: parseInt(job.price),
      location: job.location,
    })
    .then(() => {
      alert("Document Updated");
    })
    .catch((e) => {
      return new Error(e.message);
    });
};

export const deleteJob = (id) => {
  return firestore
    .collection("jobs")
    .doc(id)
    .delete()
    .then(() => {
      alert("Job Deleted");
    })
    .catch((e) => {
      return new Error(e.message);
    });
};

export const applyJob = (jobId, userId) => {
  firestore
    .collection("jobs")
    .doc(jobId)
    .update({
      applied: firebase.firestore.FieldValue.arrayUnion(userId),
    })
    .then(() => {
      alert("Success");
    })
    .catch((e) => {
      throw new Error(e.message);
    });
};

export const withdrawJob = (jobId, userId) => {
  firestore
    .collection("jobs")
    .doc(jobId)
    .update({
      applied: firebase.firestore.FieldValue.arrayRemove(userId),
    })
    .then(() => {
      alert("Success");
    })
    .catch((e) => {
      throw new Error(e.message);
    });
};

export const getJobList = (userId) => {
  const jobList = [];
  return firestore
    .collection("jobs")
    .where("userId", "==", userId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        jobList.push({ id: doc.id, ...doc.data() });
      });
    })
    .then(() => {
      console.log(jobList);
      return JSON.stringify(jobList);
    })
    .catch((e) => {
      throw new Error(e.message);
    });
};
