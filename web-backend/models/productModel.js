
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userId:{
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
    },
    image:{
        type:String,
    }

})

module.exports = mongoose.model('Product', productSchema);
