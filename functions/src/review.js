const functions = require("firebase-functions");
const admin = require("firebase-admin");

const onAddReview = functions.firestore
  .document("/reviews/{reviewId}")
  .onCreate((snapshot, context) => {
    const { reviewId } = context.params;
    const hireId = snapshot.data().hireId;
    return admin.firestore().collection("hires").doc(hireId).update({
      reviewId,
    });
  });

module.exports = { onAddReview };
