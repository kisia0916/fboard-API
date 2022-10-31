const mongoose = require("mongoose");
const ThreadNumSchma = new mongoose.Schema({
    threadId:{
        type:String,
        required:true,
        unique:true
    },
    threadNum:{
        type:Number,
        required:true,
        unique:true
    },
    wasdelete:{
        type:Boolean,
        default:false
    }
})
module.exports = mongoose.model("ThreadNum",ThreadNumSchma)