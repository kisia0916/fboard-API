const router = require("express").Router();
const fs = require("fs");
const ejs = require("ejs")
const User = require("../module/User")
let login_page = fs.readFileSync("./viwes/login.ejs","utf-8")
let create_page = fs.readFileSync("./viwes/newUser.ejs","utf-8")
const cookie = require("cookie")
const sesstion = require("express-session")
const profilePhotoList = [

]
router.get("/",(req,res)=>{
    let login_render = ejs.render(login_page,{
        title:"login",
        mess:""
    })
    //res.writeHead(200,{"Content-Type":"text/javascript"});
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write(login_render);
    res.end()
})
router.post("/",async(req,res,text)=>{
    let name = req.body.name;
    let pass = req.body.pass;
    try{
        const user = await User.findOne({
            name:name
        })
        let userId = user._id;
        console.log(user._id)
        if (user.pass == pass){
            console.log("ログイン成功")
            req.session.name1 = name;
            req.session.pass1 = pass;
            req.session.userId = userId;
            req.session.pass = user.pass
            
            res.redirect('/')

        }else{
            console.log("ユーザー名またはパスワードが違います")
            let login_render = ejs.render(login_page,{
                title:"login",
                mess:"ユーザー名またはパスワードが違います"
            })
            //res.writeHead(200,{"Content-Type":"text/javasctipt"});
            res.writeHead(200,{"Content-Type":"text/html"})
            res.write(login_render)
            res.end()
        }
    }catch{
        console.log("ユーザー名またはパスワードが違います")
    }
})
router.get("/newuser",(req,res)=>{
    let newUser_render = ejs.render(create_page,{
        title:"new",
        mess:""
    })
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write(newUser_render)
    res.end()
})
router.post("/newuser",async(req,res)=>{
    let name2 = req.body.name;
    let pass2 = req.body.pass;
    try{
        const user2 = await User.findOne({
            name:name2
        })
        if (user2.name == name2){
            console.log("エラー")
            let newUser_render = ejs.render(create_page,{
                title:"new",
                mess:"そのユーザー名は既に使われているか、パスワードの桁数が少なすぎます"
            })
            res.writeHead(200,{"Content-Type":"text/html"});
            res.write(newUser_render) 
            res.end()
        }
    }catch{
        try{
            let counter = 0;
            if (pass2.length >=3){
                    const newuser = await new User({
                        name:name2,
                        pass:pass2,
                    })
                    const user = newuser.save()
                    counter +=1;
                    res.status(200)
                    res.redirect("/")
                    res.end()
            }else{
                let newUser_render = ejs.render(create_page,{
                    title:"new",
                    mess:"パスワードの桁数が少なすぎます"
                })
                res.writeHead(200,{"Content-Type":"text/html"});
                res.write(newUser_render)
                res.end()
            }
        }catch{
            console.log("ユーザー登録に失敗しました")
            return res.status(500).json("エラーが発生しました")
    }
    }
})

router.post("/deleteuser",async(req,res)=>{
    try{
        let userPass = req.body.pass;
        let userId = req.body.userId;
        let deleteUser = await User.findById(userId);
        if (userPass == deleteUser.pass){
            await User.remove({_id:userId})
            
        }else{
            return res.status(500).json("パスワードが違います")
        }
        return res.status(200).json("ユーザーを削除しました")
    }catch{
        return res.status(500).json("エラーが発生しました")
    }
})

function setCookie(key,data,req){

}
module.exports = router