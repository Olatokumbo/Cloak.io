const posters = require("./src/poster");
const jobs = require("./src/job");
const hires = require("./src/hire");
const reviews = require("./src/review");
const user = require("./src/user");

exports.newUser = user.newUser;
exports.deleteUser = user.deleteUser;

exports.onPosterCreated = posters.onPosterCreated;
exports.onPosterDeleted = posters.onPosterDeleted;
exports.onPosterUpdate = posters.onPosterUpdate;
exports.onPosterHire = posters.onPosterHire;

exports.onJobCreated = jobs.onJobCreated;
exports.onJobUpdated = jobs.onJobUpdated;
exports.onJobDeleted = jobs.onJobDeleted;

exports.onFinishHire = hires.onFinishHire;
exports.onCancelHire = hires.onCancelHire;

exports.onAddReview = reviews.onAddReview;
