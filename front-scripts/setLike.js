let like_button_text = null;
console.log(window.sessionStorage.getItem(["userLike"]))
const setLike = async(i)=>{
    let counter = 0
    let textList = i.split("+")
    let threadId = textList[1] 
    let subLikest = window.sessionStorage.getItem(["userLike"]);
    let likelist =subLikest.split(",")
    console.log(likelist)
    if (true){
        for (let i = 0;likelist.length>i;i++){
            if(likelist[i] == threadId){
                counter+=1
            }
        }
        let like_id = "*"+threadId
        like_button_text = document.getElementById(like_id);

        let likeNum = like_button_text.textContent;

        if(counter == 0){
            let newThreadList = window.sessionStorage.getItem(["userLike"])
            newThreadList = newThreadList+`,${threadId}`
            window.sessionStorage.setItem(["userLike"],newThreadList)
            like_button_text.textContent = Number(likeNum)+1

        }else if (Number(likeNum) >0){
            like_button_text.textContent = Number(likeNum)-1
            let newThreadList1 = window.sessionStorage.getItem(["userLike"])
            let newThreadList2 = newThreadList1.split(",")
            console.log(newThreadList2)
            for (let i= 0;newThreadList2.length>i;i++){
                if (newThreadList2[i] == threadId){
                    newThreadList2.splice(i,1)
                }
            }
            window.sessionStorage.setItem(["userLike"],newThreadList2)
        }

        await axios.post("/api/thread/setlike",{
            userId:window.sessionStorage.getItem(["userId"]),
            subThreadId:threadId
        })


        if (counter == 0){
            // let newThreadList = window.sessionStorage.getItem(["userLike"])
            // newThreadList = newThreadList+`,${threadId}`
            // window.sessionStorage.setItem(["userLike"],newThreadList)
            // like_button_text.textContent = Number(likeNum)+1
            let getThreadText = i
            let button = document.getElementById(getThreadText)
            console.log(`${i}-${button}-${getThreadText}`)
            button.style.border = "solid 1px rgb(248, 194, 87)"

            //ここでsocketの処理を呼ぶ
            if(window.sessionStorage.getItem(["nowLeftBarLink1"]) == "/like"){
                setLikeThread()
            }
            console.log(window.sessionStorage.getItem(["userLike"]))
        }else{

            // let newThreadList1 = window.sessionStorage.getItem(["userLike"])
            // let newThreadList2 = newThreadList1.split(",")
            // console.log(newThreadList2)
            // for (let i= 0;newThreadList2.length>i;i++){
            //     if (newThreadList2[i] == threadId){
            //         newThreadList2.splice(i,1)
            //     }
            // }
            // window.sessionStorage.setItem(["userLike"],newThreadList2)
            // like_button_text.textContent = Number(likeNum)-1
            let getThreadText = i
            let button = document.getElementById(getThreadText)
            // console.log(`${i}-${button}-${getThreadText}`)
            button.style.border = "solid 0px red"
            // console.log(window.sessionStorage.getItem(["userLike"])) 
            if(window.sessionStorage.getItem(["nowLeftBarLink1"]) == "/like"){
                setLikeThread()
            }
        }
    }
}

const setLike2 = async(i)=>{
    let threadId = i.split("+")[1];
    let userLike = window.sessionStorage.getItem(["userLike"]).split(",")
    let like_id = "*"+threadId
    let like_button_warpp = document.getElementById(i)
    if (userLike.indexOf(threadId) == -1){
        console.log("押されました")
        let setText = window.sessionStorage.getItem(["userLike"])+","+threadId
        window.sessionStorage.setItem(["userLike"],setText)
        //数字を変更
        like_button_text = document.getElementById(like_id);

        let likeNum = like_button_text.textContent;
        like_button_text.textContent = Number(likeNum)+1
        like_button_warpp.style.border = "solid 1px rgb(248, 194, 87)"
        await axios.post("/api/thread/setlike2",{
            userId:window.sessionStorage.getItem(["userId"]),
            threadId:threadId
        })
        if(window.sessionStorage.getItem(["nowLeftBarLink1"]) == "/like"){
            setLikeThread()
        }
    }else{//すでに登録されている場合
        console.log("押されました2")
        let newText = userLike.map((i)=>{
            if (i != threadId){
                return i
            }
        }) 
        window.sessionStorage.setItem(["userLike"],newText)
        like_button_text = document.getElementById(like_id);

        let likeNum = like_button_text.textContent;
        like_button_text.textContent = Number(likeNum)-1
        like_button_warpp.style.border = "solid 0px red"
        await axios.post("/api/thread/deletelike2",{
            userId:window.sessionStorage.getItem(["userId"]),
            threadId:threadId
        })
        if(window.sessionStorage.getItem(["nowLeftBarLink1"]) == "/like"){
            setLikeThread()
        }
    }

}   