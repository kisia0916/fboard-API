
const analysis_url = (now_url)=>{
    let url_contents = now_url.split("/")
    console.log(url_contents)
    if (url_contents[1] == "home"){
        //ホーム画面を描画する処理を描く
        ffffffffffffffffff = false
        write_home_page1()
        set_new_threads()
        //window.history.pushState( null, "FBoard-Home", '/home' )
        socket.emit("changepage",{id:window.sessionStorage.getItem(["userId"]),next:"/home"})
        window.sessionStorage.setItem(["nowMainLink"],"/home")
        console.log("unnkomn")
        
    }
    else if (url_contents[1] == "threadlist"){
        mouseFLG = false
        console.log("書き換え")
        writeThreadList()
        socket.emit("changepage",{id:window.sessionStorage.getItem(["userId"]),next:"/threadlist"})
        window.sessionStorage.setItem(["nowMainLink"],"/threadlist")
        //window.history.pushState( null, "FBoard-Home", '/threadlist' )
    }
    else if (url_contents[1] == "thread"){
        //urlの後につくスレッドのidを解析して描画
        write_thread_page(url_contents[2])
        socket.emit("changepage",{id:window.sessionStorage.getItem(["userId"]),next:"/thread/"+url_contents[2]})
        window.sessionStorage.setItem(["nowMainLink"],"/thread/"+url_contents[2])
    }else if(url_contents[1] == "search"){
        mouseFLG = false
        console.log("rw")
        let sendURl = decodeURI(url_contents[2])
        sendURl = sendURl.replace(",","&")
        document.title = "FBoard-search-"+decodeURI(url_contents[2]).replace("&",",")
        if(!search_flg){
            move_url_search_thread_2(sendURl)
            fff10_func()
            console.log("unnnnnnnnnnnnnnnnnnnnnnnnnnn")
        }
        search_flg = false
        console.log("unkookooko")
        // socket.emit("changepage",{id:window.sessionStorage.getItem(["userId"]),next:"/"+search/+url_contents[2]})
        socket.emit("changepage",{id:window.sessionStorage.getItem(["userId"]),next:"/search/"+url_contents[2]})
        window.sessionStorage.setItem(["nowMainLink"],"/search/"+url_contents[2])

    }else if(url_contents[1] == "tags"){
        let tag_name = url_contents[2]
        write_tags_page(tag_name)
        socket.emit("changepage",{id:window.sessionStorage.getItem(["userId"]),next:"/tags/"+decodeURI(tag_name)})
        window.sessionStorage.setItem(["nowMainLink"],"/tags/"+tag_name)
        ffffffffffffffffff = true

    }else{

    }
    console.log(url_contents)
}
analysis_url(location.pathname)

//戻る進を検知
window.addEventListener('popstate', function(e) {
    analysis_url(this.location.pathname)
}) 