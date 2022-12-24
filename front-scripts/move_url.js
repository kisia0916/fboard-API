const move_url = (url)=>{
    let next_url = '/'+url;
    history.replaceState('','',next_url);
    analysis_url(location.pathname)
}