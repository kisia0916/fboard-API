const move_url = (url)=>{
    //set_history(location.pathname)
    console.log("kopfsdklfjdaskjgkl;ajwfoiw")
    let next_url = '/'+url;
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
const move_url_threadList = (url)=>{
    if (!mouseFLG){
        let next = "/thread/"+url
        window.history.pushState(null,"test",location.pathname)
        history.replaceState('','',next);
        analysis_url(location.pathname)
    }
}