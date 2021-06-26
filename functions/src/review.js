const functions = require("firebase-functions");
const admin = require("firebase-admin");

const onAddReview = functions.firestore
  .document("/reviews/{reviewId}")
  .onCreate((snapshot, context) => {
    const { reviewId } = context.params;
    const {hireId, rating, posterId} = snapshot.data();
    return admin.firestore().collection("hires").doc(hireId).update({
      reviewId,
    }).then((_change, _context)=>{
      return admin.firestore().collection("posters").doc(posterId).update({
        ratings: admin.firestore.FieldValue.arrayUnion(rating)
      })
    });
  });

module.exports = { onAddReview };
