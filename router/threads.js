const router = require("express").Router();
const mongoose = require("mongoose")
const Thread = require("../module/Threds");
const User = require("../module/User")
const Tweet = require("../module/Mess")
const ThreadNum = require("../module/ThreadNums")
const MiniThread = require("../module/MiniThread")
const uuid = require("node-uuid");
const { findById, findOne } = require("../module/User");
const { find } = require("../module/ThreadNums");
const getThreadNum = 7;
router.post("/newthread",async(req,res)=>{
    try{
        //ここでスレッドを作成
        let setNum = 0;
        let threadcount = await Thread.find().count()
        if (threadcount>0){
            const mostNewThread =await  Thread.find({wasdelete:false}).sort({ $natural: -1 }).limit(1);
            setNum = mostNewThread[0].threadNum+1
        }else{
            setNum = 0;
        }
        const newthread = await new Thread({
                threadNname:req.body.threadname,
                threadSubId:uuid.v4(),
                madeBy:req.body.username,
                threadNum:setNum,
                profile:req.body.profile
            })
        let threadNumCounter = await ThreadNum.find().count()
        const newThreadNum = await new ThreadNum({
            threadId:newthread.threadSubId,/////////threadNumにはさぶIDで登録してるので注意
            threadNum:threadNumCounter+1,
        })
        const thread = newthread.save();
        const threadNum = newThreadNum.save()
        let threadId = newthread.threadSubId;
        const user = await User.findOne({name:req.body.username})
        //製作者にスレッドのIDを入れる
        await user.updateOne({
            $push:{
                myMess:threadId
            }
        })
        //Minithreadに追加
        const NewMiniThread = await new MiniThread({
            threadId:threadId,
            madeBy:req.body.username,
            threadName:req.body.threadname
        })
        const NewMiniThread1 = NewMiniThread.save()
        res.status(200).json("正常にスレッドが作成されました");
    }catch{
        return res.status(500).json("エラーが発生しました")        
    }
})
router.post("/deletethread",async(req,res)=>{
    try{
        const deleteThread = await Thread.findById(req.body.threadId)
        let threadSubId = deleteThread.threadSubId
        let deleteThreadUser = await User.findOne({name:deleteThread.madeBy})
        await deleteThreadUser.updateOne({
            $pull:{
                myMess:deleteThread.threadSubId,
                like:deleteThread.threadId,
            }
        })
        await Thread.remove({_id:req.body.threadId})

        //myMessからそのスレを削除する
        let Tweets = await Tweet.find({threadId:req.body.threadId});
        console.log(Tweets)
        let fuser = null;
        for (let i = 0;Tweets.length>i;i++){
            await Tweet.remove({threadId:Tweets[i].threadId});
        }
        //wasdeleteから削除
        //let ThreadNumTest = await ThreadNum.find({threadId:threadSubId})
        //console.log(ThreadNumTest)
        await ThreadNum.update({threadId:threadSubId},{
            $set:{
                wasdelete:true
            }
        })
        return res.status(200).json("削除されました")
    }catch(err){
        return res.status(500).json(err)
    }
})
//取得するときに、threadNumから取得できるように、subThreadIdで登録する

//////////////////////////////////////////お気に入りが10を超えたら古いものから削除するの作る（履歴のほうでも同じの作る）
/////////////////////////////////////////同じものを登録できなくする
router.post("/setlike",async(req,res)=>{
    let userId = req.body.userId;
    let threadId = req.body.subThreadId;
    let counter = 0;
    try{
        const likeUser = await User.findOne({_id:userId})
        let deleteLike = likeUser.like[0];
        for (let i = 0;likeUser.like.length>i;i++){
            if (likeUser.like[i] == req.body.subThreadId){
                console.log("aaaaaaa")
                counter+=1;
                await likeUser.updateOne({
                    $pull:{
                        like:req.body.subThreadId
                    }
                })
            }
        }
        if (likeUser.like.length>=10){
            await likeUser.updateOne({
                $pull:{
                    like:deleteLike,
                }
            })
        }
        const likeThread = await Thread.findOne({threadSubId:threadId})
        if (counter == 0){
            await likeThread.updateOne({
                $push:{
                    likes:req.body.userId
                }
            })
        }
        await likeUser.updateOne({
            $push:{
                like:threadId///お気に入りにサブIDを指定する
            }
        })
        const MiniThread1 = await MiniThread.findOne({threadSubId:threadId})
        console.log(MiniThread1)
        await MiniThread1.updateOne({
            $set:{
                likenNum:MiniThread1.likenNum+1
            }
        })
        return res.status(200).json("お気に入りに追加しました")
    }catch(err){
        return res.status(500).json("エラーが発生しました");
    }
})
router.post("/deletelike",async(req,res)=>{
    let userId1 = req.body.userId;
    let threadId1 = req.body.subThreadId;
    let counter = 0;
    try{
        const likeUser1 = await User.findOne({_id:userId1})
        const likeThread1 = await Thread.findOne({threadSubId:threadId1})
        console.log(likeUser1.like)
        if (likeUser1.like.length==0){
            counter +=1;
        }
        likeUser1.like.map((i)=>{
            if (threadId1 == i){
                counter +=1;
            }
        })
        if (counter != 0){
            await likeThread1.updateOne({
                $pull:{
                    likes:req.body.userId
                }
            })

            await likeUser1.updateOne({
                $pull:{
                    like:threadId1
                }
            })
            const likeMiniThread = await MiniThread.findOne({threadSubId:threadId1});
            await likeMiniThread.updateOne({
                $set:{
                    likenNum:likeMiniThread.likenNum-1
                }
            })
            return res.status(200).json("お気に入りを解除しました")
        }else{
            return res.status(200).json("解除できません")
        }
    }catch(err){
        return res.status(500).json("エラーが発生しました");
    }
})
//スレッドを取得
router.get("/getthread1",async(req,res)=>{
    let page = req.body.page;
    try{
        let threadList = await Thread.find({wasdelete:false}).sort({ $natural: -1 }).limit(6*page);
        return res.status(200).json(threadList)
    }catch{
        return res.status(500).json("エラー")
    }
})
//こっちでは最後のスレッド番号以下の物を取得する
router.get("/getthread2",async(req,res)=>{
    let rastThread = req.body.rastThread;
    if (rastThread != 0){
        try{
            let threadList2 = await Thread.find({wasdelete:false,threadNum:{$lt:rastThread}}).sort({$natural:-1}).limit(6)
            console.log("fkfk")
            return res.status(200).json(threadList2)
        }catch{
            return res.status(500).json("エラー")
        }
    }else{
        try{
            let threadList2 = await Thread.find({wasdelete:false}).sort({$natural:-1}).limit(6)
            console.log("fkfk")
            return res.status(200).json(threadList2)
        }catch{
            return res.status(500).json("エラー")
        }
            
    }
})

router.get("/test",async(req,res)=>{
    try{
        let lastPage = req.body.lastPage;
        let getthread = await ThreadNum.find({wasdelete:false}).limit(20);
        for (let i = 0;getthread.length>i;i++){
            await ThreadNum.remove({threadId:getthread[i].threadId})
        }
        return res.status(200).json("削除")
    }catch{
        return res.status(500).json("エラー")
    }
})

module.exports = router