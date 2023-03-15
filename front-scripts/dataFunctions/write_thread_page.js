
id1 = ""
let now_tweet_page = 0
load_flg = false
let img_null_counter = true
const get_thread_datas = async()=>{
    let data = await axios.post("/api/thread/getthread5",{
        threadId:id1
    })
    console.log(data.data)
    return data.data
}
const write_thread_page = async(id)=>{
    id1 = id
    document.title = "FBoard-title"
    now_tweet_page = 1
    window.sessionStorage.setItem(["nowMainLink"],"/thread/"+id);
    let mainScreen = document.querySelector(".mainScreen");
    return_datas = await get_thread_datas()
    if(return_datas.tweetCounter %2 != 0){
        now_tweet_page = Math.floor(return_datas.tweetCounter/10)+1
        console.log(now_tweet_page)
    }else if(return_datas.tweetCounter%2 == 0){
        now_tweet_page = Math.floor(return_datas.tweetCounter/10)
        console.log(now_tweet_page)
    }
    // console.log(return_datas.tweetCounter)
    // if(return_datas/2)

    let icon = await axios.post("/api/user/getuserimg",{
        name:window.sessionStorage.getItem(["Name"])
    })
    console.log(icon)

    const thread_html = return_thread_tweet_page(return_datas.threadName,return_datas.likenNum,return_datas.tweetCounter,icon.data)
    mainScreen.innerHTML = thread_html;
    await load_tweet_first(id)
    let el = document.querySelector('.tweet_thread_mess_main');
    el.scrollTo(0, el.scrollHeight);
    let tweet_input = document.querySelector(".tweet_send_input")
    document.getElementById("tweet_thread_mess_main_id").onscroll = async e=>{
            const {
              scrollHeight, scrollTop, clientHeight
            } = e.target;
            // console.log(scrollTop)
            const isScrollTop = scrollTop <= 3;
            const isScrollBottom = scrollHeight - clientHeight === scrollTop;
            
            if (isScrollTop && !load_flg) {
                load_flg = true
                load_tweet(id1)
            }

    }
    tweet_input.onfocus = function (){
    //処理を記述
    //送信の検知
        console.log("フォーカス")
        let enter = false
        let shift = false
        document.addEventListener("keydown",(e)=>{
            console.log(e)
            if(e.key == "Enter"){
                enter = true
            }
            if (e.key == "Shift"){
                shift = true
            }
           if (enter && !shift){
                send_tweet()
            }
        })
        document.addEventListener("keyup",(e)=>{
            if(e.key == "Shift"){
                shift = false
            }
            if(e.key == "Enter"){
                enter = false
            }
        })
    }; 

}
const load_tweet_first = async(id)=>{
    console.log(id)
    let tweet_list = await axios.post("/api/tweet/gettweet2",{
        page:1,
        threadSubId:id
    })
    console.log(tweet_list.data)
    // let write_list = tweet_list.data.map((data)=>{
    //     console.log(write_list)
    // })
    let warp_dom = document.querySelector(".tweet_list_main_warpp")
    if(tweet_list.data !="メッセージがありません"){

        let write_list = tweet_list.data.map((data)=>{
            let createyear = "";
            let createmonth = "";
            let createday = "";
    
            for(let s = 0;data.createdAt.length>s;s++){
                if(s<4){
                    createyear+=data.createdAt[s];
                }else if(s>4&&s<7){
                    createmonth+=data.createdAt[s];
                }else if(s>7 && s<10){
                    createday+=data.createdAt[s];
                }
            }
            let createedAt1 = createyear+"年"+" "+createmonth+"月"+ createday+"日"; 
            console.log(data.imgPath)
            if(data.imgPath == null || data.imgPath == ""){
                img_null_counter = "display:none"
            }else{
                img_null_counter = "display:inline"
            }
            let user = change_xss(data.userName)
            let tweet = return_tweet_dom(user,data.messText,createedAt1,data.imgPath,img_null_counter,data.tweetId2)
            return tweet
        }).join("")
        warp_dom.innerHTML = write_list
        let img = null
        for (let i = 0;tweet_list.data.length>i;i++){
            console.log(tweet_list.data[i])
            img = await axios.post("/api/user/getuserimg",{
                name:tweet_list.data[i].userName
            })
            let icon = document.getElementById("tweet_mess_id:"+tweet_list.data[i].tweetId2)
            icon.src = img.data
        }
        console.log("annko")
    }
}

const load_tweet = async(id)=>{
    console.log(now_tweet_page)
    if(now_tweet_page !=1){
        let tweet_data = await axios.post("/api/tweet/gettweet2",{
            page:now_tweet_page-1,
            threadSubId:id
        })
        now_tweet_page -=1
        load_flg =false
        console.log(tweet_data)
    }
}