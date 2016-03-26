var UserController = function (userModel, session, mailer){
	this.crypto = require('crypto');
	this.uuid = require('node-uuid');
	this.ApiResponse = require('../models/api-response.js');
	this.ApiMessages = require('../models/api-messages.js');
	this.UserProfileModel = require('../models/userProfileModel.js');
	this.userModel = userModel;
	this.session = session;
	this.mailer = mailer;
}

UserController.prototype.getSession = function() {
	return this.session;
};
UserController.prototype.setSession = function(session){
	this.session = session;
};
UserController.prototype.hashPassword = function(password, salt, callback){
	var iter = 10000,
		keyLen = 64;
	this.crypto.pbkdf2(password, salt, iter, keyLen, callback);
};
UserController.prototype.logon = function(email, password, callback){
	// creat reference to UserController instance
	var me = this;

	// try to find a user with the same email in the db. 
	me.userModel.findOne({ email: email}, function(err, user){
		//if err, invoke callback arg
		if(err){
			return callback(err, new me.ApiResponse({success: false, 
				extras: { msg: me.ApiMessages.DB_ERROR} }));
		}
		//if findOne produces a user, hash the password provided by the user
		//compare it to the one found in the DB
		if(user){
			me.hashPassword(password, user.passwordSalt, function (err, passwordHash){
				if(passwordHash == user.passwordHash){
					var userProfileModel = new me.userProfileModel({
						email: user.email,
						firstName: user.firstName,
						lastName: user.lastName
					});
					me.session.userProfileModel = userProfileModel;

					return callback(err, new me.ApiResponse({
						success: true, extras: {
							userProfileModel: userProfileModel
						}
					}));
				} else{
					return callback(err, new me.ApiResponse({ success: 

						false, extras: { msg: me.ApiMessages.INVALID_PWD } }));
				}
			});
		} else{
			return callback(err, new me.ApiResponse({success: false, 
				extras: {msg: me.ApiMessages.EMAIL_NOT_FOUND } }));
		} 
	});
};
UserController.prototype.logoff = function() {
	if(this.session.userProfileModel) delete this.session.userProfileModel;
	return;
};
UserController.prototype.register = function(newUser, callback) {
	var me = this;
	me.userModel.findOne({ email: newUser.email }, function(err, user){
		if(err){
			return callback(err, new me.ApiResponse( {success: false, 
				extras: { msg: me.ApiMessages.DB_error } }));
		}
		if(user) {
			return callback(err, new me.ApiResponse({ success: false, 
				extras: { msg: me.ApiMessages.EMAIL_ALREADY_EXISTS } }));
		} else {
			newUser.save(function (err, user, numberAffected){
				if(err){
					return callback(err, new me.ApiResponse({ success: false, 
						extras: { msg: me.ApiMessages.DB_ERROR } }));
				}
				if(numberAffected === 1){
					var userProfileModel = new me.userProfileModel({
						email: user.email,
						firstName: user.firstName,
						lastName: user.lastName
					});

					return callback(err, new me.ApiResponse({
						success: true,
						extras: {userProfileModel: userProfileModel}
					}));
				} else{
					return callback(err, new me.ApiResponse({
						success: false,
						extras: {msg: me.ApiMessages.COULD_NOT_CREATE_USER } 
					}));
				}
			});
		}
	});
};

module.exports = UserController;