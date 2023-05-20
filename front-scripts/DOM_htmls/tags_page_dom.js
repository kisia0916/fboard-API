const return_tags_page_dom = (tag_name)=>{
    let color = "white"
    for (let i = 0;tag_color.length>i;i++){
        if(tag_color[i][0] == tag_name){
            color = tag_color[i][1]
        }
    }
    let html = `
        <div class="tag_list_warpp">
        <div class="tag_list_top">
            <span class="tag_list_top_title">Tag - ${tag_name}</span>
            <div class="tag_list_top_tag">
                <div class="tag_list_top_tag_color" style="background-color:${color}"></div>
                <span class="tag_list_top_tag_text">${tag_name}</span>
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