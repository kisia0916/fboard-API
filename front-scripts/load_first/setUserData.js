let cookie_data = document.cookie
console.log(cookie_data)
let userId = "";
let userLike = null;
let userHistory = null;
let userThread = null;
let create_date = ""
let counter = 0;
let rast_profile = ""
for (let i= 0;cookie_data.length>i;i++){
    if (counter == 1){
        userId+=cookie_data[i];
    }
    if (cookie_data[i] == "="){
        counter = 1;
    }
}
cookie_data = cookie_data.split(";")
console.log(cookie_data)

for (let i = 0;cookie_data.length>i;i++){
    let split_data = cookie_data[i].split("=")
    console.log(split_data)
    if(split_data[0]== " userId1" || split_data[0]== "userId1"){
        
        userId = split_data[1]
        // console.log(userId)
        break
    }
}
window.sessionStorage.setItem(['userId'],userId)
console.log(window.sessionStorage.getItem(['userId']))
window.sessionStorage.setItem(["nowMainLink"],"/");
window.sessionStorage.setItem(["nowThreadName"],"");
//アイコン設定
let icon_img = document.getElementById("sampling")

//ユーザー情報を取得して保存  
const getUserdata = async()=>{
    const DateDom = document.querySelector(".MybirthDay")
    const TestDom = document.querySelector(".leftNameWapp")
    try{
        let data = await axios.post("/api/user/getuserdata",{
            //userId:"6370a229ee5eba84f6e0f47c"
            userId:userId
        })
        
        //window.sessionStorage.setItem(['userName'],user.data)
        window.sessionStorage.setItem(['Name'],data.data.name);
        window.sessionStorage.setItem(['pass'],data.data.pass);
        window.sessionStorage.setItem(['userLike'],data.data.like);
        window.sessionStorage.setItem(['userHistory'],data.data.history);
        window.sessionStorage.setItem(['userThread'],data.data.myMess);
        window.sessionStorage.setItem(['profilePhoto'],data.data.profliePhoto)
        window.sessionStorage.setItem(['createAt'],data.data.createdAt);
        window.sessionStorage.setItem(['profile'],data.data.profileMess);
        // window.sessionStorage.setItem(["profileImg"],data.data.profliePhoto)
        console.log(data.data);
        //アイコン設定
        icon_img.src =  window.sessionStorage.getItem(["profilePhoto"])
        change_date();
        console.log(window.sessionStorage.getItem(['Name']))
        DateDom.innerHTML = create_date;
    }catch{
        console.log("エラー")
    }
}
getUserdata()
/////
//アカウント作成日を取得 して画面に描画
async function change_date(){
    let create_year = "";
    let create_month = "";

    for (let i = 0;window.sessionStorage.getItem(['createAt']).length>i;i++){
        if (i>1 && i<4){
            create_year+= window.sessionStorage.getItem(['createAt'])[i];
            
        }
        if (i>4 && i<7){
            create_month += window.sessionStorage.getItem(['createAt'])[i]
        }
    }
    console.log(create_year)
    console.log(create_month)
    create_date = create_year+"年"+" "+create_month+"月に登録";
    //プロフィールを表示
    let profile = window.sessionStorage.getItem(['profile'])
    let box = document.querySelector(".profileTera")
    box.value = profile
    console.log(profile)
    rast_profile = profile
    box.addEventListener('blur',async function(){// 第一引数にblurを指定
        // 処理を記述
        //profileを保存
        let ptext = document.querySelector(".profileTera");
        if(ptext.value != rast_profile){
            console.log(ptext.value)
            await axios.post("/api/user/setprofile",{
                userId:window.sessionStorage.getItem(['userId']),
                newProfile:ptext.value
            })
            rast_profile = ptext.value
        }
      });
}


//////

const delet_like = async(id)=>{
    let threadid = id.split(":")

    await axios.post("/api/thread/deletelike2",{
        userId:window.sessionStorage.getItem(["userId"]),
        threadId:threadid[1]
    })
    setLikeThread()

    if(window.sessionStorage.getItem(["nowMainLink"]) == "/threadlist"){
        console.log("fdfdfdfdffdfdfd")
        let delete_like_list_text = document.getElementById(`*${threadid[1]}`)
        delete_like_list_text.textContent = Number(delete_like_list_text.textContent)-1
        let delete_like_list = document.getElementById(`+${threadid[1]}`)
 
        delete_like_list.style.border = "none"

    }

    // console.log(delete_like_list_text.textContent)
    let b_like = window.sessionStorage.getItem(["userLike"])
    let like = b_like.split(",")
    for (let i = 0;like.length>i;i++){
        if(like[i] == threadid[1]){
            like.splice(i,1)
        }
    }
    window.sessionStorage.setItem(["userLike"],like)

}
//お気に入りスレッドを取得 して表示
const leftThreadWappDom = document.getElementById("liftBarWP")
const setLikeThread = async()=>{
    window.sessionStorage.setItem(["nowLeftBarLink1"],"/like")
            
                let likeThread = await axios.post("/api/user/getlike2",{
                    userId:window.sessionStorage.getItem(['userId'])
                })

            console.log(likeThread.data)
            let mapThread = likeThread.data.map((i)=>{
            
                let LikeThreadTitle = i.threadName;
                let LikeThreadMadeBy = i.madeBy;
                let LikeThreadTweetNum = i.tweetCounter
                let photo = ""
                return `
                    <div class="LeftBarThread" id = ${i.threadId} onclick = "move_url_thread_left(this.id)">
                    <div class="LeftBarThreadTop">
                        <img src="${photo}" width="32px" height="32px" class="LeftBarImg" id = "left_bar_like:${i.threadId}">
                        <span class="LeftBarThreadName">${change_xss(LikeThreadMadeBy)}</span>
                    </div>
                    <div class="LeftHreadMain">
                        <span class="LeftBarThreadTitle">${LikeThreadTitle}</span>
                    </div>
                    <div class="LeftBarThreadBottom">
                            <div class="LeftThreadTweetCounter">
                                <span class="material-symbols-outlined LeftThreadTweetIcon">
                                    forum
                                    </span>
                                <span class="LeftTweetCounterText">${LikeThreadTweetNum}</span>
                            </div>
                            <div class="delteThreadButton" id = "left:${i.threadId}" onclick= "delet_like(this.id)" onmouseover="set_leftFLG_2()" onmouseleave="reset_leftFLG_2()">
                                <span class="LeftThreadDelete" >解除</span>
                            </div>
                    </div>

                </div>

            </div>
                `;
            
            }).join("")
            leftThreadWappDom.innerHTML = mapThread;
            let img = null
            for (let i = 0;likeThread.data.length>i;i++){
                // if(likeThread.data[i] != null){
                    img = await axios.post("/api/user/getuserimg",{
                        name:likeThread.data[i].madeBy
                    })
                    img = img.data
                    document.getElementById("left_bar_like:"+likeThread.data[i].threadId).src = img
                
            }
}
//setLikeThread()

//履歴を取得して表示
const setHistoryThread = async()=>{
    window.sessionStorage.setItem(["nowLeftBarLink1"],"/history")
    let History = await axios.post("/api/user/gethistory2",{
        userId:window.sessionStorage.getItem(['userId'])
    });
    console.log(History.data)

    let HistoryThreadList = History.data.map((i)=>{
        if (i != null){
            let ThreadName = i.threadName;
            let MadeBy = i.madeBy;
            let TweetCounter = i.tweetCounter;
            let photo = window.sessionStorage.getItem(["profilePhoto"])

            return`
                    <div class="LeftBarThread" id = ${i.threadId} onclick = "move_url_thread_left(this.id)">
                    <div class="LeftBarThreadTop">
                        <img src="${photo}" width="32px" height="32px" class="LeftBarImg" id = "left_bar_history:${i.threadId}">
                        <span class="LeftBarThreadName">${change_xss(MadeBy)}</span>
                    </div>
                    <div class="LeftHreadMain">
                        <span class="LeftBarThreadTitle">${ThreadName}</span>
                    </div>
                    <div class="LeftBarThreadBottom">
                            <div class="LeftThreadTweetCounter">
                                <span class="material-symbols-outlined LeftThreadTweetIcon">
                                    forum
                                    </span>
                                <span class="LeftTweetCounterText">${TweetCounter}</span>
                            </div>
                    </div>

                </div>

            </div>
            `;
        }
    }).join("")
        leftThreadWappDom.innerHTML = HistoryThreadList;
        console.log(History.data);
        let img = null
        for (let i = 0;History.data.length>i;i++){
            if(History.data[i] != null){
                img = await axios.post("/api/user/getuserimg",{
                    name:History.data[i].madeBy
                })
                img = img.data
                document.getElementById("left_bar_history:"+History.data[i].threadId).src = img
            }
        }

}
//setHistoryThread()
//////

//MyThreadを取得して表示
const setMyThread = async()=>{
    window.sessionStorage.setItem(["nowLeftBarLink1"],"/mythread")
    console.log("zltukooooooooooooo")
    let MyThread = await axios.post("/api/user/getmythread2",{
        userId:window.sessionStorage.getItem(['userId'])
    });
    console.log(MyThread)
    let MyThreadList = MyThread.data.map((i)=>{
        if(i != null){
            let ThreadName = i.threadName;
            let MadeBy = i.madeBy;
            let TweetCounter = i.tweetCounter;
            let photo = window.sessionStorage.getItem(["profilePhoto"])

            return`
                    <div class="LeftBarThread" id = ${i.threadId} onclick = "move_url_thread_left(this.id)">
                    <div class="LeftBarThreadTop">
                        <img src="${photo}" width="32px" height="32px" class="LeftBarImg" id = "left_bar_mythread:${i.threadId}">
                        <span class="LeftBarThreadName">${change_xss(MadeBy)}</span>
                    </div>
                    <div class="LeftHreadMain">
                        <span class="LeftBarThreadTitle">${ThreadName}</span>
                    </div>
                    <div class="LeftBarThreadBottom">
                            <div class="LeftThreadTweetCounter">
                                <span class="material-symbols-outlined LeftThreadTweetIcon">
                                    forum
                                    </span>
                                <span class="LeftTweetCounterText">${TweetCounter}</span>
                            </div>
                            <div class="delteThreadButton" id = "mythread:${i.threadId}" onclick = "delete_thread(this.id)" onmouseover="set_leftFLG()" onmouseleave="reset_leftFLG()">
                                <span class="LeftThreadDelete">削除</span>
                            </div>
                    </div>

                </div>

            </div>
            `;
        }
    }).join("")
    leftThreadWappDom.innerHTML = MyThreadList;
    console.log(History.data);
    // let img = null
    // for (let i = 0;MyThread.data.length>i;i++){
    //     img = await axios.post("/api/user/getuserimg",{
    //         name:MyThread.data[i].madeBy
    //     })
    //     img = img.data
    //     document.getElementById("left_bar_mythread:"+MyThread.data[i].threadId).src = img
    // }
}
//profileを取得して表示
let radio_button1 = document.getElementById("tab_radio_A").checked;
let radio_button2 = document.getElementById("tab_radio_B").checked;
let radio_button3 = document.getElementById("tab_radio_C").checked;

if (radio_button1){
    setLikeThread()
    window.sessionStorage.setItem(["nowLeftBarLink1"],"/like")
}else if(radio_button2){
    setLikeThread()
    window.sessionStorage.setItem(["nowLeftBarLink1"],"/history")
}else if(radio_button3){
    setMyThread()
    window.sessionStorage.setItem(["nowLeftBarLink1"],"/mythread")
}
