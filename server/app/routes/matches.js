var router = require('express').Router();
var mongoose = require('mongoose');
var Match = mongoose.model('Match');
var Promise = require('bluebird');

// route: /api/matches
router.route('/')
  .post(function(req, res, next) {
    Match.create(req.body, function(err, match) {
      if (err) next(err);
      // console.log(match);
      res.json(match);
    });
  });


router.route('/user')
  .get(function(req, res, next) {
    // console.log("req.query: ", req.query)
    Match.find({
      buyer: req.query._id
    }).populate("product buyer seller").exec(function(err, matches) {
      if (err) next(err);
      // console.log(matches);
      res.json(matches);
    })
  });

// getting all items as a seller 
router.route('/seller')
  .get(function(req, res, next) {
    // console.log("req.query: ", req.query)
    Match.find({
      seller: req.query._id
    }).populate("product buyer seller").exec(function(err, matches) {
      if (err) next(err);
      // console.log(matches);
      res.json(matches);
    })
  });

// getting all craigslist items
router.route('/buyer/craigslist')
.get(function(req, res, next) {

  Match
    .find({
      $and: [{
        buyer: req.query._id,
        productUrl: { $exists: true }
      }]
    })
    .populate("product buyer seller").exec(function(err, matches) {
      if (err) next(err);
      console.log('returned matches', matches);
      res.json(matches);
    })
});

// getting all app items
router.route('/buyer/app')
.get(function(req, res, next) {

  Match
    .find({
      $and: [{
        buyer: req.query._id,
        seller: { $exists: true }
      }]
    })
    .populate("product buyer seller").exec(function(err, matches) {
      if (err) next(err);
      console.log('returned matches', matches);
      res.json(matches);
    })
});

module.exports = router;
