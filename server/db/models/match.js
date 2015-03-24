'use strict';
var mongoose = require('mongoose');
// var unique = require('mongoose-unique-validator');

var matchSchema = new mongoose.Schema({
    productId: {
    	type: mongoose.Schema.Types.ObjectId, 
    	ref: "Product"
    },
    buyerId: {
    	type: mongoose.Schema.Types.ObjectId, 
    	ref: "User"
    },
    SellerId: {
    	type: mongoose.Schema.Types.ObjectId, 
    	ref: "Product" // This references the seller Id from product... how do we do this?
    },
    FirebaseId: {
    	type: String
    }
});


var Match = mongoose.model('Match', matchSchema);
module.exports = {Match: Match};
