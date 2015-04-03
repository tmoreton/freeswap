'use strict';
var mongoose = require('mongoose');
var _ = require('lodash');
// var unique = require('mongoose-unique-validator');

var schema = new mongoose.Schema({
  title: String,
  photoUrls: {
    type: String,
    default: 'http://vignette2.wikia.nocookie.net/horrormovies/images/e/e3/No_Image.png/revision/latest?cb=20140329231046'
  },
  productUrl: {
    type: String
  },
  description: {
    type: String
  },
  expiration: {
    type: Date,
    default: new Date() // if older than 30 days, delete from db
  },
  coordinates: {
    type: Array
  },
  location: {
    type: String
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  swappedWith: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  }
});

//Add Schema Method for calls on "find all given products", "find all liked history" etc.

schema.statics.findOrCreate = function(query, defaults) {
  var self = this
  return this
    .findOne(query)
    .exec()
    .then(function(record) {
      if (record) return record
      return self.create(_.merge(query, defaults))
    }, function(err) {
      console.log(err);
    })
}

schema.statics.findRemaining = function(exclude, swapped, limit) {
  return this
    .find({
      $and: [{
        _id: { $nin: exclude },
        swappedWith: { $exists: swapped }
      }]
    })
    .limit(limit)
    .exec();
}


var Product = mongoose.model('Product', schema);

module.exports = {
  Product: Product
};
