const delete_thread = async(id)=>{
    let threadid = id.split(":")

    if(window.sessionStorage.getItem(["nowMainLink"]) == "/home"){
        let te = document.getElementById(threadid[1])
        console.log(te)
        if(te != null){
            console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuu")
            set_new_threads()
        }
    }else if (window.sessionStorage.getItem(["nowMainLink"]) == "/threadlist"){
        let te2 = document.getElementById("threadlist:"+threadid[1])
        console.log(te2)
        if(te2 != null){
            te2.remove()
        }
    }
    let delete_thread = document.getElementById(threadid[1])
    delete_thread.remove()
    await axios.post("/api/thread/deletethread2",{
        threadId:threadid[1],
        userId:window.sessionStorage.getItem(["userId"])
    })
    // setMyThread()

}