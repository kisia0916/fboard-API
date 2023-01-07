const return_seatch_thread = (i)=>{
    return`
    <div class=${"inWapp"+i.threadNum} id = "threadlist:${i.threadId}">
    <div class="Thread" id = "${i.threadId}" onclick ="move_url_threadList(this.id)">
    <div class="ThreadHead">
        <img src="http://localhost:3000/profilePhotos/R%20(1).png" width="39px" height="39px" class="ThreadIcon">
        <span class="ThreadUserName">${i.madeBy}</span>
    </div>
    <div class="ThreadBody">
        <span class="ThreadTitle">${i.threadName}</span>
    </div>
    <div class="ThreadBottom">
            <span class="ThreadCreateSend">投稿日：</span>
            <span class="ThreadCreateDate">${"test"}</span>
            <div class="ThreadButton">
                <div class="seeNum">
                    <span class="material-symbols-outlined ThreadTweetNumIcon">
                        forum
                        </span>
                    <span class="TweetCounterText">${i.tweetCounter}</span>
                </div>
                <div id = "+${i.threadId}"class="${"likeNum"} lineNUM" onmouseover="setflg()" onmouseleave="resetflg()" onclick ="setLike(this.id)">
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