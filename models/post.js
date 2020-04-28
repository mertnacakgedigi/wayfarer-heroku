const mongoose = require('mongoose')


const PostSchema = mongoose.Schema({
    title : String,
    content : String,
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'User'
    },   
}, {timestamps: true})

const Post = mongoose.model('Post',PostSchema);

module.exports = Post;

