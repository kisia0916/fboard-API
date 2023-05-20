let ffffffffffffffffff = false
let left_flg_1 = false
const move_url = (url)=>{
    //set_history(location.pathname)
    console.log("kopfsdklfjdaskjgkl;ajwfoiw")
    let next_url = '/'+url;
    window.history.pushState(null,"test",location.pathname)
    history.replaceState('','',next_url);
    analysis_url(location.pathname)

}
const move_url_home = ()=>{
    //set_history(location.pathname)
    console.log("kopfsdklfjdaskjgkl;ajwfoiw")
    let next_url = '/'+"home";
    window.history.pushState(null,"test",location.pathname)
    history.replaceState('','',next_url);
    analysis_url(location.pathname)

}

const move_url_thread = (url)=>{
    console.log("いきてます")

    if(ffffffffffffffffff == false){
        let next = "/thread/"+url
        window.history.pushState(null,"test",location.pathname)
        history.replaceState('','',next);
        analysis_url(location.pathname)
    }
}
const move_url_thread_left = (url)=>{
    if (left_flg_1 == false){
        let next = "/thread/"+url
        window.history.pushState(null,"test",location.pathname)
        history.replaceState('','',next);
        analysis_url(location.pathname)
    }
}
// const move_url_search_thread = (text)=>{
//     // let text2 = text.replace(",","&")
//     let text2 = text//decodeURI(text)
//     // let text3 = text2.replace(",","&")
//     let next = "/search/"+text2
//     window.history.pushState(null,"test",location.pathname)
//     history.replaceState('','',next);
//     analysis_url(location.pathname)
// }
const move_url_search_thread = (text)=>{
    // let text2 = text.replace(",","&")
        let text2 = text//decodeURI(text)
        // let text3 = text2.replace(",","&")
        let next = "/search/"+text2
        window.history.pushState(null,"test",location.pathname)
        history.replaceState('','',next);
        analysis_url(location.pathname)
}
const move_url_search_thread_2 = (text)=>{
    let text2 = decodeURI(text)
    let next = "/search/"+text2
    window.history.pushState(null,"test",location.pathname)
    history.replaceState('','',next);
    // analysis_url(location.pathname)

}
const set_leftFLG = ()=>{
    ffffffffffffffffff = true
    console.log("a")
}
const reset_leftFLG = ()=>{
    ffffffffffffffffff = false
}
const set_leftFLG_2 = ()=>{
    left_flg_1 = true
    console.log("a")
}
const reset_leftFLG_2 = ()=>{
    left_flg_1 = false
}
const move_url_threadList = (url)=>{
    console.log("vv")
    if(!mouseFLG){
        let next = "/thread/"+url
        window.history.pushState(null,"test",location.pathname)
        history.replaceState('','',next);
        analysis_url(location.pathname)
    }
}
const move_url_threadList2 = (url)=>{
    // console.log("vv")
    if(!mouseFLG){
        let next = "/thread/"+url
        window.history.pushState(null,"test",location.pathname)
        history.replaceState('','',next);
        analysis_url(location.pathname)
    }
}

const move_url_tag_page = (url)=>{
    // if(ffffffffffffffffff == false){
        let next = "/tags/"+url
        window.history.pushState(null,"test",location.pathname)
        history.replaceState('','',next);
        analysis_url(location.pathname)
        ffffffffffffffffff = true
    // }
}