function change_page(socket,obj,next){
    obj.page = next
    return obj
}
module.exports = change_page