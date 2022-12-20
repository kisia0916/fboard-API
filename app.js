const express = require("express");
const app= express();
const ejs = require("ejs")
const fs = require("fs");
const cookie = require("cookie");
const body_pase = require("body-parser")
const index_page = fs.readFileSync("./viwes/index.ejs","utf-8");
const debug_page = fs.readFileSync("./viwes/debug.ejs","utf-8")
const login_router = require("./router/login")
const therad_page =require("./router/threads")
const user_page = require("./router/user")
const mess_page = require("./router/mess")
const mongoose = require("mongoose");
const session = require("express-session");
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const path = require("path");
const router = require("./router/login");
const User = require("./module/User");
const { escape } = require("querystring");
app.set('trust proxy', 1)
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie:{
    httpOnly: true,
    secure: false,
    maxage: null
    }
}
))
mongoose.connect("mongodb+srv://fumi:20080916@cluster0.ehufboy.mongodb.net/gyokuboard?retryWrites=true&w=majority").then(()=>console.log("connectionDB")).catch((err)=>console.log(err))
app.use(express.json())
app.use("/router", express.static("router"));
app.use("/viwes",express.static("views"))
app.use("/style",express.static("style"));
app.use("/profilePhotos",express.static("profilePhotos"));
app.use("/front-scripts",express.static("front-scripts"));
app.use(body_pase.json());//////////////////////////////   ここ重要
app.use(body_pase.urlencoded({ extended: true }));//////
app.use(express.static(path.join(__dirname, "js")));
app.get("/",async(req,res)=>{
    let userdata =req.session.name1
    let userName = null;
    console.log(req.session.name1)
    if (!userdata){
        res.redirect('/login');
        userName = "Gest"
        res.end()
    }else{
        console.log("tset")
        let userData = await User.findById(req.session.userId);
        let index_render = ejs.render(index_page,{
            UserName:req.session.name1,
        })
        //setCookie("userId",req.session.userId,res);
        res.clearCookie("userId1")
        res.cookie("userId1",req.session.userId,{})
        res.writeHead(200,{"Content-Type":"text/html"});
        res.write(index_render)
        res.end()
    }
});
app.post("/",(req,res)=>{
    console.log(req.body.msg)
    let index_render = ejs.render(index_page,{
    })
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write(index_render)
    res.end()
})
app.get("/debug",(req,res)=>{
    let index_render = ejs.render(debug_page,{
    })
    //setCookie("userId",req.session.userId,res);
    res.clearCookie("userId1")
    res.cookie("userId1",req.session.userId,{})
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write(index_render)
    res.end()
})
app.use("/login",login_router)
app.use("/api/thread",therad_page)
app.use("/api/tweet",mess_page)
app.use("/api/user",user_page)
io.on("connection",(socket)=>{
    console.log("socket")
})
server.listen(3000,()=>{
    console.log("server run")
})
// function setCookie(key,value,res){
//     let cookie = escape(value);
//     res.setHeader('Set-Cookie',[cookie]);
// }