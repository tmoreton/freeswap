'use strict';
var mongoose = require('mongoose');
var unique = require('mongoose-unique-validator');

var likeSchema = new mongoose.Schema({
    user: [{ type: mongoose.Schema.types.ObjectId, ref: 'User' }],
    product: [{ type: mongoose.Schema.types.ObjectId, ref: 'Product' }]
});


var Likes = mongoose.model('Likes', likeSchema);
module.exports = {Likes: Likes};
