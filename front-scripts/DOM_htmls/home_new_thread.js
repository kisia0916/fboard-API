const return_home_new_thread = (userName,createAt,messages,mainMessage,threadId,img_css,left_css,photo_path)=>{
    let thread_url = "thread/"+threadId;
    let thread = `
            <div id = "${threadId}" class="newThreadWapp test:${threadId}" onclick = "move_url_thread(this.id)">

            <div class = "home_new_thread_left" style=${img_css}>
            <div class="new_thread_img_wapp">
                <img src="http://${photo_path}" width="91px" height="91px" class="new_thread_img">
            </div>
        </div>

            <div class = "home_new_thread_right" style=${left_css}>

                <div class="homeThreadTop1">
                    
                    <div>

    
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

            </div>
    `
    return thread;
}