/*
initializing router
*/
module.exports = function (app,dependencies,models) {
    let router = dependencies['express'].Router();
    
    require('./app.modules/blog.module')(router,models);
    require('./app.modules/comment.module')(router,models);
    
     app.use(router);
}