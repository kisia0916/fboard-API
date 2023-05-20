const return_tweet_dom = (user_name,tweet_mess,create_at,img_path,img_css,tweet_Id)=>{
    let html = `

    <div class="tweet_thread_space_wapp" id = "tweetId:${tweet_Id}">
    <div class="tweet_thread_top_space">
</div>
    <div class="tweet_thread_tweet_wapp">

        <div class="tweet_thread_left">
            <img src="http://localhost:3000/profilePhotos/R%20(1).png" class="tweet_thread_left_img" id = "tweet_mess_id:${tweet_Id}">
        </div>
        <div class="tweet_thread_center">

            <div class="tweet_thread_center_name">
                <span class="tweet_thread_center_name_text">${user_name}　<span class="tweet_thread_center_createAt">${create_at}</span></span>
                <div class="tweet_return_button" id ="tweet:${tweet_Id}" onclick="set_repry_tweet(this.id)">
                    <span class="material-symbols-outlined ffrrfrfgrg">
                        reply
                        </span>
                    <span class="tweet_thread_return_button_text"  >返信</span>
                </div>
            </div>
            <div class="tweet_thread_center_message">
                <span>${tweet_mess}</span>

            </div>
            <div>
            <img src="http://${img_path}" class = "tweet_thread_tweet_img" style=${img_css}>
            </div>
        </div>
    </div>
    <div class="tweet_thread_top_space_3">
    </div>


</div>

    `
    return html
}



const return_repry_tweet =(user_name,tweet_mess,create_at,img_path,img_css,tweet_Id,repry_tweet_id)=>{

    console.log(repry_tweet_id)
    let html = `
        <div class="tweet_thread_space_wapp" id = "tweetId:${tweet_Id}">
        <div class="tweet_thread_top_space_2">
        </div>

        
        <div class="tweet_thread_tweet_wapp">

            <div class="tweet_thread_left">
                <img src="http://localhost:3000/profilePhotos/R%20(1).png" class="tweet_thread_left_img" id = "tweet_mess_id:${tweet_Id}">
            </div>
            <div class="tweet_thread_center">

                <div class="tweet_thread_center_name">
                    <span class="tweet_thread_center_name_text">${user_name}　<span class="tweet_thread_center_createAt">${create_at}</span></span>
                    <div class="tweet_return_button" id ="tweet:${tweet_Id}" onclick="set_repry_tweet(this.id)">
                        <span class="material-symbols-outlined ffrrfrfgrg">
                            reply
                            </span>
                        <span class="tweet_thread_return_button_text"  >返信</span>
                    </div>
                </div>
                <div class = "repry_tweet_warpp">
                    <div class = "repry_top_tweet">
                        <img src="http://localhost:3000/profilePhotos/R%20(1).png" class="repry_tweet_img" id = "tweet_repry_icon:${repry_tweet_id}" ">
                        <span class = "tweet_repry_name" id = "tweet_repry_name:${repry_tweet_id}"></span>
                        <div class = "tweet_repry_mark_warpp">
                           <span class="tweet_repry_mark">re</span>
                        </div>
                    </div>
                    <div>
                        <span class="repry_tweet_main" id = "tweet_repry_mess:${repry_tweet_id}">こんにちは</span>
                        <img src ="" style="height:65px" id = "tweet_repry_img:${repry_tweet_id}" class="tweet_repry_img">
                    </div>
                </div>
                <div class="tweet_thread_center_message">
                    <span>${tweet_mess}</span>

                </div>
                <div>
                <img src="http://${img_path}" class = "tweet_thread_tweet_img" style=${img_css}>
                </div>
            </div>
        </div>
    </div>
`
    return html
}