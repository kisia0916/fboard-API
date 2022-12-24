const return_home_html = ()=>{
    const html = `
            <div class = "HomemainSpaceTop">
            <div class="home_page_title">
                Home - FBoardにようこそ
            </div>
            <div class="home_button">

            </div>
        </div>
        <div class="HomeMainSpace">
            <div class="home_topics">
                <div class="home_content_news_wapp">
                    <div class="home_thread_news_top">
                        <span class="home_content_text2">ページ更新情報</span>
                    </div>
                        <div class="home_news_texts">



                        </div>
                        <div class="home_news_bottom_space"></div>
                </div>
            </div>
            <!-- <div class="home_topics">
                <span class="home_content_text1">タグ一覧</span>
                <div class="home_tags_wapp">
                    <div class="home_tag">
                        <span>雑談</span>
                    </div>
                </div>
            </div> -->
            <div class="home_new_thread">
                <div class="home_content_text_wapp">
                    <span class="home_content_text1">最新のスレッド</span>
                    <span class="home_content_moreload" onclick = "move_url('threadlist')"><u>さらに読み込む</u></span>
                </div>
                <div class="new_threads">








                </div>
                <div class="lgotpgjmfkld">

                </div>
            </div>

        </div>
        <div class="home_page_bottom">
            <span class="home_bottom_text">© FBoard made by fumi</span>
        </div>

    `
    return html
}