const mongoose = require('mongoose')
const dbUrl = process.env.MONGODB_URI||"mongodb://localhost:27017/wayfarer"


mongoose.connect(dbUrl, {
    useNewUrlParser : true,
    useFindAndModify : false,
    useCreateIndex : true,
    useUnifiedTopology : true
}) 
    .then(()=> console.log("MongoDB Connected .."))
    .catch((err)=> console.log(`There is an ${err}`))


module.exports = {
    User : require('./user'),
    City : require('./city'),
    Post : require('./post')
}