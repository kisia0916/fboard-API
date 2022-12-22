
const analysis_url = (now_url)=>{
    let url_contents = now_url.split("/")
    console.log(url_contents)
    if (url_contents[1] == "home"){
        //ホーム画面を描画する処理を描く
        write_home_page1()
        set_new_threads()
        console.log("unnkomn")
    }
    else if (url_contents[1] == "threadlist"){
        writeThreadList()
    }
    else if (url_contents[1] == "thread"){
        //urlの後につくスレッドのidを解析して描画
        write_thread_page("5iogjijojol")
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