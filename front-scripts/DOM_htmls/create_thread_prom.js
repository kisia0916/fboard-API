const return_create_thread = ()=>{
    let html = `
    <div class="loadOrPrompt" onclick = "delete_prompt()">
    <div class="promContent1" onmouseover="set_thread_flg()" onmouseleave = "reset_thrad_flg()">
        <div class="prompt_thread_text_wapp">
            <span class="prompt_thread_text">スレッドを作成</span>
        </div>
        <div class="promContent2">
            <span class="prompt_thread_text2">スレッド名</span>
            <textarea class="new_thread_tera"></textarea>
        </div>
        <div class="promContent2">
            <span class="prompt_thread_text2">タグを指定</span>
            <div class="cp_sl01_wapp">
                <div class="cp_ipselect cp_sl01">
                    <select>
                        <option>未設定</option>
                        <option>雑談</option>
                        <option>プログラミング</option>
                        <option>ゲーム</option>
                        <option>極秘</option>
                        <option>その他</option>
                    </select>
                </div>
                <div class="cp_ipselect cp_sl01">
                    <select>
                        <option>未設定</option>
                        <option>雑談</option>
                        <option>プログラミング</option>
                        <option>ゲーム</option>
                        <option>極秘</option>
                        <option>その他</option>
                    </select>
                </div>
                <div class="cp_ipselect cp_sl01">
                    <select >
                        <option>未設定</option>
                        <option>雑談</option>
                        <option>プログラミング</option>
                        <option>ゲーム</option>
                        <option>極秘</option>
                        <option>その他</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="promContent2">
            <span class="prompt_thread_text3">１レス目を作成</span>
            <textarea class="new_thread_tera2"></textarea>
        </div>
        <div class="promContent9">
            <div class="dammy">

            </div>
            <input type="button" value="投稿" class="new_thread_create_button1" onclick = "send_thread()"></input>
        </div>
    </div>
</div>
    `
    return html
}