/*
let mainScreen = document.querySelector(".mainScreen");
let ThreadListRast = 0;

if (window.sessionStorage.getItem(["nowMainLink"]) == "/"){
        const ThreadList = `
            <div class="mainScreenWapp">
                        <div class="ThreadListTop">
                            <span class="ThreadListTopText">Home - ThreadList</span>
                        </div>
                        <div class="ThreadCreateBox">
                                
                                <div class="createInputWapp">
                                        <input type="text" class="createThreadInput" placeholder="スレッドのタイトル">
                                </div>
                                <div class="sendThreadButton">

                                            <span class="material-symbols-outlined createThreadIcon">
                                                add_comment
                                            </span>
                                        <span class="createThreadButton">スレッドを投稿</span>
                                </div>
                        </div>
                        <span class="ThreaCounterText">4件のスレッド</span>
                        <div class="WriteHread">
                        </div>
            </div>
        `;
        mainScreen.innerHTML = ThreadList;
        let writeSpace = document.querySelector(".WriteHread");
        const setMainThread = async()=>{
            let data = await axios.post("/api/thread/getthread3",{
                    rastNum:-1
            })
            //console.log(data.data)
            ThreadListRast = data.data[5].threadNum;
            let ThreadData = data.data
            //console.log(ThreadData)
            let mapThread = ThreadData.map((i)=>{
                console.log(i)
                console.log(i.createdAt)

                let createyear = "";
                let createmonth = "";
                let createday = "";

                for(let s = 0;i.createdAt.length>s;s++){
                    if(s<4){
                        createyear+=i.createdAt[s];
                    }else if(s>4&&s<7){
                        createmonth+=i.createdAt[s];
                    }else if(s>7 && s<10){
                        createday+=i.createdAt[s];
                    }
                }
                let createedAt1 = createyear+"年"+" "+createmonth+"月"+ createday+"日"; 
                return`
                <div class=${"inWapp"+i.threadNum} id = "${i.threadId}" onclick = setLike(this.id)>
                <div class="Thread">
                <div class="ThreadHead">
                    <img src="./DbubPH_XkAIyVdP.png" width="40px" height="40px" class="ThreadIcon">
                    <span class="ThreadUserName">${i.madeBy}</span>
                </div>
                <div class="ThreadBody">
                    <span class="ThreadTitle">${i.threadName}</span>
                </div>
                <div class="ThreadBottom">
                        <span class="ThreadCreateSend">投稿日：</span>
                        <span class="ThreadCreateDate">${createedAt1}</span>
                        <div class="ThreadButton">
                            <div class="seeNum">
                                <span class="material-symbols-outlined ThreadTweetNumIcon">
                                    forum
                                    </span>
                                <span class="TweetCounterText">${i.tweetCounter}</span>
                            </div>
                            <div class="likeNum" onmouseover="setflg()" onmouseleave="resetflg()">
                                <span class="material-symbols-outlined ThreadLikeCounterIcon">
                                    bookmark
                                    </span>
                                    <span class="LileCounterText">${i.likenNum}</span>
                            </div>
                        </div>
                </div>
            </div>
            <input type = "hidden" id = "ThreadId" value = ${i.threadId}>
            </div>
                `
            }).join("")
            writeSpace.innerHTML = mapThread;
        }
        setMainThread()
}
*/
//スクロールに合わせてスレッドを表示する
const wait = (sec) => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, sec*1000);
      //setTimeout(() => {reject(new Error("エラー！"))}, sec*1000);
    });
  };
let readCounter = 0;
const reloadThread = async()=>{
    let rast = Number(ThreadListRast);
    let moreThread = await axios.post("/api/thread/getthread3",{
        rastNum:rast
    })
    console.log(moreThread.data)
    return moreThread;
}
const get_user_icon = async(name)=>{
    let return_imgs = []
    for (let i = 0;name.length>i;i++){
        let img = await axios.post("/api/user/getuserimg",{
            name:name
        })
        return_imgs.push(img)
    }
    return return_imgs
}
// document.getElementById('mainScreen').onscroll = async event => {
//     if (isFullScrolled(event) && ThreadListRast != 0) {
        
//         let mainSc = document.querySelector(".inWapp"+ThreadListRast)
//         const list2 =await reloadThread()
//         let data = list2.data


//         let undata = data.map((i)=>{
//             let createyear = "";
//             let createmonth = "";
//             let createday = "";
//             for(let s = 0;i.createdAt.length>s;s++){
//               if(s<4){
//                   createyear+=i.createdAt[s];
//               }else if(s>4&&s<7){
//                   createmonth+=i.createdAt[s];
//               }else if(s>7 && s<10){
//                   createday+=i.createdAt[s];
//               }
//             }
//             let createdAt1 = createyear+"年"+" "+createmonth+"月"+ createday+"日"; 
//             return`
//             <div class="Thread" id = "${i.threadId}" onclick = setLike(this.id)>
//             <div class = "clickButton">
//                 <div class="ThreadHead">
//                     <img src="./DbubPH_XkAIyVdP.png" width="40px" height="40px" class="ThreadIcon">
//                     <span class="ThreadUserName">${i.madeBy}</span>
//                 </div>
//                 <div class="ThreadBody">
//                     <span class="ThreadTitle">${i.threadName}</span>
//                 </div>

//             <div class="ThreadBottom">
//                     <span class="ThreadCreateSend">投稿日：</span>
//                     <span class="ThreadCreateDate">${createdAt1}</span>
//                     <div class="ThreadButton">
//                         <div class="seeNum">
//                             <span class="material-symbols-outlined ThreadTweetNumIcon">
//                                 forum
//                                 </span>
//                             <span class="TweetCounterText">${i.tweetCounter}</span>
//                         </div>
//                         <div class="likeNum" onmouseover="setflg()" onmouseleave="resetflg()">
//                             <span class="material-symbols-outlined ThreadLikeCounterIcon">
//                                 bookmark
//                                 </span>
//                                 <span class="LileCounterText">${i.likenNum}</span>
//                         </div>
//                     </div>
//                     </div>
//             </div>
//             </div>
//             `
//         }).join("")
//         ThreadListRast = data[data.length-1].threadNum
//         mainSc.insertAdjacentHTML('afterend',undata)
//         readCounter = 0;
//     }
//   }
  
//   function isFullScrolled(event) {
//     // ブラウザの設定にもよるので、完全に一番下までいっていなくても許容するための調整値
//     const adjustmentValue = 60
//     const positionWithAdjustmentValue = event.target.clientHeight + event.target.scrollTop + adjustmentValue
//     if (positionWithAdjustmentValue >= event.target.scrollHeight && readCounter == 0){
//         console.log(readCounter)
//         readCounter = 1;
//         return positionWithAdjustmentValue >= event.target.scrollHeight
//     }
    
//   }