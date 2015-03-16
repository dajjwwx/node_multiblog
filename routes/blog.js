var express = require('express');
var router = express.Router();
var fs = require('fs');


User = require('../models/user.js');
Post = require('../models/post.js');
Auth = require('../helpers/auth.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	
	Post.getAll(null,function(err, posts){
		
		if(err){
			posts = [];
		}
		console.log(posts.length);
		
		res.render('blog/index',{
			title:'Blog',
			posts: posts,
			user: req.session.user,		
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});			
	});
  
});

router.get('/create',function(req, res, next){
	
	Auth.checkLogin(req, res, next);
	
	res.render('blog/create',{
		title:'Create Blog',
		user: req.session.user,		
		success: req.flash('success').toString(),
		error: req.flash('error').toString()		
	});
	
	
	
});

router.post('/create',function(req, res, next){
	
	Auth.checkLogin(req, res, next);
	
	var currentUser = req.session.user;
	
	var data = {
		title: req.body.title,
		content: req.body.content,
		tag: req.body.tag,
		owner: currentUser.name
	};
	
	console.log(data);
	
	var post = new Post(data);
	post.save(function(err){
		if(err){
			req.flash('error',err);
			return res.redirect('/');
		}
		
		req.flash('success','发布成功~！');
		res.redirect('/blog');
	});
	
});

router.get('/update',function(req, res, next){
	
});

router.post('/update',function(req, res, next){
	
});

router.get('/upload',function(req, res, next){
	Auth.checkLogin(req, res, next);
	
	res.render('blog/upload',{
		user:req.session.user,
		title:'上传文件',
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
		
	});
});

router.post('/upload',function(req, res, next){
	
	console.log(req.body);
	console.log(req.files);
	
	// if(req.files.filePic!='undefined'){
		// var tempPath = req.files.filePic.path;
		// var target_path = '/public/upload/' + req.files.filePic.name;
// 		
		// // fs.renameSync(tempPath, target_path);
// 		
		// fs.rename(tempPath,target_path,function(err){
			// if(err)throw err;			
// 			
			// fs.unlink(tempPath);
		// });
	// }
	
	for(var i in req.files){
		if(req.files[i].size == 0){
			fs.unlinkSync(req.files[i].path);
			console.log('Successfully removed an empty file');
			
		}else{
			var target_path = './public/uploads/' + req.files[i].name;
			fs.renameSync(req.files[i].path, target_path);
			console.log('Successfully renamed a file');
		}
	}

	req.flash('success','文件上传成功！');
	res.redirect('/blog/upload');
});

router.get('/u/:name',function(req, res){
	//检查用户是否存在
	User.get(req,params.name, function(err,user){
		if(!user){
			req.flash('error', '用户不存在');
			return res.redirect('/blog/index');
		}
	});
	
	//查询并返回该用户的所有文章
	Post.getAll(user.name, function(err, posts){
		if(err){
			req.flash('error',err);
			return res.redirect('/blog/index');
		}
		res.render('blog/user',{
			title: user.name,
			posts: posts,
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});
});

router.get('/u/:name/:day/:title',function(req,res){
	Post.getOne(req.params.name, req.params.day, req.params.title, function(err,post){
		if(err){
			req.flash('error',err);
			return res.redirect('/blog/index');
		}
		res.render('blog/article',{
			title: req.params.title,
			post: post,
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});
});


module.exports = router;
