const mongoose = require('mongoose')
const Post = require('./post')


const CitySchema = mongoose.Schema({
    name: String,
    image: String,
    description : String,
    posts : [Post.schema],

})

const City = mongoose.model('City',CitySchema);

module.exports = City