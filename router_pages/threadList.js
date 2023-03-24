const router =require("express").Router();
const fs = require("fs");
const ejs = require("ejs");
let home_page = fs.readFileSync("./viwes/index.ejs","utf-8");
let User = require("../module/User")
router.get("/",async(req,res,text)=>{
    if (req.session.name1){
        console.log("tset")
        let userData = await User.findById(req.session.userId);
        let index_render = ejs.render(home_page,{
            UserName:req.session.name1,
        })
        //setCookie("userId",req.session.userId,res);
        // res.clearCookie("userId1")
        // res.cookie("userId1",req.session.userId,{})]
        res.cookie("userId1",req.session.userId,{})
        res.cookie("pass",req.session.pass,{})
        res.cookie("name",req.session.name1,{})
        res.writeHead(200,{"Content-Type":"text/html"});
        res.write(index_render)
        res.end()
    }else{
        res.redirect('/login');
        res.end()
    }

})

module.exports = router