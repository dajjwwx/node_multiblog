
var mongodb = require('./db'),
	markdown = require('markdown').markdown;

Time = require('../helpers/time');

function Post(post){
	this.title = post.title;
	this.content = post.content;
	this.tag = post.tag;	
	this.owner = post.owner;
}

module.exports = Post;

Post.prototype.save = function(callback){
	var post = {
		title: this.title,
		content: this.content,
		tag: this.tag,
		owner: this.owner,
		time: Time.get(),
		
	};
	
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
		
		//读取Post集合
		db.collection('posts',function(err,collection){
			
			if(err){
				mongodb.close();
				return callback(err);
			}
			
			collection.insert(post,{
				safe: true,
			},function(err){
				mongodb.close();
				if(err){
					return callback(err);//失败，返回err
				}
				callback(null);
			});
			
		});
		
		
	});
};

Post.getAll = function(name,callback){
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
		
		//读取Post集合
		db.collection('posts',function(err,collection){
			
			if(err){
				mongodb.close();
				return callback(err);
			}
			
			var query = {};
			
			if(name){
				query.name = name;
			}
			
			collection.find(query).sort({
				time:-1
			}).toArray(function(err,docs){
				mongodb.close();
				if(err){
					return callback(err);
				}
				
				docs.forEach(function(doc){
					doc.content = markdown.toHTML(doc.content);
				});
				
				callback(null,docs);
			});
			
		});
	});
};

Post.getOne = function(name, day, title, callback){
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
		db.collection('posts',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}			
			
			collection.findOne({
				"owner": name,
				"time.day": day,
				"title": title				
			},function(err, doc){
				mongodb.close();
				if(err){
					return callback(err);
				}
				doc.post = markdown.toHTML(doc.post);
				callback(null, doc);
			});
			

			
		});
	});
};
