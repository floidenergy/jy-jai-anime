isLoaded = false;

async function _main(){
     
    
    const localUrl = new URL(window.location.href)
    
    const animeId = localUrl.searchParams.get('id');
    await GetAnimeInfo(animeId);

    // wait till data is loaded
    isLoaded = true;
    while(isLoaded == false){}

    // remove the loading div
    document.getElementById('loader').style.display = 'none';

}

_main();