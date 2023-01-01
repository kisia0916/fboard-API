let cookie_data = document.cookie
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
window.sessionStorage.setItem(['userId'],userId)
console.log(window.sessionStorage.getItem(['userId']))
window.sessionStorage.setItem(["nowMainLink"],"/");
window.sessionStorage.setItem(["nowThreadName"],"");
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

        console.log(data.data);
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

//お気に入りスレッドを取得 して表示
const leftThreadWappDom = document.getElementById("liftBarWP")
const setLikeThread = async()=>{
    window.sessionStorage.setItem(["nowLeftBarLink1"],"/like")

            let likeThread = await axios.post("/api/user/getlike2",{
                userId:window.sessionStorage.getItem(['userId'])
            })
            console.log(likeThread.data[0])
            let mapThread = likeThread.data.map((i)=>{
                let LikeThreadTitle = i.threadName;
                let LikeThreadMadeBy = i.madeBy;
                let LikeThreadTweetNum = i.tweetCounter
                return `
                    <div class="LeftBarThread" id = ${i.threadId} onclick = "move_url_thread(this.id)">
                    <div class="LeftBarThreadTop">
                        <img src="../profilePhotos/no-userimage (1).png" width="32px" height="32px" class="LeftBarImg">
                        <span class="LeftBarThreadName">${LikeThreadMadeBy}</span>
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
                            <div class="delteThreadButton">
                                <span class="LeftThreadDelete">削除</span>
                            </div>
                    </div>

                </div>

            </div>
                `;
            }).join("")
            leftThreadWappDom.innerHTML = mapThread;
}
//setLikeThread()

//履歴を取得して表示
const setHistoryThread = async()=>{
    window.sessionStorage.setItem(["nowLeftBarLink1"],"/history")
    let History = await axios.post("/api/user/gethistory2",{
        userId:window.sessionStorage.getItem(['userId'])
    });
    let HistoryThreadList = History.data.map((i)=>{
        let ThreadName = i.threadName;
        let MadeBy = i.madeBy;
        let TweetCounter = i.tweetCounter;
        return`
                <div class="LeftBarThread" id = ${i.threadId} onclick = "move_url_thread(this.id)">
                <div class="LeftBarThreadTop">
                    <img src="../profilePhotos/no-userimage (1).png" width="32px" height="32px" class="LeftBarImg">
                    <span class="LeftBarThreadName">${MadeBy}</span>
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
                        <div class="delteThreadButton">
                            <span class="LeftThreadDelete">削除</span>
                        </div>
                </div>

            </div>

        </div>
        `;
    }).join("")
    leftThreadWappDom.innerHTML = HistoryThreadList;
    console.log(History.data);

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
        let ThreadName = i.threadName;
        let MadeBy = i.madeBy;
        let TweetCounter = i.tweetCounter;
        return`
                <div class="LeftBarThread" id = ${i.threadId} onclick = "move_url_thread(this.id)">
                <div class="LeftBarThreadTop">
                    <img src="../profilePhotos/no-userimage (1).png" width="32px" height="32px" class="LeftBarImg">
                    <span class="LeftBarThreadName">${MadeBy}</span>
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
                        <div class="delteThreadButton">
                            <span class="LeftThreadDelete">削除</span>
                        </div>
                </div>

            </div>

        </div>
        `;
    }).join("")
    leftThreadWappDom.innerHTML = MyThreadList;
    console.log(History.data);
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
