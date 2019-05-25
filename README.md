# 启动
npm install 
全局安装 pm2 

pm2 start koa.js 启动 pm2
## base-1 
pm2 logs 查看日志
```
0|koa    | console in middleware 
0|koa    | GET / - 6ms
0|koa    | console in middleware 
0|koa    | GET /favicon.ico - 0m
```
1. app.use 中间件方法内，next 执行后，会直接跳转到下一个中间件，全部中间件执行完毕后
会倒序执行 next 方法后的内容
2. 在node第一次启动时会执行全部代码，后续请求只会执行中间件内的方法，因此对于请求的处理都需要
在中间件内完成

## base-2
1. app.use 和 route.get 都严格遵循中间件机制，next 标识跳转下一个中间件，没有 next，即停止中间件流程返回结果
2. route.get 可以重复针对一个路由做多次重复处理




