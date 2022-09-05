async function _main(){
    await GetBannerAnime()
    await GetRecentEp();
    await GetTrendingAnime();
    await GetPopularAnime();

    // document.querySelector('#searchButton').onclick = () => {
    //     const searchQuery = document.querySelector('#searchBar').value;
    //     const nextUrl = new URL(window.location.origin + "/result.html");
    //     nextUrl.searchParams.set('type', 'query')
    //     nextUrl.searchParams.set('searchQuery', searchQuery);
    //     window.location.href = nextUrl;
    // }

    //// wait till data is loaded
    //// while(isLoaded == false){

    // }

    // remove the loading div
    document.getElementById('loader').style.display = 'none';

    

    
}

_main();