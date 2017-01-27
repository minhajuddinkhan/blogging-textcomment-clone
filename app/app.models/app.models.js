
module.exports = function ({mongoose}) {
    let Schema = mongoose.Schema;
    let models = {};

    let Blog = require('./blog.model')(Schema);
    models.Blog= mongoose.model('Blog', Blog);

    return models;
};