const router = require("express").Router();
const mongoose = require("mongoose");
const Tweet = require("../module/Mess")
const User = require("../module/User")
const Thread = require("../module/Threds")
const MiniThread = require("../module/MiniThread");
const uuid = require("node-uuid");
const Mess = require("../module/Mess");
const { findById, count } = require("../module/User");
const ThreadNums = require("../module/ThreadNums");
router.post("/tweetmess",async(req,res)=>{
    let counter = 0;
    try{
        let mini = await MiniThread.findOne({
            threadId:req.body.threadSubId
        })
        console.log(mini)
        let send_box_value_2 = req.body.messText.replace(/</g,"&lt;").replace(/>/g,"&gt;")
        const newtweet = await new Tweet({
            threadSubId:req.body.threadSubId,
            tweetId2:uuid.v4(),
            returnTo:req.body.returnTo,
            messText:send_box_value_2,
            imgPath:req.body.imgPath,
            userId:req.body.userId,
            userName:req.body.userName,
            tweet_num:mini.tweetCounter+=1
        })
        const tweet = newtweet.save()
        //投稿したユーザーの履歴に追加する
        const tweetUser = await User.findById(req.body.userId);
        for (let i = 0;tweetUser.history.length>i;i++){
            if (tweetUser.history[i] == req.body.threadSubId){
                counter +=1;
            }
        }
        //履歴が７件を超えていたら削除
        let historyCounter = tweetUser.history.length;
        let oldHistory = tweetUser.history[0];
        if (historyCounter >=7){
            await tweetUser.updateOne({
                $pull:{
                    history:oldHistory
                }
            })
        }

        const thread = await Thread.findOne({threadSubId:req.body.threadSubId});
        if (counter == 0){
            await tweetUser.updateOne({
                $push:{
                    history:thread.threadSubId
                }
            })
        }else{
            await tweetUser.updateOne({
                $pull:{
                    history:thread.threadSubId
                }
            });
            await tweetUser.updateOne({
                $push:{
                    history:thread.threadSubId
                }
            })
        }

        await thread.updateOne({
            $push:{
                tweets:newtweet.tweetId2
            }
        })
        //minithreadのtweetcounterを上げる
        let MiniThread1 = await MiniThread.findOne({threadId:req.body.threadSubId});
        console.log(req.body.threadSubId)
        await MiniThread1.updateOne({
            $set:{
                tweetCounter:MiniThread1.tweetCounter+=1
            }
        })
        return res.status(200).json("ツイートに成功しました")
    }catch{
        return res.status(500).json("投稿に失敗しました")
    }
})
router.post("/deletetweet",async(req,res)=>{
    try{
        const deleteTweet = await Tweet.findById(req.body.tweetId);
        if (deleteTweet.userId == req.body.userId){
            await Tweet.remove({_id:req.body.tweetId})
            const deletethread = await Thread.findById(deleteTweet.threadId)
            await deletethread.updateOne({
                $pull:{
                    tweets:deleteTweet.tweetId2
                }
            })
            
        }
        return res.status(200).json("投稿を削除しました")
    }catch{
        return res.status(500).json("削除に失敗しました")
    }
})

//投稿を取得する
////////////////////////////取得する順番がおかしいから修正してください
router.post("/gettweet",async(req,res)=>{
    try{
        let threadId = req.body.threadId;
        let page = req.body.page;
        let TweetList = await Thread.find({_id:threadId},{tweets:1,_id:0});
        let TweetList2 = []
        console.log(TweetList[0].tweets.length)
        if (TweetList[0].tweets.length>10 && TweetList[0].tweets.length >=10*page+1){
            for (let i = 9;0<=i;i--){
                let getThreadSubId = TweetList[0].tweets[TweetList[0].tweets.length-page*10-(i+1)]
                let getThread = await Tweet.findOne({tweetId2:getThreadSubId})
                TweetList2.push(getThread)
            }
            console.log("1")
            return res.status(200).json(TweetList2);
        }else if (TweetList[0].tweets.length<10){
            TweetList[0].tweets.map((i)=>{
                let getThread2 = Tweet.findOne({tweetId2:i})
                TweetList2.push(getThread2)
            })
            console.log("2")
            return res.status(200).json(TweetList2);
        }else{
            console.log("メッセージがありません")
            
            return res.status(200).json("メッセージが見つかりません")
        }
    }catch{
        console.log("エラー")
    }
})
router.post("/gettweet2",async(req,res)=>{
    let page = req.body.page
    let threadId = req.body.threadSubId
    let get_num =11;
    try{
        let threadList = await Tweet.find({threadSubId:threadId,tweet_num:{$lte:get_num*Number(page),$gt:get_num*(Number(page)-1)}/*,tweet_num:{$gt:get_num*(Number(page)-1)}*/})
        if (threadList.length == 0){
            return res.status(200).json("メッセージがありません")
        }
        return res.status(200).json(threadList)
    }catch{
        return res.status(500).json("エラー")
    }
})
//一番新しいツイートを取得する
router.get("/getnewtweet",async(req,res)=>{
    let threadId = req.body.threadId
    try{
        let newTweet = await Tweet.findOne({threadId:threadId}).sort({ $natural: -1 }).limit(1);
        return res.status(200).json(newTweet)
    }catch{
        return res.status(500).json("エラー")
    }
})
router.post("/gettweet3",async(req,res)=>{
    try{
        let rast_num = req.body.rast_num
        let threadId =req.body.threadId
        let tweet =await Tweet.find({threadSubId:threadId,tweet_num:{$lt:rast_num}}).limit(15).sort({ $natural: -1 })
        return res.status(200).json(tweet)
    }catch{
        return res.status(500).json("エラー")
    }
})
router.post("/gettweet4",async(req,res)=>{
    try{
        // let screen_size = req.body.screen_size
        // console.log("aaa"+screen_size)
        let threadId = req.body.threadId
        let thread = await Tweet.find({threadSubId:threadId}).limit(20).sort({ $natural: -1 })
        return res.status(200).json(thread)
    }catch{
        return res.status(500).json("エラー")

    }
})
// const deleteTweet = async(req,res,deleteTweet)=>{
//     if (deleteTweet.userId == req.body.userId){
//         await Tweet.remove({_id:req.body.tweetId})
//     }
// }
router.post("/getreprytweet",async(req,res)=>{
    try{
        let tweetId = req.body.tweetId
        let tweet = await Tweet.findOne({tweetId2:tweetId})
        return res.status(200).json(tweet)
    }catch{
        return res.status(500).json("エラー")
    }
})
router.get("/test1",async(req,res)=>{
    let test2 = ["635930406977cc13da00c20f"]
    let test3 = []
    try{
        for (let i = 0;test2.length>i;i++){
            let user = await User.findById(test2[i])
            test3.push(user)
        }
        console.log(test3)
    }catch{
        console.log("取得失敗")
    }
})
// router.post("/deletetweetall",async(req,res)=>{
//     let tweetLIst = await Tweet.find();
//     for (let i =0;tweetLIst.length>i;i++){
//         await Tweet.remove({tweetId2:tweetLIst[i].tweetId2})
//     }
// })
// router.post("/gjgjgjgjg",async(req,res)=>{
//     await Tweet.remove()
// })
module.exports = router