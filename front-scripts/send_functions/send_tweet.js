
const send_tweet = async()=>{
    let send_box_value = document.querySelector(".tweet_send_input").value
    if(send_box_value){
        document.querySelector(".tweet_send_input").value = null
        let url = location.pathname
        let split_url = url.split("/")
        let send = await axios.post("/api/tweet/tweetmess",{
            "threadSubId":split_url[2],
            "messText":send_box_value,
            "imgPath":null,
            "returnTo":null,
            "userId":window.sessionStorage.getItem(["userId"]),
            "userName":window.sessionStorage.getItem(["Name"])
        })
        if(send.data == "ツイートに成功しました"){
            console.log("ツイート成功")
        }else{
            console.log("ツイート失敗")
        }
    }
}