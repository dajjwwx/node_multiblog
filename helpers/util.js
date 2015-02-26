function Util(){}

module.exports = Util;

/**
 ********************************************* 
 *	生成随机字符 
 ******************************************
 * @param {Object} length
 */
Util.getRandomString = function(length){
	return Math.random().toString(36).substr(2,length);
};



