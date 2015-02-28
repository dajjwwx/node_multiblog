/*********************
 *权限控制 
 */

function Auth(){}

module.exports = Auth;

/**
 * 
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */

Auth.checkLogin = function(req,res,next){
	if(!req.session.user){
		req.flash('error','未登录');
		res.redirect('/login');
	}
	next();
};

/**
 * 
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
Auth.checkNotLogin = function(req,res,next){
	if(req.session.user){
		req.flash('error','已登录');
		res.redirect('back');	//已经登录则返回之前 的页面
	}
	next();
};
