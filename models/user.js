const mongoose = require("mongoose");


const UserSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    profile_name : {
        type : String
    },
    password :{
        type : String,
        required : true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    city : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'City'
    },
})

const User = mongoose.model('User',UserSchema );
module.exports = User