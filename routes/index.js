var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('site/index', { title: 'Express' });
});

router.get('/users/index',function(req,res,next){
	
	var ss = req.query.q + "--" + req.query.shoe.color;
	
	var sss = req.param("q") + req.param("shoe").color;
	
	res.send("Querying Info:" + ss + "+++" + sss);
});

router.get('/register',function(req,res,next){
	res.render('site/register',{ title: 'Express' });
});

router.post('/register',function(req,res){
	var name = req.body.name,
	password = req.body.password,
	email = req.body.email,
	re_password = req.body['re_password'];

});


router.get('/login',function(req,res,next){
	res.render('site/login',{ title: 'Express' });
});

router.post('/form',function(req,res){
	
	var ss = req.body.username + "--" + req.body.password;

	res.send("Querying Info:" + ss);
});

module.exports = router;
