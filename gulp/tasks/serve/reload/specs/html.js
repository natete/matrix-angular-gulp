/**
 * Reloads the specs server with the new files.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    // We don't need to reload the server on html changes.
    done();
  }
};
