const Koa = require('koa');
const Router = require('koa-router');
 
const app = new Koa();
const router = new Router();
 
router.get('/', async (ctx, next) => {
  console.log('beep boop beep');
  ctx.status = 200;
  ctx.body = {
    data: "wow"
  }
});
 
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('🚀');
});