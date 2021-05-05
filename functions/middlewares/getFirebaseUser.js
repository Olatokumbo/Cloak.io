module.exports = async function getFirebaseUser(req, res, next) {
    functions.logger.log("Check if request is authorized with Firebase ID token");
  
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")
    ) {
      functions.logger.error(
        "No Firebase ID token was passed as a Bearer token in the Authorization header.",
        "Make sure you authorize your request by providing the following HTTP header:",
        "Authorization: Bearer <Firebase ID Token>"
      );
      return res.sendStatus(403);
    }
  
    let idToken;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      functions.logger.log("Found 'Authorization' header");
      idToken = req.headers.authorization.split("Bearer ")[1];
    }
  
    try {
      const decodedIdToken = await admin.auth().verifyIdToken(idToken);
      functions.logger.log("ID Token correctly decoded", decodedIdToken);
      req.user = decodedIdToken;
      return next();
    } catch (error) {
      functions.logger.error("Error while verifying Firebase ID token:", error);
      return res.status(403).send("Unauthorized");
    }
  }