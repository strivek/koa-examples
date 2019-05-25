module.exports = (router) => {
    router.get('/list', async function (ctx, next) {
        ctx.body = 'this is in list';
    })
}