
module.exports = function(Schema){
    let _blog = new Schema({


        author : String,
        title: String,
        content : String,
        comments : [
            {
                paragraphId : String,
                paragraphContent : String,
                paragraphComment : String,

            }
        ]
    });
    return _blog;
};