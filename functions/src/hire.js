const functions = require("firebase-functions");
const addNotification = require("../helper/notification");

const onFinishHire = functions.firestore
  .document("hires/{hireId}")
  .onUpdate((change, context) => {
    const after = change.after.data();
    const done = after.done;
    const { hireId } = context.params;
    const url = `/poster/${hireId}/review`;
    const userId= after.customerId;
    functions.logger.warn("DONE", done);
    if (done) {
      return addNotification({
        userId,
        message: "Job Done! Please add a review",
        url,
      });
    }
  });

module.exports = {
  onFinishHire,
};
