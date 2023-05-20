socket.emit("connection_data",{
    id:window.sessionStorage.getItem(["userId"]),
    page:window.sessionStorage.getItem(["nowMainLink"]),
    mainState:{isOnline:"online"},
    subStatus:{nowWriteing:false},
})