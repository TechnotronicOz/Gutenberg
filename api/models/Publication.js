/**
 * Publication
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {
  attributes: {
    title : {
      type      : 'STRING',
      required  : true,
      maxLength : 256
    },
    newsletter_ids : {
      type      : 'array'
    }
  }
};