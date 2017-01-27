//jwt middleware

module.exports = function(req,res,next){
    console.log('sample jwt middleware.');
    next();
}