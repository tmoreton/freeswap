'use strict';
var mongoose = require('mongoose');
// var unique = require('mongoose-unique-validator');

var schema = new mongoose.Schema({
    photoUrl: {
        type: String
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
        type: [Number,Number]
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

var Product = mongoose.model('Product', schema);
module.exports = {Product: Product};


