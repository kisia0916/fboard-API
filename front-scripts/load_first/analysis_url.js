
const analysis_url = (now_url)=>{
    let url_contents = now_url.split("/")
    console.log(url_contents)
    if (url_contents[1] == "home"){
        //ホーム画面を描画する処理を描く
        write_home_page1()
        set_new_threads()
        window.history.pushState( null, "FBoard-Home", '/home' )
        window.sessionStorage.setItem(["nowMainLink"],"/home")
        console.log("unnkomn")
    }
    else if (url_contents[1] == "threadlist"){
        
        console.log("書き換え")
        writeThreadList()
        window.sessionStorage.setItem(["nowMainLink"],"/threadlist")

    }
    else if (url_contents[1] == "thread"){
        //urlの後につくスレッドのidを解析して描画
        write_thread_page(url_contents[2])
        window.sessionStorage.setItem(["nowMainLink"],"/thread/"+url_contents[2])
    }
    else if (url_contents[0] == "/" || url_contents[0] == ""){
        console.log("test")

        //write_home_page()
    }
    else {
        //404ページを描画する
    }6
    console.log(url_contents)
}
analysis_url(location.pathname)
