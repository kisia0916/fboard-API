const router = require("express").Router()
const multer = require("multer")


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"photos/tweet_photos")
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name)
    }
})
const upload = multer({storage})
router.post("/tweet_photos",upload.single("file"),(req,res)=>{
    try{

        return res.status(200).json("画像アップに成功しました")
    }catch{
        return res.status(500).json("エラー")
    }
})
module.exports = router