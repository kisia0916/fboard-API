// let tag_doms = `
// <div class = "thread_tag_main">
//     <div class = "thread_tag_color1">

//     </div>
//     <span class = "thread_tags_text"></span>
// </div>   
// `

const return_tag_dom = (tag_text,color)=>{
    let tag_html = `<div class = "thread_tag_main">
    <div class = "thread_tag_color1" style = "background-color:${color}">

    </div>
    <span class = "thread_tags_text">${tag_text}</span>
</div>   
`
return tag_html
}
const return_tag_dom1 = (tag_text,color)=>{
    let tag_html = `<div class = "thread_tag_main1">
    <div class = "thread_tag_color1" style = "background-color:${color}">

    </div>
    <span class = "thread_tags_text">${tag_text}</span>
</div>   
`
return tag_html
}