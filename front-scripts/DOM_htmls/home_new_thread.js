const return_home_new_thread = (userName,createAt,messages,mainMessage,threadId)=>{
    let thread_url = "thread/"+threadId;
    let thread = `
            <div id = "${threadId}" class="newThreadWapp" onclick = "move_url_thread(this.id)">
            <div class="homeThreadTop1">
                <div>
                    <img src="http://localhost:3000/profilePhotos/R%20(1).png" class="newThreadProfilePhoto">
                </div>
                <span class="home_thread_userName">${userName}</span>
            </div> 
            <div class="home_thread_main">
                <div class="fkglr">
                    <span></span>
                </div>
                <span class="home_thread_text">${mainMessage}</span>
            </div>
            <div class="home_thread_bottom">
                <div class="home_thread_create">
                    <span class="home_thread_create_text">投稿日 : ${createAt}</span>
                </div>
                <div class="home_thread_icons">
                    <div class="home_thread_tweet_counter">
                        <span class="material-symbols-outlined home_thread_tweetIcon">
                            forum
                            </span>
                        <span class="home_thread_tweet_num">${messages}</span>
                    </div>
                </div>
            </div>
        </div>
    `
    return thread;
}