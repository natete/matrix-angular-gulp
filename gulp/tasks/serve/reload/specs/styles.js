/**
 * Reloads the specs server with the new files.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    // We don't need to reload specs on styles changes.
    done();
  }
};
