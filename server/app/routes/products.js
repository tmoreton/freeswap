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
				
				// when there's no image it returns undefined
				// in that case, push default img urls directly

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
						photoUrls.push('http://vignette2.wikia.nocookie.net/horrormovies/images/e/e3/No_Image.png/revision/latest?cb=20140329231046');
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
router.get('/getProducts', function(req, res, next){
	console.log('route /getProducts')
	console.log('req.query.likesArr',req.query.likesArr);

	var userLikes;
	if (!req.query.likesArr) { // likesArr is empty
		console.log('empty');
		userLikes = [];
	}
	else if (typeof req.query.likesArr == 'string') { // likesArr has 1 Id - query converts array of 1 into a string
		console.log('1 Id');
		userLikes = [mongoose.Types.ObjectId(req.query.likesArr)];
	}
	else { // likesArr has more than 1 Id
		console.log('More than 1 Id');
		userLikes = req.query.likesArr.map(function(el) {
			return mongoose.Types.ObjectId(el);
		});
	}

	mongoose.model('Product')
		.find({
			$and: [{ 
				_id: { $nin: userLikes }, 
				swappedWith: { $exists: false } 
			}]
		})
		.exec()
		.then(function(products){
			res.json(products);
		});
});



module.exports = router;