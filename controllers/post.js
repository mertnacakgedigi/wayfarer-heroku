const db =  require('../models')


const createPost = (req,res) => {
    db.Post.create(req.body,(err,newPost) => {
        if (err) {
            return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
          }
        db.City.findById(req.params.cityId,(err,foundCity)=>{
            if(err) {
                return res.status(400).json({status: 400, error: 'city not found!'})
            }
            foundCity.posts.push(newPost);

            foundCity.save(err,saveCity=>{
            if (err) {
                  return res.status(400).json({status: 400, error: 'Unable to save City.'});
                }

            return res.status(201).json({status: 201, message: "post saved!"})

            })
        })

 
      
    })
}


const updatePost=(req,res)=>{
    db.City.findById(req.params.cityId,(err,foundCity)=>{
        if(err){
           return res.status(400).json({status: 400, error: 'city not found!'}) 
        }

        let updatingPost=foundCity.posts.id(req.params.postId);

        if(!updatingPost){
             return res.status(400).json({status: 400, message: "could not find post"})
        }

        updatingPost.title=req.body.title;
        updatingPost.content=req.body.content;

        foundCity.save((err,saveCity)=>{
            if(err){
                return res.status(400).json({status: 400, error: 'city was not saved'});
            }

            db.Post.findByIdAndUpdate(req.params.postId,req.body,{new:true},(err,updatePost)=>{
                if (err) {
                      return res.status(400).json({status: 400, error: 'final post update was not possible.'});
                    }
                res.json(updatePost);
            })
        })
    })
}

const deletePost=(req,res)=>{
    db.City.findById(req.params.cityId,(err,foundCity)=>{
    if (err) {
      return res.status(400).json({status: 400, error: 'city not found! :('});
    } 

    const removePost=foundCity.posts.id(req.params.postId);

    if(!removePost){
        return res.status(400).json({status: 400, error: 'Could not find post'});
    }
    removePost.remove();

    foundCity.save((err,saveCity)=>{
        if(err){
            return res.status(400).json({status: 400, error: 'Your city was not saved'});
        }

        db.Post.findByIdAndDelete(req.params.postId,(err,deletedPost)=>{
            if(err){
                return res.status(400).json({status: 400, error: 'Something went wrong, post was not deleted'});
            }

            res.json(deletedPost);

        })
    })

    })
}

const showSinglePost = (req, res) => {
    db.Post.findById(req.params.id,(err,newPost)=>{
        if (err) {
            return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
          }      
        res.json(newPost)

    })
}

const showPost = (req, res) =>{
    db.Post.find({user : req.params.id}, (err,userPosts) =>{ 
        if (err) {
            return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
          }

    res.json(userPosts)
 
    })
}

const showUserPost = (req, res) =>{
    db.Post.find({user : req.params.id}, (err,userPosts) =>{ 
        if (err) {
            return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
          }

    res.json(userPosts)
 
    })
}

module.exports  = {
    createPost,
    showPost,
    updatePost,
    deletePost,
    showSinglePost,
    showUserPost,

}
