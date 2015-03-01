var express = require('express');
var path = require('path');

var mongo = require("mongodb");
var session  = require('express-session');
var MongoStore = require('connect-mongostore')(session);



var settings = require('./settings');
var flash = require('connect-flash');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var multiparty = require('connect-multiparty');//文件上传中间件


var routes = require('./routes/index');
var user = require('./routes/users');
var blog = require('./routes/blog');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



/********************SESSION  BEGIN***********************************/
app.use(session({
	secret: settings.cookieSecret,
	key: settings.db,
	cookie: {maxAge:1000*60*60*24*30},
	store: new MongoStore({
		db:settings.db
	}),
//	proxy: true,
	resave: true,
	saveUninitialized: true,
}));


/************************SESSION END**********************************************/


app.use(flash());

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multiparty({keepExtensions:true, uploadDir: './public/uploads'}));//配置文件上传中间件
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/user',user);
app.use('/blog', blog);


app.use(function(req,res,next){
	var ss = req.session;
	if(ss.views){
		ss.views++;		
	}else{
		ss.views = 1;
	}	
	console.log('views is '+ss.views);

	next();
});


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

//为使用supervisor，在上线之前
//module.exports = app;

var server = app.listen(3000,function(){
	console.log('Express server listening op port + '+ 3000);
});
