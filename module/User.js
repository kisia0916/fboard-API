const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const userSchma = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        max:10,
        min:3,
        unique:true,
    },
    pass:{
        type:String,
        required:true,
        min:3,
        max:50
    },
    myMess:{
        type:Array,
        default:[]
    },
    like:{
        type:Array,
        default:[]
    },
    history:{
        type:Array,
        default:[]
    },
},
    {timestamps:true}
)

module.exports = mongoose.model("User",userSchma);