'use strict';
var express = require('express'),
	cont = require('../controller/controller.js'),
	users = require('../controller/user.controller.js');

var router = express.Router();

router.route('/').all(cont.index);

router.route('/signup').all(cont.signup)

router.route('/signup').post(function(req,res){
	users.register(new User({firstName : req.body.firstName, lastName: req.body.lastName, email: req.body.email, }))
});

module.exports.router = router;