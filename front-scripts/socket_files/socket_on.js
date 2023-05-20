let socket = io()

socket.on("checkonline_req",(data)=>{
    // alert("あんこ")
})
socket.on("check_discon_user_state",(data)=>{
    console.log("tes")
    alert(data.name)
})