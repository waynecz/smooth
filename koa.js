const Koa = require('koa');
const path = require('path');

const render = require('koa-art-template');

const router = require('./routes/index');
const logger = require('koa-logger');
const responseTime = require('koa-response-time');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});

app.use(static(
  path.join(__dirname, './public')
));

app.use(logger());
app.use(responseTime());

app.use(bodyParser({
  onerror: (err, ctx) => {
    ctx.throw('Error parsing the body information', 422);
  }
}));

// 开发环境下启用HMR
if (process.env.NODE_ENV !== 'production') {
  app.use(require('./middleware/webpackHMR').webpackDevMiddleware);
  app.use(require('./middleware/webpackHMR').webpackHotMiddleware)
}

app.use(router.routes());

app.on('error', (err, ctx) => {
  // ctx.status = '404';
  // ctx.render('404');
  console.log('404')
});

app.listen(3333);