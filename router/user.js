const router = require("express").Router();
const User = require("../module/User")
const Thread = require("../module/Threds")
const MiniThread = require("../module/MiniThread")
const mongoose = require("mongoose");
const ThreadNums = require("../module/ThreadNums");
const io_s = require("../app");

router.get("/getLike", async (req, res) => {
    try {
        let userId = req.body.userId;
        let user = await User.findById(userId);
        let likeList = user.like;
        let threadList = []
        // console.log(likeList)
        for (let i = 0; likeList.length > i; i++) {
            let likeThread = await Thread.findOne({ threadSubId: likeList[i] })
            threadList.push(likeThread)
        }
        return res.status(200).json(threadList)
    } catch {
        return res.status(500).json("エラー")
    }
})
router.post("/getLike2", async (req, res) => {
    try {
        let userId = req.body.userId;
        let user = await User.findById(userId);
        let likeList = user.like;
        likeList.reverse()
        let threadList = []
        // console.log(likeList)
        for (let i = 0; likeList.length > i; i++) {
            let wad = await ThreadNums.findOne({ threadId: likeList[i] })
            // console.log(wad)
            if (wad != null) {
                if (wad.wasdelete == false) {
                    let likeThread = await MiniThread.findOne({ threadId: likeList[i] })
                    threadList.push(likeThread)
                } else {
                    await user.updateOne({
                        $pull: {
                            like: likeList[i]
                        }
                    })
                    console.log("fffffffffffffffffffffffff")
                }
            } else {
                await user.updateOne({
                    $pull: {
                        like: likeList[i]
                    }
                })
            }
        }
        return res.status(200).json(threadList)
    } catch {
        return res.status(500).json("エラー")
    }
})
//履歴を取得
router.get("/gethistory", async (req, res) => {
    try {
        let userId = req.body.userId;
        let getUser = await User.findById(userId)
        let historyList = getUser.history;

        let gethistory = []
        for (let i = 0; historyList.length > i; i++) {
            let his1 = await Thread.findById(historyList[i]);
            gethistory.push(his1)
        }
        return res.status(200).json(gethistory)
    } catch {
        return res.status(500).json("エラー")
    }
})
router.post("/gethistory2", async (req, res) => {
    try {
        let userId = req.body.userId;
        let getUser = await User.findById(userId)
        let historyList = getUser.history;
        historyList.reverse()
        // console.log(historyList)
        let gethistory = []
        for (let i = 0; historyList.length > i; i++) {
            let his1 = await MiniThread.findOne({ threadId: historyList[i] })
            // console.log(his1)
            gethistory.push(his1)
        }
        return res.status(200).json(gethistory)
    } catch {
        return res.status(500).json("エラー")
    }
})
//自分のスレッドを取得
router.get("/getmythread", async (req, res) => {
    let userId = req.body.userId;
    try {
        let myuser = await User.findById(userId);
        let myThreadList = myuser.myMess;
        let threadList = [];
        for (let i = 0; myThreadList.length > i; i++) {
            let mythread = await Thread.findOne({ threadSubId: myThreadList[i] })
            threadList.push(mythread)
        }
        return res.status(200).json(threadList)
    } catch {
        return res.status(500).json("エラー")
    }

})
router.post("/getmythread2", async (req, res) => {
    let userId = req.body.userId;
    try {
        let myuser = await User.findById(userId);
        let myThreadList = myuser.myMess;
        myThreadList.reverse()
        let threadList = [];
        for (let i = 0; myThreadList.length > i; i++) {
            let mythread = await MiniThread.findOne({ threadId: myThreadList[i] })
            threadList.push(mythread)
            // console.log(mythread)
            if (mythread == null) {
                await myuser.updateOne({
                    $pull: {
                        like: myThreadList[i]
                    }
                })
            }
        }
        return res.status(200).json(threadList)
    } catch {
        return res.status(500).json("エラー")
    }

})
//ユーザー情報を取得
router.post("/getuserdata", async (req, res) => {
    try {
        let data = await User.findById(req.body.userId);
        //homenewthreadのアイコン取得で使用中、パスワードの変更の時にｍ気を付けるように
        return res.status(200).json(data);
    } catch {
        return res.status(500).json("エラー");
    }
})
router.post("/getprofile", async (req, res) => {
    try {
        let hostuser = await User.findById(req.body.userId);
        let profileText = hostuser.profileMess;
        return res.status(200).json(profileText)
    } catch {
        return res.status(500).json("エラー")
    }
})
router.post("/setprofile", async (req, res) => {
    try {
        let hostuser = await User.findById(req.body.userId);
        await hostuser.updateOne({
            $set: {
                profileMess: req.body.newProfile
            }
        })
        return res.status(200).json(hostuser)
    } catch {
        return res.status(500).json("エラー")
    }
})
router.post("/getuserimg", async (req, res) => {
    try {
        let user_name = req.body.name
        let user = await User.findOne({ name: user_name })
        return res.status(200).json(user.profliePhoto)
    } catch {
        return res.status(500).json("エラー")
    }
})


module.exports = router
