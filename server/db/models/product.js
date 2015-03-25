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
    sellerId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    },
    swapStatus: {
        type: Boolean
    }
});


var Product = mongoose.model('Product', schema);
module.exports = {Product: Product};


