var express = require('express');
var router = express.Router();

var db = require('../models/link');

/* GET users listing. */
router.get('/', function(req, res, next) {
	
	var collection = db.get('usercollection');
	collection.find({},{},function(err,docs){
		res.render('user/index',{userlist:docs});
	});
	
  	
});

router.get('/p', function(req, res, next) {
  res.send('respond with a resource 222222222222');
});
module.exports = router;
