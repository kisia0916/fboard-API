
const write_home_page1 = ()=>{
    document.title = "FBoard-Home"
    window.sessionStorage.setItem(["nowMainLink"],"/home");
    let mainSpace = document.querySelector(".mainScreen");
    const home_html = return_home_html();
    mainSpace.innerHTML = home_html;

}
// const set_new_threads = async()=>{
//     let thread = return_home_new_thread();
//     let new_threads = document.querySelector(".new_threads");
//     let thread_data = await axios.get("/api/thread/gethomethread",{});
//     console.log(thread_data)
//     let inhtml = thread_data.data.map(async(data1)=>{
//          console.log(data1)
//          let img_style = ""
//          let text_style = ""
//         //  let user_data = await axios.post("/api/user/getuserdata",{
//         //     name:data1.madeBy,
//         //     pass:window.sessionStorage.getItem(["pass"])
//         //  })

//          if(data1.titleImgPath == "" || data1.titleImgPath == null){
//             img_style = ""
//             text_style = "width:100%"
            
//          }else{
//             console.log("ss")
//             img_style = ""
//             text_style = ""
//          }
//          let threadD = return_home_new_thread(data1.madeBy,data1.updatedAt,data1.tweets.length,data1.threadNname,data1.threadSubId,img_style,text_style,data1.titleImgPath);
//          return threadD;
//     }).join("")
//     new_threads.innerHTML = inhtml;

// }
const set_new_threads = async()=>{
    let thread = return_home_new_thread();
    let new_threads = document.querySelector(".new_threads");
    let thread_data = await axios.get("/api/thread/gethomethread",{});
    console.log(thread_data)
    let inhtml = thread_data.data.map((data1)=>{
         console.log(data1)
         let img_style = ""
         let text_style = ""
         if(data1.titleImgPath == "" || data1.titleImgPath == null){
            img_style = ""
            text_style = "width:100%"
            data1.titleImgPath = "localhost:3000/profilePhotos/R%20(1).png"
         }else{
            console.log("ss")
            img_style = ""
            text_style = ""
         }
         let threadD = return_home_new_thread(data1.madeBy,data1.updatedAt,data1.tweets.length,data1.threadNname,data1.threadSubId,img_style,text_style,data1.titleImgPath);
         return threadD;
    }).join("")
    new_threads.innerHTML = inhtml;

}
const write_tweet_first = ()=>{
    
}