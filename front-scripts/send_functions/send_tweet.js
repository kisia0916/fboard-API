let file2 = null
let fileName = ""
const send_tweet = async()=>{
    let send_box_value = document.querySelector(".tweet_send_input").value
    if(send_box_value){
        let send_box_value_2 = send_box_value.replace(/</g,"&lt;").replace(/>/g,"&gt;")
        document.querySelector(".tweet_send_input").value = null
        let url = location.pathname
        let split_url = url.split("/")

        console.log(split_url[2])

        let filename = null
        if(file2){

            console.log("ggggggggggggggggg")
            get_select_file(file2)
            filename = "localhost:3000/photos/tweet_photos/"+fileName
            file2 = null
        }else{

        }
        console.log(filename)
        let send = await axios.post("/api/tweet/tweetmess",{
            "threadSubId":split_url[2],
            "messText":send_box_value_2,
            "imgPath":filename,
            "returnTo":now_repry,
            "userId":window.sessionStorage.getItem(["userId"]),
            "userName":window.sessionStorage.getItem(["Name"])
        })
        if(send.data == "ツイートに成功しました"){
            console.log("ツイート成功")
            filename = null
            delete_repry_tweet()
        }else{
            console.log("ツイート失敗")
            delete_repry_tweet()
        }
    }
}
const write_select_file = ()=>{
    file2 = document.getElementById("file").files[0]
    console.log(file2)
}
const get_select_file = async(file1) =>{
    if(file1){
        const data = new FormData()
        fileName =Date.now()+file1.name;
        console.log(fileName)
        data.append("name",fileName)
        data.append("file",file1)
        let mess = await axios.post("/api/upload/tweet_photos",data)
        if(mess.data == "画像アップに成功しました"){
            console.log("成功")
            let return_name = fileName
            return return_name
        }else{
            console.log("失敗")
        }
    }
} 