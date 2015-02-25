/***********************
 *此文件 测试nodejs连接MongoDB 
 */


var express = require('express');
var mongodb = require('./models/db');

var app = express();

app.get('/',function(req,res){

	mongodb.open(function(err,db){
		if(err){
			mongodb.close();
			
			console.log("Mongodb connect error~~~~");
			
		}else{
			// db.collection('users',function(err,collection){
// 				
				// mongodb.close();
// 				
				// if(err){
					// console.log('get Collection Error');					
				// }else{
					// collection.find({},{},function(err,user){
						// if(err){
							// console.log('Get User information Error');
						// }else{
							// for(var i=0; i < user.length; i++){
								// console.log(user[i].username);
							// }
							// // console.log(user);
						// }
					// });
				// }
			// });
			
			console.log("Hello users");
/****Insert data into mongoDB **********************************************************
			db.collection('users',function(err,collection){
				collection.insert({"username":"testuser","email":"testuser@yuekegu.com"},{
					safe:true
					},function(err,user){
						if(err){
							console.log('get Users info Error');
						}else{
							console.log(user[0].username);
						}
					});
			});
*******************************************************************************/		

/***************FindOne方法测试 ********************************************************	
			db.collection('users',function(err,collection){
				collection.findOne({
					username:'dajjwwx'
				},function(err,userlist){
					mongodb.close();
					
					
					console.log(userlist.username + userlist.email);
				});
			});			
*************************************************************************************************/

/************************Find()方法测试**测试不成功*******************************************************
			db.collection('users',function(err,collection){
				collection.find({},{},function(err,userlist){					
					console.log(userlist[0].username);					
				});					
			});
***********************************************************************************************/
		}
	});
	
	res.send("Hello world");
});

app.listen(8000,function(req,res){
	console.log('App is running at port 3000');
});

