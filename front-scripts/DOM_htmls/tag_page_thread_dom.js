const return_tag_thread = (i,tag_doms)=>{
    let name = i.madeBy.replace(/</g,"&lt;").replace(/>/g,"&gt;")
    mouseFLG = false
    let html = `
        <div class=${"inWapp"+i.threadNum} id = "threadlist:${i.threadId}">
        <div class="Thread" id = "${i.threadId}" onclick ="move_url_threadList2(this.id)" >
        <div class="ThreadHead">
            <img src="" width="90px" height="90px" class="ThreadIcon" id = "search_thread_id:${i.threadId}">
        </div>
        <div class = "thread_left_main">
        <div class = "thread_top_block_warpp">
                        
        <span class="ThreadUserName">${name}</span>

        <div class = "thread_top_tags_warpp">
            ${tag_doms}
        
        </div>
    </div>

        <div class="ThreadBody">
            <span class="ThreadTitle">${i.threadName}</span>
        </div>
        <div class="ThreadBottom">
                <span class="ThreadCreateSend">投稿日：</span>
                <span class="ThreadCreateDate">${"2023年 3月 23日"}</span>
                <div class="ThreadButton">
                    <div class="seeNum">
                        <span class="material-symbols-outlined ThreadTweetNumIcon">
                            forum
                            </span>
                        <span class="TweetCounterText">${i.tweetCounter}</span>
                    </div>
                    <div id = "+${i.threadId}"class="${"likeNum2"} lineNUM" onmouseover="setflg()" onmouseleave="resetflg()" onclick ="setLike(this.id)">
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
    return html
}