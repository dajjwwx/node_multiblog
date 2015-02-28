var express = require('express');
var router = express.Router();
var crypto = require('crypto');
User = require('../models/user.js');

Util = require('../helpers/util');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('site/index', { 
  		title: '主页',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()});
});

router.get('/register',function(req,res,next){	
	
	res.render('site/register',{ 
		title: '注册',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	 });
});

router.post('/register',function(req,res){
	var name = req.body.name,
	password = req.body.password,
	email = req.body.email,
	re_password = req.body['re_password'],
	salt = Util.getRandomString(4);	
	
	var salt_password = salt + password;
	
	if(password != re_password){
		req.flash('error','两次输入的密码不一致！!');
		return res.redirect('/register');
	}
	
	var md5 = crypto.createHash('md5'),
	password = md5.update(salt_password).digest('hex');
	
	var newUser = new User({
		name: name,
		password: password,
		salt: salt,
		email: email		
	});
	
	//检查用户名是否已经存在
	User.get(newUser.name,function(err,user){
		if(user){
			req.flash('error','用户名已经存在！！');
			return res.redirect('/register');
		}
		//如果不存在则新增用户
		newUser.save(function(err,user){
			if(err){
				req.flash('error',err);
				return res.redirect('/register'); 	//注册失败返回注册页
			}
			
			req.session.user = user;
			req.flash('success','注册成功！');
			res.redirect('/');		//注册成功返回主页
		});
	});

});


router.get('/login',function(req,res,next){
	res.render('site/login',{
		title: '注册',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()});
});

router.post('/login',function(req,res){
	
	var name = req.body.name,
		password = req.body.password,
		md5 = crypto.createHash('md5');		
		
	User.get(name,function(err,user){
		if(!user){
			req.flash('error', '该用户不存在，请先注册！！');
			return res.redirect('/login');
		}
		password = user.salt +  password;
		password = md5.update(password).digest('hex');
		
		//检查密码是否一致
		if(user.password != password){
			req.flash('error','密码错误！！');
			return res.redirect('/login');
		}
		
		req.session.user = user;
		req.flash('success','登录成功！！');
		res.redirect('/');	//登录成功后跳转到主页		
		
	});	
	
});

router.get('/logout',function(req,res,next){
	
	req.session.user = null;
	req.flash('success','您已经退出登录！！');
	res.redirect('/');
	
});

router.post('/form',function(req,res){
	
	var ss = req.body.username + "--" + req.body.password;

	res.send("Querying Info:" + ss);
});

module.exports = router;
