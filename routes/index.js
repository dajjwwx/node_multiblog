var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users/index',function(req,res,next){
	
	var ss = req.query.q + "--" + req.query.shoe.color;
	
	var sss = req.param("q") + req.param("shoe").color;
	
	res.send("Querying Info:" + ss + "+++" + sss);
});

router.get('/register',function(req,res,next){
	res.render('register',{});
});

router.post('/form',function(req,res){
	
	var ss = req.body.username + "--" + req.body.password;

	res.send("Querying Info:" + ss);
});

module.exports = router;
