const return_seatch_thread = (i)=>{
    let likes = window.sessionStorage.getItem(["userLike"])
    let like_list = likes.split(",")
    console.log(like_list)
    console.log(i.threadId)
    let like_icon = "likeNum"
    for(let s = 0;like_list.length>s;s++){
        if(like_list[s] == i.threadId){
            like_icon = "likeNum2"
            break
        }
    }
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
    let tag_list = i.tags
    let tag_doms = ""
    console.log(tag_list)
    for (let i = 0;tag_list.length>i;i++){
        let color =""
        console.log(tag_color)
        for (let s = 0;tag_color.length>s;s++){
            console.log(tag_color[s])
            if(tag_color[s][0] == tag_list[i]){
                
                color = tag_color[s][1]
            }
        }
        tag_doms+= return_tag_dom(tag_list[i],color)
        
    }
    return`
    <div class=${"inWapp"+i.threadNum} id = "threadlist:${i.threadId}">
    <div class="Thread" id = "${i.threadId}" onclick ="move_url_threadList(this.id)">
    <div class="ThreadHead">
        <img src="" width="90px" height="90px" class="ThreadIcon" id = "search_thread_id:${i.threadId}">
    </div>
    <div class = "thread_left_main">
    <div class = "thread_top_block_warpp">
                    
    <span class="ThreadUserName">${i.madeBy}</span>

    <div class = "thread_top_tags_warpp">
        ${tag_doms}
    
    </div>
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
                <div id = "+${i.threadId}"class="${like_icon} lineNUM" onmouseover="setflg()" onmouseleave="resetflg()" onclick ="setLike(this.id)">
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

}