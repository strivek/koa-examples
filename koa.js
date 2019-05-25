const Koa = require('koa');
const Router = require('koa-router');
var app = new Koa();
var router = new Router({
    'prefix': '/app' //前缀务必加上/
});
// logger
console.log('console in middlewares out');

app.use(async (ctx, next) => {
    console.log('console in middleware ');
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});
app.use(async (ctx, next) => {
    console.log('hello word');
    //ctx.body = 'hello world';
    next();
});

router.get('/list/:id', (ctx, next) => {
    console.log('hello world router')
    ctx.body = ctx.params; //查看传参
    next();
});

router.get('router2','/router2', (ctx, next) => {
    console.log('hello world router 2');
    ctx.body = 'hello world router 2'
    next();
});
//只提供给:id 的路径，执行这个中间件
router.use('/list/:id', function () {});

router.get('error', '/error', (ctx, next) => {
    ctx.body = '404页面';
})





//post 会经过此方法
router
    .post('/', (ctx, next) => {
        console.log('hello world router post');
        ctx.body = 'hello world router post';
    })
    .put('/', (ctx, next) => {
        ctx.body = 'hello world router put';
    })
    //不同类型的请求
    .del('/', (ctx, next) => {
        ctx.body = 'hello world router del';
    })
    //重定向到404
    .all('/all', (ctx, next) => {
        router.url('router2');
        //ctx.redirect('error');
    });



//将路由赋给中间件
app.use(router.routes())
//当接口定义的是 get，但是实际请求的是 post，会返回405 Method Not Allowed
app.use(router.allowedMethods());




app.listen(3000);