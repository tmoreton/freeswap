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

// Right Swipe - Add to Likes Array
router.route('/:userId/likes')
.put(function(req,res,next) {
	console.log('productId',req.body);
	console.log('UserId',req.params.userId);
	User.
		findByIdAndUpdate(req.params.userId,
			{ $push:
				{ likes: req.body.productId }
			})
		.exec()
		.then(
			function(user) {
				console.log(user);
				res.json(user);
			},
			function(err) {
				next(err);
			})
})

// Left Swipe - Add to users dislikes
router.route('/:userId/dislikes')
.put(function(req,res,next) {
	console.log('productId', req.body);
	console.log('UserId', req.params.userId);
	User.
		findByIdAndUpdate(req.params.userId,
			{ $push:
				{ dislikes: req.body.productId }
			})
		.exec()
		.then(
			function(user) {
				console.log(user);
				res.json(user);
			},
			function(err) {
				next(err);
			})
})

router.route('/:userId/history')
.get(function(req, res, next){
	User.findById(req.params.userId)
	.populate('likes')
	.exec(function(err, data){
		if(err) {
			console.log(err)
			next(err)
		}
		else{
			res.json(data)
		}

	})
})

// Delete item in likes array when user hit the delete button in match page

router.route('/likes')
.put(function(req, res, next) {
	console.log('req.body: ', req.body);
	// console.log('UserId', req.params.userId);
	var productId = req.body.productId;
	var userId = req.body.userId;

	User.
		findByIdAndRemove(req.params.userId,
			{ $remove:
				{ likes: req.body.productId }
			})
		.exec()
		.then(
			function(user) {
				console.log(user);
				res.json(user);
			},
			function(err) {
				next(err);
			})
})




// Get History (Where is this being used? Mongoose call is not correct)
// router.get('/:userId', function(req,res,next) {
// 	console.log('productId',req.body);
// 	console.log('UserId',req.params.userId);
// 	User.
// 		findByIdAndUpdate(req.params.userId, { $push: { likes: req.body.productId } }, function(err, user) {
// 			console.log(user);
// 			res.json(user);
// 		})
// })

module.exports = router;
