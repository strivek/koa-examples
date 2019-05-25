const Koa = require('koa');
const Router = require('koa-router');
var app = new Koa();
var router = new Router();
//加载路由组件
require('./routers/index')(router);

app.use((ctx,next)=>{
    console.log(router);
    next();
});

//将路由赋给中间件
app.use(router.routes())
//当接口定义的是 get，但是实际请求的是 post，会返回405 Method Not Allowed
app.use(router.allowedMethods());

app.listen(3000);