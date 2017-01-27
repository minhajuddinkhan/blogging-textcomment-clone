/**
 * Created by Minhaj on 1/27/2017.
 */
module.exports = function(router, models) {

    function postComment(req,res){

        if(!req.params.id){
            return res.status(404).json({success: false, message: 'Blog id not found', code :404});
        }
        if(!req.body.paragraphComment){
            return    res.status(500).json({success: false, message: 'comment not recieved', code: 500});
        }
        let paragraphId = req.body.paragraphId || null;
        let paragraphContent = req.body.paragraphContent || null;
        let paragraphComment = req.body.paragraphComment;

        let commentObject = { paragraphId, paragraphContent , paragraphComment};

        models.Blog.findByIdAndUpdate(
            req.params.id,
            {$push: {"comments": commentObject}},
            {upsert: true, new : true},
            function(err,blog) {
                if (err) {
                    res.status(500).json({message: "internal server error"});
                }else{
                    console.log(blog);
                    res.status(200).json({
                        success: true,
                        code: 200,
                        data: blog.comments[blog.comments.length-1]
                    });

                }
            }
        );


    }

    function deleteComment(req,res){



        let commentId = req.query.commentId;
        let blogId = req.params.id;
        let comment;
        if(!blogId){
            return res.status(404).json({success: false, message: 'Blog id not found', code :404});
        }
        if(!commentId){
            return    res.status(500).json({success: false, message: 'comment not recieved', code: 500});
        }
        models.Blog.findOne({_id : blogId},function(err,blog){
            if(err){
                res.status(500).json({message: "internal server error"});
            }else if(blog){
                for(let i = 0 ; i < blog.comments.length ; i ++) {
                    if (blog.comments[i]._id == commentId) {
                        blog.comments.splice(i,1);
                        break;
                    }
                }
                blog.markModified('comments');
                blog.save(function (err) {
                    if(err){
                        res.status(500).json({message: "internal server error"});
                    }else {
                        res.json({success: true, code: 200});
                    }
                })


            }
        });
    }

    router.route('/api/comment/:id')
        .post(postComment)
        .delete(deleteComment);

};