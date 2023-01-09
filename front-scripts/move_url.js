let ffffffffffffffffff = false
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
    let next = "/thread/"+url
    window.history.pushState(null,"test",location.pathname)
    history.replaceState('','',next);
    analysis_url(location.pathname)
}
const move_url_thread_left = (url)=>{
    if (ffffffffffffffffff == false){
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
}
const reset_leftFLG = ()=>{
    ffffffffffffffffff = false
}
const move_url_threadList = (url)=>{
    if (!mouseFLG){
        let next = "/thread/"+url
        window.history.pushState(null,"test",location.pathname)
        history.replaceState('','',next);
        analysis_url(location.pathname)
    }
}
