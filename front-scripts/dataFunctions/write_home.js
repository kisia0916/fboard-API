
const write_home_page1 = ()=>{
    window.sessionStorage.setItem(["nowMainLink"],"/home");
    let mainSpace = document.querySelector(".mainScreen");
    const home_html = return_home_html();
    mainSpace.innerHTML = home_html;

}
const set_new_threads = async()=>{
    let thread = return_home_new_thread();
    let new_threads = document.querySelector(".new_threads");
    let thread_data = await axios.get("/api/thread/gethomethread",{});
    console.log(thread_data)
    let inhtml = thread_data.data.map((data)=>{
         let threadD = return_home_new_thread();
         return threadD;
    }).join("")
    new_threads.innerHTML = inhtml;

}