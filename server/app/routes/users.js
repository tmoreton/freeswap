var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

// users route: /api/users
router.route('/')
.post(function(req,res,next) {
	console.log('Creating new User', req.body);
	User.create(req.body, function(err,user) {
		if (err) next(err);
		console.log("New User Created", user)
		res.sendStatus(200);
	})
})

// Left Swipe - Dislike
router.put('/:userId', function(req,res,next) {
	console.log('productId',req.body);
	console.log('UserId',req.params.userId);
	User.
		findByIdAndUpdate(req.params.userId, { $push: { likes: req.body.productId } }, function(err, user) {
			console.log(user);
			res.json(user);
		})
})

// Get History
router.get('/:userId', function(req,res,next) {
	console.log('productId',req.body);
	console.log('UserId',req.params.userId);
	User.
		findByIdAndUpdate(req.params.userId, { $push: { likes: req.body.productId } }, function(err, user) {
			console.log(user);
			res.json(user);
		})
})

module.exports = router;
