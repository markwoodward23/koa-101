const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');

const app = new Koa();

app.use(serve('./public'));

app.listen(3000, () => {
  console.log('🚀');
});
