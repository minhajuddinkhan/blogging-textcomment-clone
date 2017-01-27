
module.exports =  function(router, models) {

    function getBlog(req, res) {
        models.Blog.find({}, function (err, data) {
            if (err) {
                res.status(500).json({message: "internal server error"});
            } else if (data) {
                /*since there is only one dummy blog in database*/
                res.json(data[0]);
            }
        })
    }

    router.route('/api/blog')
        .get(getBlog)
    /* .post(login)
     put()
     .delete();
     */;
}



