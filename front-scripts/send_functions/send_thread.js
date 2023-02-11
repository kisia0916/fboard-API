let thread_flg = false
let first_file = null
let fileName_2 = ""
const send_thread = async()=>{
    let threadName = document.querySelector(".new_thread_tera").value
    let userName = window.sessionStorage.getItem(["Name"])
    let firstTweet = document.querySelector(".new_thread_tera2").value
    console.log(`${threadName} ${userName} ${firstTweet}`)
    //ここで画像保存
    get_select_file_thread(first_file)
    console.log(fileName_2)
    if(fileName_2){
        fileName_2 = "localhost:3000/photos/tweet_photos/"+fileName_2
    }else{
        fileName_2 = ""
    }
    await axios.post("/api/thread/newthread",{
        threadname:threadName,
        username:userName,
        profile:firstTweet,
        imgPath:fileName_2,
        tags:["プログラミング","雑談"]
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
const write_select_file_2 = ()=>{
    first_file = document.getElementById("filst_tweet_img").files[0]
    console.log(first_file)
}
// write_prompt()
const get_select_file_thread = async(file1) =>{
    if(file1){
        const data = new FormData()
        fileName_2 =Date.now()+file1.name;
        console.log(fileName_2)
        data.append("name",fileName_2)
        data.append("file",file1)
        let mess = await axios.post("/api/upload/tweet_photos",data)
        if(mess.data == "画像アップに成功しました"){
            console.log("成功")
            let return_name = fileName_2
            return return_name
        }else{
            console.log("失敗")
        }
    }
} 

// send_thread("あけましておめでとう！！！","捨て垢","あけましておめでとう2023年もよろしく")np