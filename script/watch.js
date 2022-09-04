async function _main(){
    const localUrl = new URL(window.location.href)
    
    const animeID = localUrl.searchParams.get('animeID');
    const epID = localUrl.searchParams.get('epID');
    const epNumber = localUrl.searchParams.get('epNumber');

    // console.log(animeID);
    // console.log(epID);
    // console.log(epNumber);

    await GetEpisodesStream(epID, animeID, epNumber);
    await GetRelationalAnime(animeID);

    document.getElementById('loader').style.display = 'none';
}

_main();