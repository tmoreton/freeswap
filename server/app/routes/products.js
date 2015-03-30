var router = require('express').Router();
var mongoose = require('mongoose');
var Promise = require('bluebird');


// install request
// install cheerio
// install xml2js

var request = require('request');
var cheerio = require('cheerio');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var fs = require('fs');

var regExp = /\(([^)]+)\)/; // to get text between parenthesis
var url;
var items;

// when using RSS
// Location is not available
// only displays ~ 20 items

// when using scraping (from main page)
// getting img src is tough
// description is not available

// for both RSS and scraping
// User email is not available


// get RSS feed and update DB with new itemes (every 1 min)

router.get('/rss', function(req, res){
	res.sendStatus(200)
	url = 'http://newyork.craigslist.org/search/zip?format=rss';

	function getData(next){
		var object = [];
		var freeItems = [];

		var title = [];
		var description = [];
		var date = [];
		var photoUrls = [];
		var productUrl = [];

		request(url, function(error, response, body){
			if(!error)
			parser.parseString(body, function(err, result){

				items = result['rdf:RDF'].item;
				// res.json(items)

				// when there's no image it returns undefined
				// in that case, push default img urls directly

				// items.forEach(function(item){
				// 	if (item['enc:enclosure'] !== undefined){
				// 		title.push(item.title[0]);
				// 		description.push(item.description[0]);
				// 		date.push(item['dc:date']);
				// 		photoUrls.push(item['enc:enclosure'][0]['$'].resource);
				// 		productUrl.push(item['dc:source']); // DN
				// 	} else {
				// 		title.push(item.title[0]);
				// 		description.push(item.description[0]);
				// 		date.push(item['dc:date']);
				// 		photoUrls.push('http://vignette2.wikia.nocookie.net/horrormovies/images/e/e3/No_Image.png/revision/latest?cb=20140329231046');
				// 		productUrl.push(item['dc:source']); // DN
				// 	}
				// })

				items.forEach(function(item){
					title.push(item.title[0]);
					description.push(item.description[0]);
					date.push(item['dc:date']);
					productUrl.push(item['dc:source']);
					if (item['enc:enclosure'] !== undefined) photoUrls.push(item['enc:enclosure'][0]['$'].resource);
					else photoUrls.push('http://vignette2.wikia.nocookie.net/horrormovies/images/e/e3/No_Image.png/revision/latest?cb=20140329231046');
				})


				freeItems.push(date); // To add length to the array
				console.log(freeItems);
			})

			for (var i = 0; i < freeItems[0].length; i++){
				if (regExp.exec(title[i]) !== null){
					var freeItemObj = {
						title: title[i],
						description: description[i],
						date: date[i][0],
						location: regExp.exec(title[i])[1], // Location from Title
						photoUrls: photoUrls[i],
						productUrl: productUrl[i][0]
					}
				} else { // DN - This can be refactored
					var freeItemObj = {
						title: title[i],
						description: description[i],
						date: date[i][0],
						location: productUrl[i][0].split('/')[3], // Regional location from Url
						photoUrls: photoUrls[i],
						productUrl: productUrl[i][0]
					}
				}

				// var freeItemObj = {
				// 	title: title[i],
				// 	description: description[i],
				// 	date: date[i][0],
				// 	photoUrls: photoUrls[i],
				// 	productUrl: productUrl[i]
				// }
				// freeItemObj.location = regExp.exec(title[i]) !== null ? regExp.exec(title[i])[1] : productUrl[i].split('/')[3];


				object.push(freeItemObj);
			} // end of for
			console.log(object);
			next(null, object);
		}) // end of request
	}; // end of getData function

	getData(function(err, object){
		if(err){
			console.log(err)
			// res.json(object)
		}
	})

	var dataInterval = setInterval(function(){
		getData(function(err, newData){

			console.log("newData -----------------: ", newData);
			if(err){
				console.log(err)
			} else {
				var promises = newData.map(function(data) {
					return mongoose.model('Product').findOrCreate({title: data.title},data)
				})

				Promise.all(promises).then( function(databaseData) {
					// res.json(databaseData);
				}, console.warn)
			} // end of else
		}) // getData function
	}, 5000) // end of setInterval function
})


// add product
router.post('/addProduct', function(req, res, next){
	var title = req.body.title;
	var description = req.body.description;
	var location = req.body.location;
	var photoUrls = req.body.ImageUrls;
	var seller = req.body.seller;
	console.log("req.body", req.body)

	mongoose.model('Product').create({
		title: title,
		description: description,
		location: location,
		photoUrls: photoUrls,
		seller: seller
	}, function (err, product){
		if(err) console.log(err);
		console.log("Product registered", product);
		res.sendStatus(200);
	})
});

// Get all products excluding liked, disliked and swapped
router.get('/getProducts', function(req, res, next){
	console.log('route /getProducts')
	console.log('req.query.productsToNotAdd',req.query.toExclude);

	var toExclude;
	if (!req.query.toExclude) { // toExclude is empty
		console.log('empty');
		toExclude = [];
	}
	else if (typeof req.query.toExclude == 'string') { // toExclude has 1 Id - query converts array of 1 into a string
		console.log('1 Id');
		toExclude = [mongoose.Types.ObjectId(req.query.toExclude)];
	}
	else { // toExclude has more than 1 Id
		console.log('More than 1 Id');
		toExclude = req.query.toExclude.map(function(el) {
			return mongoose.Types.ObjectId(el);
		});
	}

	mongoose.model('Product')
		.find({
			$and: [{ 
				_id: { $nin: toExclude }, 
				swappedWith: { $exists: false } 
			}]
		})
		.exec()
		.then(
			function(products){
				res.json(products);
			},
			function(err){
				next(err);
			}
		);
});



module.exports = router;
