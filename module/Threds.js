const mongoose = require("mongoose");
const threadSchema = new mongoose.Schema({
    threadNname:{
        type:String,
        required:true,
    },
    threadSubId:{
        type:String,
        required:true
    },
    threadNum:{
        type:Number,
        required:true
    },
    madeBy:{
        type:String,
        required:true,
    },
    profile:{
        type:String,
        default:""
    },
    likenNum:{
        type:Number,
        default:0,
    },
    likes:{
        type:Array,
        default:[]
    },
    tweets:{
        type:Array,
        default:[]
    },
    wasdelete:{
        type:Boolean,
        default:false
    },
    titleImgPath:{
        type:String,
        default:""
    },
    tags:{
        type:Array,
        default:[]
    }
},{timestamps:true})
module.exports = mongoose.model("Threads",threadSchema);