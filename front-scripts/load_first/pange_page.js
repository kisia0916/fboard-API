const set_history = (history)=>{
    let split_url = history.split("/")
    console.log(split_url)
    switch(split_url[1]){
        case "home":
            window.history.pushState(null,"FBoard-Home","/home")
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        case "threadlist":
            window.history.pushState(null,"FBoard-ThreadList","/threadlist")
        case "thread":
            window.history.pushState(null,"FBoard-thread","/thread/"+split_url[2])

    }
}
