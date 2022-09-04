isLoaded = false;


async function _main(){
    document.getElementById('loader').style.display = 'none';
     
    const localUrl = new URL(window.location.href)
    
    const animeId = localUrl.searchParams.get('animeID');
    await GetAnimeInfo(animeId);
    await GetRelationalAnime(animeId)
    await GetRecommendedAnime(animeId)
    // wait till data is loaded
    // isLoaded = true;
    // while(isLoaded == false){}

    // remove the loading div

}

_main();