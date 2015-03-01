var express = require('express');
var router = express.Router();

var mongodb = require('../models/db');

User = require('../models/user.js');

Util = require('../helpers/util');
Auth = require('../helpers/auth.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
	     
	User.get(null,function(err,users){
		
		if(err){
			console.log(err);
		}
		
		for(var i in users){
			console.log(users[i].name);
		}
		
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
