const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    product:{
        type:String,
    },
    shopId:{
        type:String,
    }
})

module.exports =mongoose.model ('Order',orderSchema);