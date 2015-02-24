var express = require('express');
var router = express.Router();

var mongodb = require('../models/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
	
	var db = require('../models/link');
	
	var collection = db.get('usercollection');
	collection.find({},{},function(err,docs){
		res.render('user/index',{userlist:docs});
	});  	
});

router.get('/hello',function(req,res,next){
	
	mongodb.open(function(err,db){
		if(err){
			console.log(err);
		}
		
		console.log(db);
		
		db.collection('usercollection',function(err,collection){
			if(err){
				mongodb.close();
				console.log(err);
			}
			
			collection.find({},function(err,user){
				mongodb.close();
				if(err){
					console.log(err);
				}
				
				console.log(user);
				
				res.render('user/index',{userlist:user});
			});
		});
			
	});
	
	
});

router.get('/p', function(req, res, next) {
  res.send('respond with a resource 222222222222');
});
module.exports = router;
