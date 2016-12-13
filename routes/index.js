const express = require('express');
const router  = express.Router();
const axios   = require('axios');

router.get('/', function (req, res, next) {
	const title = 'Dashboard';
	res.renderPage('index', {
		title: title,
	});
});

router.use('/ajax', require('./ajax'));

module.exports = router;
