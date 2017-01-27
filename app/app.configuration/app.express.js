module.exports = function(app,dependencies){

    app = dependencies.express();
    app.use(dependencies.bodyParser({json:true}));
    app.use(dependencies.morgan('dev'));
    app.use(dependencies.cors());

    return app;
};