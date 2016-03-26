'use strict';
module.exports.index = function(req,res){
	res.status(200);
	res.render('index');
};
module.exports.signup = function(req,res){
	res.status(200);
	res.render('users/signup');
};