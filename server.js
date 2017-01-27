let app;
//node_module dependencies
let dependencies = require('./app/app.configuration/app.dependencies');
//server configuration
let config = require('./app/app.configuration/app.config')['dev'];
//initiating app instance using dependencies
app = require('./app//app.configuration/app.express')(app, dependencies);
//establish connection to database
require('./app//app.configuration/app.mongoose')(config, dependencies);
//requiring schemas for data models
let models = require('./app/app.models/app.models')(dependencies);
//requiring all middlewares
let middlewares = require('./app/app.middlewares/app.middleware.handler');
//router
(require('./app/app.router')(app,dependencies, models,middlewares));
let gzippo = dependencies.gzippo
let path = dependencies.path;
let express = dependencies.express;
app.use(gzippo.staticGzip("" + __dirname + "/TinaBowenFrontend"));
app.get('/',function(req,res) {
    res.sendFile(path.normalize(__dirname+'/TinaBowenFrontend/index.html'));
});

app.listen(config.port, () => {
    console.log('<-------------->SERVER<-------------->')
    console.log('PORT', config.port);
    console.log("Server started on: %s",(new Date()));

});