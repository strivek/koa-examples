module.exports = router=>{
    router.get('/user',(ctx,next)=>{
        ctx.body = 'this is user';
        next();
    })
}