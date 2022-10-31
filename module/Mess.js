const mongoose = require("mongoose");
const messageSchma = new mongoose.Schema({
    threadId:{
        type:String,
        required:true
    },
    tweetId2:{
        type:String,
        required:true
    },
    messText:{
        type:String,
        required:true
    },
    returnTo:{
        type:String,
        default:null
    },
    imgPath:{
        type:String,
        default:null
    },
    userId:{
        type:String,
        required:true
    },
    wasdelete:{
        type:Boolean,
        default:false
    },
},
{timestamps:true})
module.exports = mongoose.model("Mess",messageSchma)