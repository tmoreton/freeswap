var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

// route: /api/routes
router.route('/')
.post(function(req,res,next) {
	console.log('Creating new User', req.body);
	User.create(req.body, function(err,user) {
		if (err) next(err);
		console.log("New User Created", user)
		res.sendStatus(200);
	})
});

module.exports = router;