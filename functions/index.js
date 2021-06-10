const posters = require("./src/poster");
const jobs = require("./src/job");

exports.newUser = require("./src/user");

exports.onPosterCreated = posters.onPosterCreated;
exports.onPosterDeleted = posters.onPosterDeleted;
exports.onPosterUpdate = posters.onPosterUpdate;

exports.onJobCreated = jobs.onJobCreated;
exports.onJobUpdated = jobs.onJobUpdated;
exports.onJobDeleted = jobs.onJobDeleted;
