var router = require('express').Router();
var mongoose = require('mongoose');


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


router.get('/rss', function(req, res){
	url = 'http://newyork.craigslist.org/search/zip?format=rss';

	function getData(){
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
				res.json(items)
				
				items.forEach(function(item){
					title.push(item.title);
					description.push(item.description);
					date.push(item['dc:date']);
					// photoUrls.push(item['enc:enclosure']['$'].resource)
				})

				freeItems.push(title);
				freeItems.push(description);
				freeItems.push(date);
				// freeItems.push(photoUrls);
			})
			for (var i = 0; i < freeItems.length; i++){
				var freeItemObj = {
					title: title[i],
					description: description[i],
					date: date[i],
					location: regExp.exec(title[i])[1]
				}
				object.push(freeItemObj);
			}
			res.json(object);
		}) // end of request 
	}; // end of getData function 

	var dataInterval = setInterval(function(){
		getData(function(err, newData){
			if(err){
				console.log(err)
			} else {
				console.log("-------------------new Data", Date.now());

				if (newData.length < 1){
					console.log("there is no change")
				} else {
					for (var i = 0; i < newData.length; i++){
						mongoose.model('Product').find({title: newData[i].title}, function(err, product){
							if (product !== null){
								console.log('product already saved in DB')
							} else {
								mongoose.model('Product').create({
									title: title,
									description: description,
									location: location,
									date: date
								}, function (err, product){
									res.json(product);
								});
							} // end of nested else 
						})
					} // for 
				} // else 
			} // end of else 
		}) // getData function 
	}, 15000) // end of setInterval function 
})



module.exports = router;