var router = require('express').Router();
var mongoose = require('mongoose');
var Match = mongoose.model('Match');
var Promise = require('bluebird');

// route: /api/matches
router.route('/')
.post(function(req,res,next) {
	Match.create(req.body, function(err, match) {
		if (err) next(err);
		console.log(match);
		res.json(match);
	});
});

module.exports = router;