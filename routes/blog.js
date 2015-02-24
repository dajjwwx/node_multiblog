var express = require('express');
var router = express.Router();

User = require('../models/user.js);

/* GET home page. */
router.get('/', function(req, res, next) {
	
	User.get('testuser1',function(err,user){
		
		if(user){
			res.render('blog/index', { 
				title: 'Express',
				userinfo:user
			});
		}
		

	});
	
	
  
});


module.exports = router;
