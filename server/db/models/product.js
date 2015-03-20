'use strict';
var mongoose = require('mongoose');
// var unique = require('mongoose-unique-validator');

var schema = new mongoose.Schema({
    photoUrl: {
        type: String
    },
    photo: {
        data: Buffer, // should come back
        contentType: String
    },
    description: {
        type: String
    },
    expiration: {
        type: Date,
        default: new Date()
    },
    location: {
        type: String
    }
});


var Product = mongoose.model('Product', schema);
module.exports = {Product: Product};


