
const write_thread_page = (id)=>{
    document.title = "FBoard-title"
    window.sessionStorage.setItem(["nowMainLink"],"/thread/"+id);
    let mainScreen = document.querySelector(".mainScreen");
    const thread_html = return_thread_tweet_page()
    mainScreen.innerHTML = thread_html;
}