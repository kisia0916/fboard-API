let ThreadListRast = 0;
let ThreadListFirst = 0
const writeThreadList = ()=>{
    document.title = "FBoard-ThreadList"
    let mainScreen = document.querySelector(".mainScreen");
    ThreadListRast = 0;
    let thread_htmlId = null
    if (true){
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


                                            <span class="createThreadButton" onclick = "write_prompt()">スレッドを投稿</span>
                                    </div>
                            </div>
                            <span class="ThreaCounterText">4件のスレッド</span>
                            <div class="WriteHread">
                            </div>
                </div>
            `;
            mainScreen.innerHTML = ThreadList;
            let writeSpace = document.querySelector(".WriteHread");
            let likeList = window.sessionStorage.getItem(["userLike"])

            const setMainThread = async()=>{
                console.log(thread_htmlId)

                let data = await axios.post("/api/thread/getthread3",{
                        rastNum:-1
                })
                //console.log(data.data)
                ThreadListRast = data.data[data.data.length-1].threadNum;
                ThreadListFirst = data.data[0].threadNum;
                let ThreadData = data.data;
                //console.log(ThreadData)
                //画像を取得
                let img_ls = []
                let img = null
                for (let i = 0;ThreadData.length>i;i++){
                    console.log("test")
                    let user_name = ThreadData[i].madeBy
                    console.log(ThreadData[i].first_img)
                    console.log(ThreadData[i].titleImgPath)
                    if (!ThreadData[i].first_img){
                        img = await axios.post("/api/user/getuserimg",{
                            name:user_name
                        })
                        img_ls.push(img.data)

                    }else{
                        img = "http://"+ThreadData[i].first_img
                        img_ls.push(img)
                    }
                }
                console.log(img_ls)
                let co = 0
                let mapThread = ThreadData.map((i)=>{
                    let img = img_ls[co]
                    co+=1
                    thread_htmlId = null
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
                    let likeList1 = likeList.split(",")
                    // if (likeList1.indexOf(i.threadId) == 0){
                    //     thread_htmlId = "likeNum2"
                    // }else{
                    //     thread_htmlId = "likeNum"
                    // }

                    for (let s= 0;likeList1.length>s;s++){
                        if(i.threadId == likeList1[s]){
                            console.log()
                            thread_htmlId = "likeNum2"
                        }
                    }
                    if (thread_htmlId == null){
                        thread_htmlId = "likeNum"
                    }
                    return`
                    <div class=${"inWapp"+i.threadNum} id = "threadlist:${i.threadId}">
                    <div class="Thread" id = "${i.threadId}" onclick ="move_url_threadList(this.id)">
                    <div class="ThreadHead">
                        <img src="${img}" width="90px" height="90px" class="ThreadIcon">
                    </div>
                    <div class = "thread_left_main">
                    <span class="ThreadUserName">${i.madeBy}</span>

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
                                <div id = "+${i.threadId}"class="${thread_htmlId} lineNUM" onmouseover="setflg()" onmouseleave="resetflg()" onclick ="setLike(this.id)">
                                    <span class="material-symbols-outlined ThreadLikeCounterIcon">
                                        bookmark
                                        </span>
                                        <span class="LileCounterText" id = "*${i.threadId}">${i.likenNum}</span>
                                </div>
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
} 

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
    readCounter = 0
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
document.getElementById('mainScreen').onscroll = async event => {
    //readCounter = 0

    if(window.sessionStorage.getItem(["nowMainLink"]) == "/threadlist" && readCounter == 0){
     if (isFullScrolled(event)  && ThreadListRast != 0) {
        //readCounter = 0
        console.log("loadddddddding")
        let mainSc = document.querySelector(".inWapp"+ThreadListRast)
        const list2 =await reloadThread()
        let data = list2.data
        let Thread_rast2 = ThreadListRast
        // let img_ls = []
        console.log(data)

        // for (let i = 0;data.length>i;i++){
        //     console.log(data)
        //     let user_name1 = data[i].madeBy
        //     let img =await axios.post("/api/user/getuserimg",{
        //         name:user_name1
        //     })
        //     // img_ls.push(img.data)
        //     // console.log(img_ls)
        // }
        ThreadListRast = data[data.length-1].threadNum

        // let name_list = []
        // for (let i =0; data.length>i;i++){
        //     name_list.push(data[i].madeBy)
        // }
        // let imgs = await get_user_icon(name_list)


        let undata = data.map((i)=>{
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
            let likeList = window.sessionStorage.getItem(["userLike"])
            let likeList1 = likeList.split(",")
            let thread_htmlId = null
            // if (likeList1.indexOf(i.threadId) == 0){
            //     thread_htmlId = "likeNum2"
            // }else{
            //     thread_htmlId = "likeNum"
            // }
            for (let s= 0;likeList1.length>s;s++){
                if(i.threadId == likeList1[s]){
                    thread_htmlId = "likeNum2"
                }
            }
            if (thread_htmlId == null){
                thread_htmlId = "likeNum"
            }
            let createdAt1 = createyear+"年"+" "+createmonth+"月"+ createday+"日"; 
            // let user_img_data = axios.post("/api/user/getuserimg",{
            //     name:i.madeBy
            // })
            // console.log(user_img_data)
            return`
            <div class=${"inWapp"+i.threadNum} id = "threadlist:${i.threadId}">
            <div class="Thread" id = "${i.threadId}" onclick ="move_url_threadList(this.id)">
            <div class = "clickButton">
            <div class = "Thread_flex_warpp">
                <div class="ThreadHead">
                    <img src="" width="90px" height="90px" class="ThreadIcon" id = "threadIcon:${i.threadId}">
                </div>
                <div class = "thread_left_main">
                <span class="ThreadUserName">${i.madeBy}</span>

                <div class="ThreadBody">
                    <span class="ThreadTitle">${i.threadName}</span>
                </div>

            <div class="ThreadBottom">
                    <span class="ThreadCreateSend">投稿日：</span>
                    <span class="ThreadCreateDate">${createdAt1}</span>
                    <div class="ThreadButton">
                        <div class="seeNum">
                            <span class="material-symbols-outlined ThreadTweetNumIcon">
                                forum
                                </span>
                            <span class="TweetCounterText">${i.tweetCounter}</span>
                        </div>
                        <div id = "+${i.threadId}"class="${thread_htmlId}" onmouseover="setflg()" onmouseleave="resetflg()"onclick = "setLike(this.id)">
                            <span class="material-symbols-outlined ThreadLikeCounterIcon">
                                bookmark
                                </span>
                                <span class="LileCounterText" id = "*${i.threadId}">${i.likenNum}</span>
                        </div>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
            `
        }).join("")
        mainSc.insertAdjacentHTML('afterend',undata)
        //readCounter = 0;
        console.log(ThreadListRast)
        // send_thread()//
        //画像セット

        for (let i = 0;data.length>i;i++){
            console.log(data)
            let user_name1 = data[i].madeBy
            let img =await axios.post("/api/user/getuserimg",{
                name:user_name1
            })
            let set_thread = document.getElementById(`threadIcon:${data[i].threadId}`)
            set_thread.src = img.data
            // img_ls.push(img.data)
            // console.log(img_ls)
        }
    }
}
  }
  
  function isFullScrolled(event) {
    // ブラウザの設定にもよるので、完全に一番下までいっていなくても許容するための調整値
    const adjustmentValue = 60
    const positionWithAdjustmentValue = event.target.clientHeight + event.target.scrollTop + adjustmentValue
    if (positionWithAdjustmentValue >= event.target.scrollHeight && readCounter == 0){
        console.log(readCounter)
        readCounter = 1;
        return positionWithAdjustmentValue >= event.target.scrollHeight
    }
  }

const write_new_thread_one = async(i)=>{
    let mainSc = document.querySelector(".inWapp"+ThreadListFirst)
    let writeSpace = document.querySelector(".WriteHread");
    console.log(ThreadListFirst)
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
    let likeList = window.sessionStorage.getItem(["userLike"])
    let likeList1 = likeList.split(",")
    let thread_htmlId = null
    // if (likeList1.indexOf(i.threadId) == 0){
    //     thread_htmlId = "likeNum2"
    // }else{
    //     thread_htmlId = "likeNum"
    // }
    for (let s= 0;likeList1.length>s;s++){
        if(i.threadId == likeList1[s]){
            thread_htmlId = "likeNum2"
        }
    }
    if (thread_htmlId == null){
        thread_htmlId = "likeNum"
    }
    let createdAt1 = createyear+"年"+" "+createmonth+"月"+ createday+"日"; 
    let img = null
    if(i.first_img){
        img = "http://"+i.first_img
    }else{
        img = await axios.post("/api/user/getuserimg",{
            name:i.madeBy
        })
        img = img.data
    }

    let return_html = `
    <div class=${"inWapp"+i.threadNum} id = "threadlist:${i.threadId}">
    <div class="Thread" id = "${i.threadId}" onclick ="move_url_threadList(this.id)">
    <div class = "clickButton">
    <div class = "Thread_flex_warpp">
        <div class="ThreadHead">
            <img src="${img}" width="90px" height="90px" class="ThreadIcon" id = "threadIcon:${i.threadId}">
        </div>
        <div class = "thread_left_main">
        <span class="ThreadUserName">${i.madeBy}</span>

        <div class="ThreadBody">
            <span class="ThreadTitle">${i.threadName}</span>
        </div>

    <div class="ThreadBottom">
            <span class="ThreadCreateSend">投稿日：</span>
            <span class="ThreadCreateDate">${createdAt1}</span>
            <div class="ThreadButton">
                <div class="seeNum">
                    <span class="material-symbols-outlined ThreadTweetNumIcon">
                        forum
                        </span>
                    <span class="TweetCounterText">${i.tweetCounter}</span>
                </div>
                <div id = "+${i.threadId}"class="${thread_htmlId}" onmouseover="setflg()" onmouseleave="resetflg()"onclick = "setLike(this.id)">
                    <span class="material-symbols-outlined ThreadLikeCounterIcon">
                        bookmark
                        </span>
                        <span class="LileCounterText" id = "*${i.threadId}">${i.likenNum}</span>
                </div>
            </div>
            </div>
            </div>
        </div>
    </div>
    </div>
    </div>
    `
    mainSc.insertAdjacentHTML('beforebegin',return_html)
    //ThreadListFirst+=1
}
const write_create_thread_prom = ()=>{
    let html = return_create_thread()
    let mainScreen = document.querySelector(".mainWapp");
    mainScreen.insertAdjacentHTML('beforebegin',html)
}
// write_create_thread_prom()