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

    return`
    <div class=${"inWapp"+i.threadNum} id = "threadlist:${i.threadId}">
    <div class="Thread" id = "${i.threadId}" onclick ="move_url_threadList(this.id)">
    <div class="ThreadHead">
        <img src="" width="39px" height="39px" class="ThreadIcon" id = "threadIcon:${i.threadId}">
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
                <div id = "+${i.threadId}"class="${like_icon} lineNUM" onmouseover="setflg()" onmouseleave="resetflg()" onclick ="setLike(this.id)">
                    <span class="material-symbols-outlined ThreadLikeCounterIcon">
                        bookmark
                        </span>
                        <span class="LileCounterText" id = "*${i.threadId}">${i.likenNum}</span>
                </div>
            </div>
    </div>
</div>
<input type = "hidden" id = "ThreadId" value = ${i.threadId}>
</div>
    `
}