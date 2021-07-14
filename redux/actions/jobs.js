import firebase, { firestore } from "../../firebase/firebase";
import * as actionTypes from "../../redux/actions/actionTypes";
import {
  successNotification,
  warningNotification,
} from "../../utils/notifications";
export const fetchJobById = (documentId) => {
  let promises = [];
  let job;
  return firestore
    .collection("jobs")
    .doc(documentId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        job = doc.data();
        job.id = doc.id;
        promises.push(
          job.authorRef.get().then((res) => {
            job.authorData = res.data();
          })
        );
        return Promise.all(promises);
      } else return {};
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
      description: job.description,
      price: parseInt(job.price),
      location: job.location,
      userId: job.userId,
      authorRef: firestore.doc(`/users/${job.userId}`),
      date: firebase.firestore.FieldValue.serverTimestamp(),
      applied: [],
      done: false,
    })
    .then(() => successNotification("Success", "Job Posted"))
    .catch((e) => {
      throw new Error(e.message);
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
      description: job.description,
      price: parseInt(job.price),
      location: job.location,
    })
    .then(() => {
      successNotification("Success", "Job Updated");
    })
    .catch((e) => {
      return new Error(e.message);
    });
};

export const finishJob = (id) => {
  return firestore
    .collection("jobs")
    .doc(id)
    .update({
      done: true,
    })
    .then(() => {
      warningNotification("Success", "Job Closed");
    })
    .catch((e) => {
      throw new Error(e.message);
    });
};

export const deleteJob = (id) => {
  return firestore
    .collection("jobs")
    .doc(id)
    .delete()
    .then(() => {
      successNotification("Success", "Job Deleted");
    })
    .catch((e) => {
      return new Error(e.message);
    });
};

export const isJobApplied = (docId, consumerId) => {
  return (dispatch) => {
    const unsubscribe = firestore
      .collection("jobs")
      .doc(docId)
      .onSnapshot((doc) => {
        if (!doc.empty) {
          console.log(doc.data().applied.includes(consumerId));
          if (!doc.data().applied.includes(consumerId))
            dispatch({ type: actionTypes.NOT_APPLIED });
          else dispatch({ type: actionTypes.APPLIED });
        }
      });
    return unsubscribe;
  };
};

export const applyJob = (jobId, userId) => {
  return firestore
    .collection("jobs")
    .doc(jobId)
    .update({
      applied: firebase.firestore.FieldValue.arrayUnion(userId),
    })
    .then(() => {
      successNotification("Success", "Job Applied");
    })
    .catch((e) => {
      throw new Error(e.message);
    });
};

export const withdrawJob = (jobId, userId) => {
  return firestore
    .collection("jobs")
    .doc(jobId)
    .update({
      applied: firebase.firestore.FieldValue.arrayRemove(userId),
    })
    .then(() => {
      warningNotification("Done", "Job Withdrawn");
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
    .where("done", "==", true)
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
