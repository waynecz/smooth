const express = require('express');
const router  = express.Router();

router.get('/',  (req, res, next) => {
	const title = 'Smooth';
	res.renderPage('index', {
		title: title,
	});
});

module.exports = router;
