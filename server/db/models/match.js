'use strict';
var mongoose = require('mongoose');
// var unique = require('mongoose-unique-validator');

var matchSchema = new mongoose.Schema({
    product: {
    	type: mongoose.Schema.Types.ObjectId,
    	ref: "Product"
    },
    buyer: {
    	type: mongoose.Schema.Types.ObjectId,
    	ref: "User"
    },
    seller: {
    	type: mongoose.Schema.Types.ObjectId,
    	ref: "User"
    },
    productUrl: {
        type: String
    }
});

var Match = mongoose.model('Match', matchSchema);
module.exports = {Match: Match};
