const write_tags_page = async(tag)=>{
    let mainScreen = document.querySelector(".mainScreen");
    mainScreen.innerHTML = return_tags_page_dom()
    let first_threads = await axios.post("/api/thread/getfirsttags",{
        tag:tag,
    })
    console.log(first_threads.data)
    let page_main = first_threads.data.map((i)=>{
        console.log(i)
        let thread_dom = return_tag_thread(i)
        // console.log(thread_dom)
        return thread_dom
    }).join("")
    let bottom_dom = document.querySelector(".tag_list_bottom")
    console.log(page_main)
    bottom_dom.innerHTML =  page_main
    //写真
    for (let i = 0;first_threads.data.length>i;i++){
        let img = ""
        if(first_threads.data[i].first_img == ""){
            img = await axios.post("/api/user/getuserimg",{
                name:first_threads.data[i].madeBy
            })
            img = img.data
        }else{
            img = "http://"+first_threads.data[i].first_img
        }
        let thread = document.getElementById(`search_thread_id:${first_threads.data[i].threadId}`)
        thread.src = img
    }
}