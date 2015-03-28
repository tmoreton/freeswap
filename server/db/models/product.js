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
    photo: {
        data: Buffer, // maybe we can upload to seperate server and grab imageUrl
        contentType: String
    },
    // store image s3 ->
    description: {
        type: String
    },
    expiration: {
        type: Date,
        default: new Date() // if older than 30 days, delete from db
    },
    location: {
        type: String
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    swapped: {
        type: String
    },
    swappedWith: {
        type: mongoose.Schema.Types.ObjectId, //Potentially take out swapped field?
        ref: "User"
    }
});

//Add Schema Method for calls on "find all given products", "find all liked history" etc.

schema.statics.findOrCreate = function(query, defaults) {
    var self = this
    return this
      .findOne(query)
      .exec()
      .then(function(record) {
        if(record) return record
        return self.create(_.merge(query, defaults))
      }, function(err){
        console.log(err);
      })
}


var Product = mongoose.model('Product', schema);

module.exports = {Product: Product};


