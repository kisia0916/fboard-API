const return_thread_page = ()=>{
    const thread_html = `
        <div class = "ThreadmainSpaceTop">
        <div class="home_page_title">
            Home - FBoardにようこそ
        </div>
        <div class="home_button">

        </div>
    </div>
    <div class="ThreadMainSpace">
        <div class="Thread_tweet_box">
            <div class="thread_AddFile_button">

            </div>
            <div class="thread_tweet_text_box">

                    <textarea class="thread_tweet_text_tra"></textarea>
                    
            </div>
            <div class="thread_send_tweet_button">
                <span class = "thread_send_tweet_button_text">送信</span>
            </div>
        </div>

    </div>
    <div class="thread_tweet_list">



    </div>
    `
    return thread_html;
}