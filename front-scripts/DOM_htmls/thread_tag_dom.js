// let tag_doms = `
// <div class = "thread_tag_main">
//     <div class = "thread_tag_color1">

//     </div>
//     <span class = "thread_tags_text"></span>
// </div>   
// `
let tag_flg = false
const set_tag_flg = ()=>{
    tag_flg = true
    console.log("a"+tag_flg)
}
const reset_tag_flg = ()=>{
    tag_flg = false
    console.log("a"+tag_flg)

}

const return_tag_dom = (tag_text,color)=>{
    let tag_html = `<div class = "thread_tag_main"  id = "${tag_text}"  onmouseover="setflg()" onmouseleave="resetflg()" onclick = "move_url_tag_page(this.id)">
    <div class = "thread_tag_color1" style = "background-color:${color}">

    </div>
    <span class = "thread_tags_text">${tag_text}</span>
</div>   
`
return tag_html
}
const return_tag_dom_2 = (tag_text,color)=>{
    let tag_html = `<div class = "thread_tag_main tweet_tag_main"  id = "${tag_text}"  onmouseover="set_tag_flg()" onmouseleave="reset_tag_flg()" onclick = "move_url_tag_page(this.id)">
    <div class = "thread_tag_color1" style = "background-color:${color}">

    </div>
    <span class = "thread_tags_text">${tag_text}</span>
</div>   
`
return tag_html
}
const return_tag_dom1 = (tag_text,color)=>{
    let tag_html = `<div class = "thread_tag_main1" id = "${tag_text}" onmouseover="set_leftFLG()" onmouseleave="reset_leftFLG()" onclick = "move_url_tag_page(this.id)">
    <div class = "thread_tag_color1" style = "background-color:${color}">

    </div>
    <span class = "thread_tags_text">${tag_text}</span>
</div>   
`
return tag_html

}