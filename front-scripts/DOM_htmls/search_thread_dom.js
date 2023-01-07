const return_search_page = (wold,num1)=>{
    return `
    <div class="mainScreenWapp">
    <div class="ThreadListTop">
        <span class="ThreadListTopText">search-${wold}</span>
    </div>

    <span class="ThreaCounterText">${num1}件のスレッド</span>
    <div class="WriteHread">
    </div>
</div>
    `
}