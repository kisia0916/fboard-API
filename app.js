const express = require("express");
const app= express();
const ejs = require("ejs")
const fs = require("fs");
// const helmet = require("helmet")
const cookie = require("cookie");
const body_pase = require("body-parser")
const index_page = fs.readFileSync("./viwes/index.ejs","utf-8");
const debug_page = fs.readFileSync("./viwes/debug.ejs","utf-8")
const login_router = require("./router/login")
const therad_page =require("./router/threads")
const user_page = require("./router/user")
const mess_page = require("./router/mess")
const upload_page = require("./router/upload")
const home_page = require("./router_pages/home")
const search_page = require("./router_pages/search_page")
const threadlist_page = require("./router_pages/threadList")
const thread_page = require("./router_pages/thread._page");
const tags_page = require("./router_pages/tag_pages")
const socket_fun_1 = require("./socket_functions/socket1")
const mongoose = require("mongoose");
const session = require("express-session");
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const path = require("path");
const router = require("./router/login");
const User = require("./module/User");
const { escape } = require("querystring");
const change_page = require("./socket_functions/socket1");


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

// app.use("/router", express.static("router"));
app.use("/viwes",express.static("views"))
app.use("/style",express.static("style"));
app.use("/profilePhotos",express.static("profilePhotos"));
app.use("/front-scripts",express.static("front-scripts"));
// app.use("/router_pages",express.static("router_pages"));
app.use("/photos",express.static("photos"))

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
        // console.log("tset")
        //let userData = await User.findById(req.session.userId);
        // let index_render = ejs.render(index_page,{
        //     UserName:req.session.name1,
        // })
        // //setCookie("userId",req.session.userId,res);
        // res.clearCookie("userId1")
        // res.cookie("userId1",req.session.userId,{})
        // res.writeHead(200,{"Content-Type":"text/html"});
        // res.write(index_render)
        // res.end()
        //homeにリダイレクト
        res.redirect('/home')
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
//404

app.use("/login",login_router)
app.use("/api/thread",therad_page)
app.use("/api/tweet",mess_page)
app.use("/api/user",user_page)
app.use("/api/upload",upload_page)

//ここからページのルーティング設定
app.use("/home",home_page)
app.use("/threadlist",threadlist_page)
app.use("/thread",thread_page)
app.use("/search",search_page)
app.use("/tags",tags_page)

//ここからsocketの処理
let user_list = []
let user_id_list = []
let user_pos = {
    home:[],
    threadList:[],
    tags:[],
    seatch:[],
    thread:[
        {threadId:"",user:[]}
    ]
}

io.on("connection",(socket)=>{
    let userId = ""//roomIdと兼用
    change_page(socket,"a","b")
    socket.on("connection_data",(data)=>{
        if(user_id_list.indexOf(data.id) == -1){
            user_list.push(data)
            user_id_list.push(data.id)
            userId = data.id
            socket.join(userId)
            io.to(userId).emit("checkonline_req",{tset:"hello"})

            console.log(user_list,user_id_list)
        }else{
            console.log(user_list)
            socket.join(userId)
            io.to(userId).emit("checkonline_req",{tset:"hello"})
        }
    })
    socket.on("changepage",(data)=>{
        if(userId != ""){
            let id = data.id
            let obj = user_list[user_id_list.indexOf(userId)]
            user_list[user_id_list.indexOf(userId)] = change_page(socket,obj,data.next)
            console.log(user_list[user_id_list.indexOf(userId)])

        }
    })
    socket.on("newtweet",(data)=>{

    })
    //切断処理
    socket.on("disconnect",()=>{
        // let a = user_list[user_id_list.indexOf("63da6b28a0f6599e689c6227")].clientCounte)
        // if(user_list[user_id_list.indexOf(userId)].clientCounter <= 0){
        //     user_list.splice(1,user_id_list.indexOf(userId))
        //     user_id_list.splice(1,user_id_list.indexOf(userId))
        //     console.log(user_id_list,user_list)
        // }
        if(userId != ""){
            console.log("ooooooooooooooooooooo")
            io.to(userId).emit("check_discon_user_state",{name:userId})
            // user_list.splice(user_id_list.indexOf(userId),1)
            // user_id_list.splice(user_id_list.indexOf(userId),1)
            // socket.emit("checkonline_req",)
            // console.log(user_id_list,user_list)
        }
    })
})

server.listen(3000,()=>{
    console.log("server run")
})

// function setCookie(key,value,res){
//     let cookie = escape(value);
//     res.setHeader('Set-Cookie',[cookie]);
// }