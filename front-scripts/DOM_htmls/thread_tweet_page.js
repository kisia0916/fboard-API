const return_thread_tweet_page = (thread_name,like_num,tweet_counter,img,tag_dom)=>{
    const html = `

    <div class="tweet_thread_mess_main_wapp">
    <div class="tweet_thread_mess_top">
        <div class="tweet_thread_mess_top_wapp">
            <div class = "tweet_page_top_left">
                <span class="tweet_thread_mess_title">${thread_name}</span>
                <div class="tweet_page_tag">${tag_dom}</div>
            </div>
            <div class="tweet_thread_mess_tweet_num">
                <div class="tweet_thread_mess_like">
                    <span class="material-symbols-outlined tweet_thread_top_like_icon">
                        bookmark
                        </span>
                    <span class="tweet_thread_mess_like_text">${like_num}</span>
                </div>
                <span class="material-symbols-outlined tweet_thread_mess_num_icon">
                    forum
                    </span>

                <span class="tweet_thread_mess_num_text">${tweet_counter}</span>
            </div>
        </div>

    </div>
    <div class="tweet_thread_load_warpp">


    <div class="tweet_thread_mess_main" id = "tweet_thread_mess_main_id">
        <!-- <div class="gggggg">

        </div>
        <div class="gggggg">

        </div>
        <div class="gggggg">

        </div> -->
        <div class="tweet_thread_list_bottom_space">
            
        </div>
        <div class ="tweet_iremono">
        </div>
        <div class = "tweet_list_main_warpp">
        </div>
        <div class="tateyamasine"></div>
    </div>
    </div>
    
    <div class="tweet_bottom_space">

    </div>

    <div class="box31">
        <div class="box32">
                <div class="tweet_add_media_button">
                    <img src="${img}" class="ttggttg">
                </div>
                <input type = "text" class="tweet_send_input" placeholder=" メッセージを送信">
                    <label for="file">
                        <div class="tweet_add_media_button1">
                            <span class="material-symbols-outlined tweet_add_media_text">
                                add
                                </span>
                        </div>
                        <input type="file" id = "file" style="display:none" onChange="write_select_file()" accept=".jpng,.gif,.png,.jpg">
                    </label>
                    <div class="tweet_send_button_warpp">
                        <span class="material-symbols-outlined tweet_send_button">
                            send
                            </span>

                    </div>

                <div class="">

                </div>
            </div>
            <!-- <input class="testtete"> -->
    </div>
    <div class="fdsfdfdafa">

    </div>

</div>
    `
    return html;
}

const return_tweet_repry_mess = ()=>{
    let html =  `
    <div class="box30"><span class = "tweet_repry_text">fumi_fumi_0916に返信中</span>
        <div class = "tweet_repry_delete_button_warpp" onclick="delete_repry_tweet()">
            <span class="material-symbols-outlined tweet_delete_button_text">
            close
            </span>
            <div class = "tweet_repry_delete"></div>
        </div>
    </div>
    `  
    return html

}
const return_loading_page = ()=>{
    let html = `
    <div class="loader"></div>
    `
    return html
}