const router  = require('koa-router')();

router.get('/',  async (ctx, next) => {
	ctx.render('index', {
		title: 'Smooth'
	});
});

module.exports = router;
