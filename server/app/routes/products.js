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

		request(url, function(error, response, body){
			if(!error)
			parser.parseString(body, function(err, result){
		
				items = result['rdf:RDF'].item;
				// res.json(items)
				
				items.forEach(function(item){
					if (item['enc:enclosure'] !== undefined){
						title.push(item.title[0]);
						description.push(item.description[0]);
						date.push(item['dc:date']);
						photoUrls.push(item['enc:enclosure'][0]['$'].resource);
					} else {
						title.push(item.title[0]);
						description.push(item.description[0]);
						date.push(item['dc:date']);	
						photoUrls.push(null);
					}
				})

				freeItems.push(title);
				freeItems.push(description);
				freeItems.push(date);
				// freeItems.push(photoUrls);
			})

			for (var i = 0; i < freeItems.length; i++){
				if (regExp.exec(title[i]) !== null){
					var freeItemObj = {
						title: title[i],
						description: description[i],
						date: date[i][0],
						location: regExp.exec(title[i])[1],
						photoUrls: photoUrls[i]
					}
				} else {
					var freeItemObj = {
						title: title[i],
						description: description[i],
						date: date[i][0],
						location: "not set",
						photoUrls: photoUrls[i]
					}
				}
				object.push(freeItemObj);
			} // end of for 

			next(null, object);
		}) // end of request 
	}; // end of getData function 

	getData(function(err, object){
		if(err){
			console.log(err)
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
			// 	// console.log("-------------------new Data", newData);

			// 	if (newData.length < 1){
			// 		console.log("there is no change")
			// 	} else {
			// 		for (var i = 0; i < newData.length; i++){
			// 			mongoose.model('Product').find({title: newData[i].title}, function(err, product){
			// 				console.log("This is the find: ", product.length)
			// 				if (product.length != 0){
			// 					console.log('product already in DB')
			// 				} else {
			// 					mongoose.model('Product').create({
			// 						title: newData[i].title,
			// 						description: newData[i].description,
			// 						date: newData[i].date,
			// 						location: newData[i].location,
			// 						photoUrls: newData[i].photoUrls
			// 					}, function (err, product){
			// 						if(err) console.log(err);
			// 						console.log("saved in DB")
			// 						res.json(product);
			// 					});
			// 				} // end of nested else 
			// 			})
			// 		} // for 
			// 	} // else 
			} // end of else 
		}) // getData function 
	}, 300000) // end of setInterval function 
})



// add product 
router.post('/addproduct', function(req, res, next){
	var title = req.body.title;
	var description = req.body.description;
	var location = req.body.location;

	console.log("title: ", title);
	console.log("description: ", description);

	mongoose.model('Product').create({
		title: title,
		description: description,
		location: location
	}, function (err, product){
		if(err) console.log(err);
		console.log("Product registered", product);
		res.sendStatus(200);
	})
});

// get product
router.get('/getproduct', function(req, res, next){
	mongoose.model('Product').find({}, function(err, products){
		if(err) return next(err);
		res.json(products);
	});
});



module.exports = router;