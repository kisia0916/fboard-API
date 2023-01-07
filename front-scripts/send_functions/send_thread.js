let thread_flg = false
const send_thread = async()=>{
    let threadName = document.querySelector(".new_thread_tera").value
    let userName = window.sessionStorage.getItem(["Name"])
    let firstTweet = document.querySelector(".new_thread_tera2").value
    console.log(`${threadName} ${userName} ${firstTweet}`)
    await axios.post("/api/thread/newthread",{
        threadname:threadName,
        username:userName,
        profile:firstTweet
    })
    let new_thread = await axios.get("/api/thread/getnewthread")
    ThreadListFirst = new_thread.data[0].threadNum-1
    console.log(new_thread.data[0])
    await write_new_thread_one(new_thread.data[0])
    delete_prompt1()
    if (window.sessionStorage.getItem(["nowLeftBarLink1"]) == "/mythread"){
        setMyThread()
    }
}
const write_prompt = ()=>{
    let mainScreen = document.querySelector(".mainWapp")
    let input = document.querySelector(".createThreadInput")
    let html = return_create_thread()
    mainScreen.insertAdjacentHTML('beforebegin',html)
    let thread_create_input = document.querySelector(".new_thread_tera")
    thread_create_input.value = input.value;

}
const delete_prompt = ()=>{
    if (thread_flg == false){
        let remove_dom = document.querySelector(".loadOrPrompt")
        remove_dom.remove()
    }
}
const delete_prompt1 = ()=>{
        let remove_dom = document.querySelector(".loadOrPrompt")
        remove_dom.remove()
        document.querySelector(".createThreadInput").value = ""
}
const set_thread_flg = ()=>{
    thread_flg = true
    console.log(thread_flg)
}
const reset_thrad_flg = ()=>{
    thread_flg = false
    console.log(thread_flg)

}
// write_prompt()

// send_thread("あけましておめでとう！！！","捨て垢","あけましておめでとう2023年もよろしく")np