const mongoose = require("mongoose");
const MiniThreadSchma = new mongoose.Schema({
    threadId:{
        type:String,
        required:true
    },
    threadName:{
        type:String,
        required:true
    },
    madeBy:{
        type:String,
        required:true
    },
    profile:{
        type:String,
        default:""
    },
    tweetCounter:{
        type:Number,
        default:0
    },
    likenNum:{
        type:Number,
        default:0,
    },
},{timestamps:true})
module.exports = mongoose.model("MiniThread",MiniThreadSchma)