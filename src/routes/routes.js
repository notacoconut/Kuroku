'use strict';
var express = require('express'),
	cont = require('../controller/controller.js');

var router = express.Router();

router.route('/').all(cont.index);

module.exports.router = router;