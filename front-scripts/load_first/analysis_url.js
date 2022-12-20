const analysis_url = (now_url)=>{
    let url_contents = now_url.split("/")
    console.log(url_contents)
    if (url_contents[0] == "/home"){
        //ホーム画面を描画する処理を描く
    }
    else if (url_contents[0] == "/threadlist"){

    }
    else if (url_contents[0] == "/thread"){
        //urlの後につくスレッドのidを解析して描画  
    }
    else if (url_contents[0] == "/" || url_contents[0] == ""){
        console.log("test")
        writeThreadList()
    }
    else {
        //404ページを描画する
    }
    console.log(url_contents)
}
analysis_url(location.pathname)