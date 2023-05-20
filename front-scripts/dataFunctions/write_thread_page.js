
id1 = ""
let now_tweet_page = 0
load_flg = false
let img_null_counter = true
let rast_tweet_num = 0
let rast_tweet_id = ""
let now_repry = ""
const get_thread_datas = async()=>{
    let data = await axios.post("/api/thread/getthread5",{
        threadId:id1
    })
    console.log(data.data)
    return data.data
}
const write_thread_page = async(id)=>{
    now_repry = ""
    now_tweet_page = 0
    load_flg = false
    img_null_counter = true
    rast_tweet_num = 0
    rast_tweet_id = ""
    id1 = id

    window.sessionStorage.setItem(["nowMainLink"],"/thread/"+id);
    let mainScreen = document.querySelector(".mainScreen");

    // console.log(return_datas.tweetCounter)
    // if(return_datas/2)
    return_datas = await get_thread_datas()
    document.title = `FBoard-${return_datas.threadName}`
    let icon = await axios.post("/api/user/getuserimg",{
        name:window.sessionStorage.getItem(["Name"])
    })
    console.log(icon)
    let tags = return_datas.tags
    let tag_dom = ""
    tag_dom = tags.map((i)=>{
        let color = ""
        for (let x = 0;tag_color.length>x;x++){
            if (tag_color[x].indexOf(i) != -1){
                color = tag_color[x][1]
            }
        }
        let html = return_tag_dom_2(i,color)
        return html
    }).join("")
    console.log(tag_dom)
    const thread_html = return_thread_tweet_page(return_datas.threadName,return_datas.likenNum,return_datas.tweetCounter,icon.data,tag_dom)
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
            const isScrollTop = scrollTop <= (scrollHeight/10)*5;
            const isScrollBottom = scrollHeight - clientHeight === scrollTop;
            
            if (isScrollTop && !load_flg) {
                // load_flg = truenpm 
                load_tweet(id1)

                console.log("test")
            }

    }
    // el.onscroll((e)=>{
    // // window.sessionStorage.setItem(["nowMainLink"],"/thread/"+id);
    
    // if(el.scrollTop <= (el.scrollHeight/10)*5 ){
    //     load_flg = true
    //     load_tweet(id1)
    // }

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
    // let loadSpace = document.querySelector(".load_space")
    // loadSpace.innerHTML = return_loading_page()
    let repry_list = []
    console.log(document.getElementById("tweet_thread_mess_main_id").clientHeight)
    let tweet_list = await axios.post("/api/tweet/gettweet4",{
        threadId:id,
    })
    console.log(tweet_list.data)
    tweet_list.data.reverse()
    rast_tweet_num = tweet_list.data[0].tweet_num
    rast_tweet_id = tweet_list.data[0].tweetId2
    console.log(rast_tweet_num)
    // let write_list = tweet_list.data.map((data)=>{
    //     console.log(write_list)
    // })
    let warp_dom = document.querySelector(".tweet_list_main_warpp")
    if(tweet_list.data !="メッセージがありません"){
        let co = 0
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
            let tweet = ""
            if(data.returnTo){
                 repry_list.push(data.returnTo)
                tweet = return_repry_tweet(user,data.messText,createedAt1,data.imgPath,img_null_counter,data.tweetId2,data.returnTo+`:${co}`)
            co+=1

            }else{
                tweet = return_tweet_dom(user,data.messText,createedAt1,data.imgPath,img_null_counter,data.tweetId2)

            }

            return tweet
        }).join("")
        now_tweet_page = tweet_list.data[0].tweet_num
        warp_dom.innerHTML = write_list
        let main_sc = document.getElementById("tweet_thread_mess_main_id")
        main_sc.scrollTo(0, main_sc.scrollHeight);
        let img = null
    console.log(repry_list)

        for (let i = 0;repry_list.length>i;i++){
            console.log(repry_list[i]+`:${i}`)
            let tweet_name = document.getElementById("tweet_repry_name:"+repry_list[i]+`:${i}`)
            let tweet_icon = document.getElementById("tweet_repry_icon:"+repry_list[i]+`:${i}`)
            let tweet_mess = document.getElementById("tweet_repry_mess:"+repry_list[i]+`:${i}`)
            let tweet_img = document.getElementById("tweet_repry_img:"+repry_list[i]+`:${i}`)
            console.log(tweet_icon,tweet_img,tweet_mess,tweet_name)
            let tweet = await axios.post("/api/tweet/getreprytweet",{
                tweetId:repry_list[i].split(":")[0]
            })
            tweet_name.textContent = tweet.data.userName
            tweet_mess.textContent = tweet.data.messText
            if(tweet.data.imgPath){
                tweet_img.src = "http://"+tweet.data.imgPath

            }else{
                tweet_img.style.display = "none"
            }
            let icon = await axios.post("/api/user/getuserimg",{
                name:tweet.data.userName
            })
            tweet_icon.src = icon.data
        }
        tweet_list.data.reverse()

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
    let warp_dom = document.querySelector(".tweet_list_main_warpp")
    let rast_tweet_dom = document.getElementById("tweetId:"+rast_tweet_id)
    let repry_list = []
    console.log(rast_tweet_dom)
    if(!load_flg && now_tweet_page != 0){
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        let co = 0
        load_flg = true
        let more_thread = await axios.post("/api/tweet/gettweet3",{
            rast_num:rast_tweet_num,
            threadId:id
        })
        console.log(more_thread.data[more_thread.data.length-1].tweet_num)
        console.log(more_thread.data[0].tweet_num)

        now_tweet_page = more_thread.data[more_thread.data.length-1].tweet_num
        rast_tweet_num = more_thread.data[more_thread.data.length-1].tweet_num
        rast_tweet_id =  more_thread.data[more_thread.data.length-1].tweetId2
        more_thread.data.reverse()
        console.log(more_thread)
        let push_data = more_thread.data.map((data)=>{
            if(data.imgPath == null || data.imgPath == ""){
                img_null_counter = "display:none"
            }else{
                img_null_counter = "display:inline"
            }
            let user = change_xss(data.userName)
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
            let html = ""
            if(data.returnTo){
                repry_list.push(data.returnTo)
                html = return_repry_tweet(user,data.messText,createedAt1,data.imgPath,img_null_counter,data.tweetId2,data.returnTo+`:${co}`)
                co+=1
            }else{
                html = return_tweet_dom(user,data.messText,createedAt1,data.imgPath,img_null_counter,data.tweetId2)
            }
            return html
        }).join("")
        warp_dom.style.overflow = "hidden"
        rast_tweet_dom.insertAdjacentHTML('beforebegin',push_data)
    
        let img = null
        for (let i = 0;repry_list.length>i;i++){
            console.log("aa")
            let tweet_name = document.getElementById("tweet_repry_name:"+repry_list[i]+`:${i}`)
            let tweet_icon = document.getElementById("tweet_repry_icon:"+repry_list[i]+`:${i}`)
            let tweet_mess = document.getElementById("tweet_repry_mess:"+repry_list[i]+`:${i}`)
            let tweet_img = document.getElementById("tweet_repry_img:"+repry_list[i]+`:${i}`)
            let tweet = await axios.post("/api/tweet/getreprytweet",{
                tweetId:repry_list[i].split(":")[0]
            })
            tweet_name.textContent = tweet.data.userName
            console.log(tweet_mess)
            tweet_mess.textContent = tweet.data.messText
            if(tweet.data.imgPath){
                tweet_img.src = "http://"+tweet.data.imgPath

            }else{
                tweet_img.style.display = "none"
            }
            let icon = await axios.post("/api/user/getuserimg",{
                name:tweet.data.userName
            })
            tweet_icon.src = icon.data
        }
        for (let i = 0;more_thread.data.length>i;i++){
            console.log(more_thread.data[i])
            img = await axios.post("/api/user/getuserimg",{
                name:more_thread.data[i].userName
            })
            let icon = document.getElementById("tweet_mess_id:"+more_thread.data[i].tweetId2)
            icon.src = img.data
        }
        load_flg = false
        console.log(rast_tweet_num)
    }
}
const set_repry_tweet = (id)=>{
    console.log(id)
    id = id.split(":")[1]
        if(now_repry != ""){
            console.log(now_repry)
            let main_tweet_1 = document.getElementById("tweetId:"+now_repry)
            console.log(main_tweet_1)
            now_repry = ""
            main_tweet_1.style.borderRadius = "0px"
            // main_tweet.style.backgroundColor = "#404040b6;"
            main_tweet_1.style.border = "none"
            let box30 = document.querySelector(".box30")
            box30.remove()
        }

            // console.log(id)
            now_repry = id
            let box31 = document.querySelector(".box31")
            console.log(box31)
            let html = return_tweet_repry_mess()
            box31.insertAdjacentHTML("beforebegin",html)
            let main_tweet = document.getElementById("tweetId:"+id)
            console.log(main_tweet)
            main_tweet.style.borderRadius = "10px"
            // main_tweet.style.backgroundColor = "#404040b6;"
            main_tweet.style.border = "solid 1px yellow"
        
}
const delete_repry_tweet = ()=>{
    let box30 = document.querySelector(".box30")
    box30.remove()
    console.log(now_repry)
    let main_tweet_1 = document.getElementById("tweetId:"+now_repry)
    console.log(main_tweet_1)
    now_repry = ""
    main_tweet_1.style.borderRadius = "0px"
    // main_tweet.style.backgroundColor = "#404040b6;"
    main_tweet_1.style.border = "none"
    // let box30_2 = document.querySelector(".box30")
    // box30_2.remove()
    now_repry = ""

}