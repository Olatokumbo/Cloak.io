const functions = require("firebase-functions");
const addNotification = require("../helper/notification");

const onFinishHire = functions.firestore
  .document("hires/{hireId}")
  .onUpdate((change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    const doneBefore = before.done;
    const doneAfter = after.done;
    const { hireId } = context.params;
    const url = `/poster/${hireId}/review`;
    const userId = after.customerId;
    // functions.logger.warn("DONE", done);
    if (doneBefore === false && doneAfter === true) {
      return addNotification({
        userId,
        message: "Job Done! Please add a review",
        url,
      });
    }
  });

const onCancelHire = functions.firestore
  .document("hires/{hireId}")
  .onUpdate((change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    const cancelledBefore = before.cancelled;
    const cancelledAfter = after.cancelled;
    const { hireId } = context.params;
    const url = `/poster/hires/${hireId}`;
    const userId = after.customerId;
    if (cancelledBefore === false && cancelledAfter === true) {
      return addNotification({
        userId,
        message: "Your Hire Request was cancelled",
        url,
      });
    }
  });

module.exports = {
  onFinishHire,
  onCancelHire,
};
