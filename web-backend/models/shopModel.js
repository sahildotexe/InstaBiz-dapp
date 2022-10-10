const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    shopname:{
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
    }
})

module.exports =mongoose.model ('Shop',shopSchema);
