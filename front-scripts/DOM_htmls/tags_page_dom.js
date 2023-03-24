const return_tags_page_dom = ()=>{
    let html = `
        <div class="tag_list_warpp">
        <div class="tag_list_top">
            <span class="tag_list_top_title">Tag - 雑談</span>
            <div class="tag_list_top_tag">
                <div class="tag_list_top_tag_color"></div>
                <span class="tag_list_top_tag_text">雑談</span>
            </div>
        </div>
        <div class="tag_list_bottom">


        </div>

    </div>
    `
    return html
}
const return_tag_more_button = (tag_name)=>{
    let html = `
    <div class = "read_more_button_warpp" id = "more_load_button">
    <div class = "read_more_button" id = "${tag_name}" onclick = "reload_more_threads_tag(this.id)">
        <span class = "read_more_button_text">さらに読み込む</span>
    </div>
    <div class = "bottom_spacee">
    </div>
    </div>
    `
    return html
}