let search_input = document.getElementById("searchThread")
let search_flg = false
search_input.addEventListener("keypress",async(e)=>{
    if (e.keyCode == 13){
        let search_text = document.getElementById("searchThread").value
        let mainSpace = document.querySelector(".mainScreen")
        if(search_text){
            let text2 =search_text.replace(/\s+/g,",")
            console.log(text2)

            let threadList = await axios.post(`/api/thread/search/${text2}`,{

            }) 
            console.log(threadList.data[0])
            let url = text2.replace(",","&")
            search_flg = true
            move_url_search_thread(url) 
            let num = threadList.data
            let ss = num.length
            if (threadList.data[0] == null){
                ss = 0
            }
            console.log(ss)
            let seatch_page_dom = return_search_page(search_text,ss)
            mainSpace.innerHTML = seatch_page_dom
            // document.querySelector(".ThreaCounterText").textContent
            if(ss>0){
                let write_dom = threadList.data.map((i)=>{
                    let re_html = return_seatch_thread(i)
                    return re_html
                }).join("")
                let writeSpace = document.querySelector(".WriteHread");
                writeSpace.innerHTML = write_dom
                for (let i = 0;threadList.data.length>i;i++){
                    let thread = document.getElementById(`threadIcon:${threadList.data[i].threadId}`)
                    let img = await axios.post("/api/user/getuserimg",{
                        name:threadList.data[i].madeBy
                    })
                    thread.src = img.data
                }
            }
        }
        
    }
})
const search_thread_write = async(url)=>{
    console.log("ううんこおおおおおおおおおおお")
        let search_text = url
        let mainSpace = document.querySelector(".mainScreen")
        if(search_text){
            console.log("bug")
            let text2 =search_text.replace("&",",")
            let url1= text2.replace(",","&")
            // move_url_search_thread(url1)
            console.log(text2)
            let threadList = await axios.post(`/api/thread/search/${text2}`,{

            }) 
            // move_url_search_thread(text2)
            let search_text2 = search_text.replace("&","　")
            let seatch_page_dom = return_search_page(search_text,threadList.data.length)
            console.log(threadList.data)
            // move_url_search_thread(url) 
            mainSpace.innerHTML = seatch_page_dom
            let write_dom = threadList.data.map((i)=>{
                let re_html = return_seatch_thread(i)
                return re_html
            }).join("")
            let writeSpace = document.querySelector(".WriteHread");
            writeSpace.innerHTML = write_dom
    }
}

// search_input.addEventListener("keypress",async(e)=>{
//     if (e.keyCode == 13){
//         console.log("aa")
//             let search_wold = document.querySelector(".searchThread").value
//             let search_wold2 = search_wold.replace(/\s+/g,",")
//             let threadList = await axios.post(`/api/thread/search/${search_wold2}`,{

//             }) 
//             console.log(threadList.data)
//             console.log(threadList.data[0])
//             move_url_search_thread(search_wold2)
//             search_flg = true
        
//     }
// })
const fff10_func = async()=>{
    let ss_text = location.pathname.split("/")
    let search_text = decodeURI(ss_text[2]).replace("&"," ")
    search_text = decodeURI(ss_text[2]).replace(","," ")
    let mainSpace = document.querySelector(".mainScreen")
    if(search_text){
        console.log("aaaaaaaaaaaaaaaaaaaaaaaa")
        let text2 =search_text.replace("&",",")
        text2 = text2.replace("&",",")
        text2 = text2.replace(/\s+/g,",")
        console.log(text2)

        let threadList = await axios.post(`/api/thread/search/${text2}`,{

        }) 
        console.log(threadList.data)
        let url = text2.replace(",","&")
        search_flg = true
        // move_url_search_thread(url) 
        let num = threadList.data
        let ss = num.length
        if (threadList.data[0] == null){
            ss = 0
        }
        console.log(ss)
        let seatch_page_dom = return_search_page(text2,ss)
        mainSpace.innerHTML = seatch_page_dom
        // document.querySelector(".ThreaCounterText").textContent
        if(ss>0){
            let write_dom = threadList.data.map((i)=>{
                let re_html = return_seatch_thread(i)
                return re_html
            }).join("")
            let writeSpace = document.querySelector(".WriteHread");
            writeSpace.innerHTML = write_dom
        }
    }
}