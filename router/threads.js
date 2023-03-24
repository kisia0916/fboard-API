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


const tags = ["プログラミング","雑談","質問","ゲーム","ハードウエア","極秘","その他","バグ報告","タグリクエスト","お知らせ"]
router.post("/newthread",async(req,res)=>{

    try{
        if(req.body.threadname && req.body.username && req.body.profile){
            //ここでスレッドを作成
            let setNum = 0;
            let threadcount = await Thread.find().count()
            if (threadcount>0){
                const mostNewThread =await  Thread.find({wasdelete:false}).sort({ $natural: -1 }).limit(1);
                setNum = mostNewThread[0].threadNum+1
            }else{
                setNum = 0;
            }
            let main_tag = []
            let send_box_value_2 = req.body.threadname.replace(/</g,"&lt;").replace(/>/g,"&gt;")

            for (let i = 0;req.body.tags.length>i;i++){
                console.log(i)
                let flg = tags.indexOf(req.body.tags[i])
                if(flg != -1){
                    console.log("aa")
                    main_tag.push(req.body.tags[i])
                }
            }
            console.log(req.body.tags)
            const newthread = await new Thread({
                    threadNname:send_box_value_2,
                    threadSubId:uuid.v4(),
                    madeBy:req.body.username,
                    threadNum:setNum,
                    profile:req.body.profile,
                    titleImgPath:req.body.imgPath,
                    tags:main_tag
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
                threadName:send_box_value_2,
                threadNum:setNum,
                first_img:req.body.imgPath,
                tags:main_tag
            })
            const NewMiniThread1 = NewMiniThread.save()
            const first_thread = await new Tweet({
                threadSubId:threadId,
                tweetId2:uuid.v4(),
                returnTo:null,
                messText:req.body.profile,
                imgPath:req.body.imgPath,
                userId:user._id,
                userName:user.name,
                tweet_num:1
            })
            const first_thread2 = first_thread.save()

            res.status(200).json("正常にスレッドが作成されました");
        }else{
            return res.status(500).json("エラーが発生しました")    
        }
    }catch{
        return res.status(500).json("エラーが発生しました")        
    }
})
// router.post("/deletethread",async(req,res)=>{
//     try{
//         const deleteThread = await Thread.findOne({threadSubId:req.body.threadSubId})
//         let threadSubId = deleteThread.threadSubId
//         let deleteThreadUser = await User.findOne({name:deleteThread.madeBy})
//         await deleteThreadUser.updateOne({
//             $pull:{
//                 myMess:deleteThread.threadSubId,
//                 like:deleteThread.threadSubId,
//             }
//         })
//         await Thread.remove({_id:req.body.threadId})

//         //myMessからそのスレを削除する
//         let Tweets = await Tweet.find({threadSubId:req.body.threadSubId});
//         console.log(Tweets)
//         let fuser = null;
//         for (let i = 0;Tweets.length>i;i++){
//             await Tweet.remove({threadSubId:Tweets[i].threadSubId});
//         }
//         //wasdeleteから削除
//         //let ThreadNumTest = await ThreadNum.find({threadId:threadSubId})
//         //console.log(ThreadNumTest)
//         await ThreadNum.update({threadId:threadSubId},{
//             $set:{
//                 wasdelete:true
//             }
//         })
//         //let deleteMinithread = await MiniThread.findOne({threadSubId:deleteThread.threadSubId})
//         await MiniThread.remove({threadSubId:deleteThread.threadSubId})
//         return res.status(200).json("削除されました")
//     }catch(err){
//         return res.status(500).json(err)
//     }
// })
router.post("/alldelete",async(req,res)=>{
    try{
        await ThreadNum.remove({})
        return res.status(200).json("完了")
    }catch{
        return res.status(500).json("失敗")
    }
})
router.post("/deletethread2",async(req,res)=>{
    let threadid = req.body.threadId
    let userid =req.body.userId
    try{
        await Thread.remove({
            threadSubId:threadid
        })
        await MiniThread.remove({
            threadId:threadid
        })
        let deleteThreadNum = await ThreadNum.findOne({threadId:threadid})
        await deleteThreadNum.updateOne({
            $set:{
                wasdelete:true
            }
        })
        let delete_user = await User.findById(userid)
        await delete_user.updateOne({
            $pull:{
                myMess:threadid
            }
        })
        return res.status(200).json("削除")
    }catch{
        return res.status(500).json("エラー")
    }

})
router.get("/getfirstthread",async(req,res)=>{
    try{
        let firstThreadList = await Thread.find({wasdelete:false}).sort({$natural:-1}).limit(10)
        return res.status(200).json(firstThreadList)
    }catch{
        return res.status(500).json("エラー")
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
        const MiniThread1 = await MiniThread.findOne({threadId:threadId})
        const likeThread = await Thread.findOne({threadSubId:threadId})
        let deleteLike = likeUser.like[0];
        for (let i = 0;likeUser.like.length>i;i++){
            if (likeUser.like[i] == req.body.subThreadId){
                console.log("aaaaaaa")
                counter+=1;
                if (MiniThread1.likenNum>0){
                    await MiniThread1.updateOne({
                        $set:{
                            likenNum:MiniThread1.likenNum-1
                        }
                    })
                }
                await likeUser.updateOne({
                    $pull:{
                        like:req.body.subThreadId
                    }
                })
                //minithreadから削除

                //threadから削除
                await likeThread.updateOne({
                    $pull:{
                        likes:req.body.userId
                    }
                })
            }
        if (likeUser.like.length>=10){
            await likeUser.updateOne({
                $pull:{
                    like:deleteLike,
                }
            })
        }
    }

    if (counter == 0){
        if (likeThread.likes.indexOf(req.body.userId) == -1){
            await likeUser.updateOne({
                $push:{
                    like:threadId///お気に入りにサブIDを指定する
                }
            })
            await MiniThread1.updateOne({
                $set:{
                    likenNum:MiniThread1.likenNum+1
                }
            })
            await likeThread.updateOne({
                $push:{
                    likes:req.body.userId
                }
            })

        //MiniThre  ad1 = await MiniThread.findOne({threadId:threadId})
        }
        console.log(MiniThread1)
    }
    if (counter == 0){

    }
        return res.status(200).json("お気に入りに追加しました")
    }catch(err){
        return res.status(500).json("エラーが発生しました");
    }
})
router.post("/setlike2",async(req,res)=>{
    let userId = req.body.userId
    let threadId1 = req.body.threadId
    try{
        let user_data = await User.findOne({_id:userId})
        let user_like = user_data.like
        console.log(user_like)
        let now_thread = await MiniThread.findOne({threadId:threadId1})
        if (user_like.indexOf(threadId1) == -1 && now_thread.likes.indexOf(userId) == -1){
            //お気に入りに登録
            console.log("fff")
            await user_data.updateOne({
                $push:{
                    like:threadId1
                }
            })
        
            console.log("fff２")

            console.log("fff３")

            let now_thread_num = now_thread.likenNum

            await now_thread.updateOne({
                $set:{
                    likenNum:now_thread_num+1,
                    likes:userId
                }
            })
            console.log("fff４")

            return res.status(200).json("成功しました")
        }else{
            return res.status(200).json("登録に失敗しました")
        }
    }catch{
        return res.status(500).json("エラー")
    }
})
router.post("/deletelike2",async(req,res)=>{
    let threadId = req.body.threadId
    let userId = req.body.userId
    console.log("kidou")
    try{
        let user_data = await User.findOne({_id:userId})
        let user_like = user_data.like
        console.log(user_like)
        console.log(user_like.indexOf(threadId))
        if(user_like.indexOf(threadId) > -1){
            //お気に入りから削除
            await user_data.updateOne({
                $pull:{
                    like:threadId
                }
            })
            let now_thread = await MiniThread.findOne({threadId:threadId})
            console.log("fff３")

            let now_thread_num = now_thread.likenNum
            if(now_thread_num>0){
                await now_thread.updateOne({
                    $set:{
                        likenNum:now_thread_num-1
                    }
                })
                await now_thread.updateOne({
                    $pull:{
                        likes:userId
                    }
                })
            }
            return res.status(200).json("成功しました")
        }else{
            return res.status(200).json("解除に失敗しました")
        }
    }catch{
        return res.status(500).json("エラー")
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
            console.log("test1")
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
            const likeMiniThread = await MiniThread.findOne({threadId:threadId1});
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
// router.get("/getthread1",async(req,res)=>{
//     let page = req.body.page;
//     try{
//         let threadList = await Thread.find({wasdelete:false}).sort({ $natural: -1 }).limit(6*page);
//         return res.status(200).json(threadList)
//     }catch{
//         return res.status(500).json("エラー")
//     }
// })
//こっちでは最後のスレッド番号以下の物を取得する
router.post("/getthread2",async(req,res)=>{
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
router.post("/getthread3",async(req,res)=>{
    let rastNum = req.body.rastNum;
    try{
        if (rastNum > 0){
            let mainThreadList = await MiniThread.find({threadNum:{$lt:rastNum}}).sort({$natural:-1}).limit(6)
            return res.status(200).json(mainThreadList)
        }else if (rastNum == -1){
            let mainThreadList2 = await MiniThread.find().sort({$natural:-1}).limit(6)
            return res.status(200).json(mainThreadList2)
        }

    }catch{
        res.status(500).json("エラー")
    }
})
router.post("/getthread4",async(req,res)=>{
    try{
        let thread_data = await Thread.findOne({
            threadSubId:req.body.threadId
        });
        return res.status(200).json(thread_data)
    }catch{
        return res.status(500).json("エラー")
    }
})
router.post("/getthread5",async(req,res)=>{
    try{
        let thread_data = await MiniThread.findOne({
            threadId:req.body.threadId
        });
        return res.status(200).json(thread_data)
    }catch{
        return res.status(500).json("エラー")
    }
})
// router.get("/test",async(req,res)=>{
//     try{
//         let lastPage = req.body.lastPage;
//         let getthread = await ThreadNum.find({wasdelete:false}).limit(20);
//         for (let i = 0;getthread.length>i;i++){
//             await ThreadNum.remove({threadId:getthread[i].threadId})
//         }
//         return res.status(200).json("削除")
//     }catch{
//         return res.status(500).json("エラー")
//     }
// })

router.get("/gethomethread",async(req,res)=>{
    try{
        let newThread = await Thread.find({}).sort({$natural:-1}).limit(10);
        return res.status(200).json(newThread);
    }catch{
        return res.status(500).json("エラー")
    }


})
router.get("/getnewthread",async(req,res)=>{
    try{
        let newThread = await MiniThread.find({}).sort({$natural:-1}).limit(1);
        return res.status(200).json(newThread);
    }catch{
        return res.status(500).json("エラー")
    }


})
router.post("/search/:text",async(req,res)=>{
    let t4 = req.params.text
    // let t5 = t4.d
    let search_contents = req.params.text
    console.log(search_contents)
    let search_contents_list = search_contents.split(",")
    let return_list = []
    let test_list_2 = []
    console.log(search_contents_list)
    //search_contents_list.reverse()
    try{
        for (let i =0;search_contents_list.length>i;i++){
            let test = null
            try{
                test = await MiniThread.find({threadName: { $regex:search_contents_list[i]}})
                console.log(test)
            }catch{
                test = [null]
            }
            //search_listの中身を複数含むスレッドがあると複数取得されるから直す

            if(test[0] != null){
                test.reverse()
                //return_list.reverse()
                for(let f = 0;test.length>f;f++){
                    let co =0
                    let duble_word = []
                    for (let s = 0;return_list.length>s;s++){
                        
                        if(return_list[s].threadId == test[f].threadId){
                            co+=1
                            return_list.splice(s,1)
                            test_list_2.push(test[f])
                            // console.log(`jjjjjjjjjjj${test_list_2}`)
                            // return_list.unshift(test[f])
                        }
                    }
                    if(co == 0){
                        return_list.push(test[f])
                    }
            }
        }
        }
        if(test_list_2.length!=0){
            test_list_2.reverse()
            for (let i=0;test_list_2.length>i;i++){
                return_list.unshift(test_list_2[i])
            }
        }
        return res.status(200).json(return_list)
    }catch(err){
        return res.status(500).json("エラー")
    }
})

router.post("/getfirsttags",async(req,res)=>{
    let tag_name = req.body.tag
    let get_num = 21//取得したい個数+1の数を入れる
    try{
        let threads = await MiniThread.find({tags:tag_name}).limit(get_num).sort({ $natural: -1 });
        return res.status(200).json(threads)
    }catch{
        return res.status(500).json("エラー")
    }
})
router.post("/getnexttags",async(req,res)=>{

    let get_num = 11//取得したい数+1の数を設定
    let tag_name = req.body.tag
    let rastnum = req.body.rastnum
    // console.log("aaaa"+tag_name)
    try{
        if(tags.indexOf(tag_name) != -1){
            let threads = await MiniThread.find({tags:tag_name,threadNum:{$lt:rastnum}}).limit(get_num).sort({ $natural: -1 })
            return res.status(200).json(threads)
        }
    }catch{
        return res.status(500).json("エラー")

    }
})
module.exports = router