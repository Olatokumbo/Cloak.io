const admin = require("firebase-admin");

const addNotification = (data) => {
  return admin
    .firestore()
    .collection("notifications")
    .add({
      message: data.message,
      userId: data.userId,
      date: admin.firestore.FieldValue.serverTimestamp(),
      url: data.url,
      read: false,
    })
    .then(() => functions.logger.info("New Notifcation has been Added"))
    .catch((err) => Error(err.message));
};

module.exports = addNotification;
