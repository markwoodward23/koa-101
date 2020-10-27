const Koa = require('koa');
const Router = require('koa-router');
const proxy = require('koa-proxy');
const axios = require('axios');
 
const app = new Koa();
const router = new Router();

let cache = {};

const proxyHost = process.env.PROXY_HOST 

app.use(async (ctx, next) => {
  console.log(ctx.request.url);
  if (cache[ctx.request.url]) {
    console.log('SERVING CACHED DATA FOR' + ctx.request.url);
    ctx.body = cache[ctx.request.url]
  } else {
    try {
      if (!/\.(js|css|json|ico|txt)/.test(ctx.request.url)) {
        const res = await axios.get(`${proxyHost}${ctx.request.url}`);
        ctx.body = res.data;
        ctx.status = 200;
        cache[ctx.request.url] = res.data;
      } else {
        console.log('awaiting next');
        console.log(`${proxyHost}${ctx.request.url}`);
        await next();
      }
    } catch (e) {
      console.log(e);
    }
  }
});

app.use(proxy({
  host: proxyHost 
}));

app.listen(3000, () => {
  console.log('🚀');
});

