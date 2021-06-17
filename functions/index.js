const posters = require("./src/poster");
const jobs = require("./src/job");
const hires = require("./src/hire");
const reviews = require("./src/review");

exports.newUser = require("./src/user");

exports.onPosterCreated = posters.onPosterCreated;
exports.onPosterDeleted = posters.onPosterDeleted;
exports.onPosterUpdate = posters.onPosterUpdate;
exports.onPosterHire = posters.onPosterHire;

exports.onJobCreated = jobs.onJobCreated;
exports.onJobUpdated = jobs.onJobUpdated;
exports.onJobDeleted = jobs.onJobDeleted;

exports.onFinishHire = hires.onFinishHire;

exports.onAddReview = reviews.onAddReview;
