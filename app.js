var express = require('express');
var path = require('path');

var mongo = require("mongodb");


/**测试连接MongoDB***************************************************************
var db = require('./models/db.js');

db.open(function(err,database){
	if(err){
		throw err;
	}else{
		console.log("Connect to mongodb");
		database.collection('usercollection',function(err,collection){
			
			var user = {"username":"newtestuser1","email":"hello@163.com"};
			
			collection.insert(user);
			
			collection.find(function(err,user){				
				if(err){
					throw err;
				}else{
					console.log(user);
				}				
			});
		});
	}
});
**************************************************************/
//var MongoStore = require('connect-mongo')(express);
//var settings = require('./settings');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var user = require('./routes/users');
//var blog = require('./routes/blog');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/user',user);
//app.use('/blog', blog);

/********************暂时不用***********************************
app.use(express.session({
	secret: settings.cookieSecret,
	key: settings.db,
	cookie: {maxAge:1000*60*60*24*30},
	store: new MongoStore({
		db:settings.db
	}),
}));
*/


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
