let rast_num_tag_page = 0
const write_tags_page = async(tag)=>{
    // mouseFLG = false
    tag = decodeURI(tag)
    document.title = `FBoard-tag-${tag}`
    let mainScreen = document.querySelector(".mainScreen");
    mainScreen.innerHTML = return_tags_page_dom(tag)
    let first_threads = await axios.post("/api/thread/getfirsttags",{
        tag:tag,
    })
    let more_read = 1
    console.log(first_threads.data)
    // rast_num_tag_page = 
     if(first_threads.data.length==21){
        first_threads.data.pop()
     }else{
        more_read = 0
     }
    let page_main = first_threads.data.map((i)=>{
        console.log(i)
        let tag_list = i.tags
        let tag_doms = ""
        for (let i = 0;tag_list.length>i;i++){
            let color =""
            console.log(tag_color)
            for (let s = 0;tag_color.length>s;s++){
                console.log(tag_color[s])
                if(tag_color[s][0] == tag_list[i]){
                    
                    color = tag_color[s][1]
                }
            }
            tag_doms+= return_tag_dom(tag_list[i],color)
            
        }
        let thread_dom = return_tag_thread(i,tag_doms)
        // console.log(thread_dom)

        return thread_dom
    }).join("")
    let bottom_dom = document.querySelector(".tag_list_bottom")
    console.log(page_main)
    bottom_dom.innerHTML =  page_main
    rast_num_tag_page = first_threads.data[first_threads.data.length-1].threadNum
    if(more_read ==1){
        console.log("unnko")
        let tag_list_warpp = document.querySelector(".tag_list_warpp")
        bottom_dom.insertAdjacentHTML("afterend",return_tag_more_button(tag))
        
    }
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

const reload_more_threads_tag = async(tag_name)=>{
    console.log(tag_name)
    let more_thread = await axios.post("/api/thread/getnexttags",{
        tag:tag_name,
        rastnum:rast_num_tag_page
    })
    console.log(more_thread.data)
    let more_thread_main = more_thread.data.map((i)=>{
        // console.log(i)
        let tag_list = i.tags
        let tag_doms = ""
        for (let i = 0;tag_list.length>i;i++){
            let color =""
            console.log(tag_color)
            for (let s = 0;tag_color.length>s;s++){
                console.log(tag_color[s])
                if(tag_color[s][0] == tag_list[i]){
                    
                    color = tag_color[s][1]
                }
            }
            tag_doms+= return_tag_dom(tag_list[i],color)
            
        }
        let thread_dom = return_tag_thread(i,tag_doms)
        return thread_dom
        
    }).join("")
    let bottom_dom = document.querySelector(".tag_list_bottom")
    bottom_dom.insertAdjacentHTML("afterend",more_thread_main)
    if(more_thread.data.length < 11){
        document.getElementById("more_load_button").remove()
    }
    rast_num_tag_page = more_thread.data[more_thread.data.length-1].threadNum
    for (let i = 0;more_thread.data.length>i;i++){
        let img = ""
        if(more_thread.data[i].first_img == ""){
            img = await axios.post("/api/user/getuserimg",{
                name:more_thread.data[i].madeBy
            })
            img = img.data
        }else{
            img = "http://"+more_thread.data[i].first_img
        }
        let thread = document.getElementById(`search_thread_id:${more_thread.data[i].threadId}`)
        
        thread.src = img
    }
}