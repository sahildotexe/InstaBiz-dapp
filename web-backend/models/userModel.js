const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone_number:{
        type:Number,
    },
    uid:{
        type:String,
        required:true
    },
    igid:{
        type:String,
    }
})


module.exports = mongoose.model('User', userSchema);