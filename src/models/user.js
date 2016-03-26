'use strict';

var mongoose = require('mongoose'),
		Scheme   = mongoose.Schema;

var UserSchema = new Schema({
	email: String,
	firstName: String,
	lastName: String,
	passwordHash: String,
	passwordSalt: String
});

mongoose.model('User', UserSchema);