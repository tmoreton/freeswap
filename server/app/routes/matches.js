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

      var organizedMatches = {
	      craigsListData: [],
	      appData: []
	    };
      matches.forEach(function(el) {
      	if (el.product.productUrl) {
      		organizedMatches.craigslistData.push(el);
      	}
      	else {
      		organizedMatches.appData.push(el);
      	}
      })

      res.json(organizedMatches);
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

module.exports = router;
