async function _main(){
    await GetRecentEp();
    await GetTrendingAnime();
    await GetPopularAnime();

    document.querySelector('#searchButton').onclick = () => {
        const searchQuery = document.querySelector('#searchBar').value;
        const nextUrl = new URL(window.location.href + "result.html");
        nextUrl.searchParams.set('type', 'query')
        nextUrl.searchParams.set('searchQuery', searchQuery);
        window.location.href = nextUrl;
    }

    // wait till data is loaded
    while(isLoaded == false){

    }

    // remove the loading div
    document.getElementById('loader').style.display = 'none';

    const footerCategory = document.querySelector('footer#footer > section#categories > ul');
    for (let index = 0; index < footerCategory.children.length; index++) {
            const element = footerCategory.children[index];

            const nextUrl = new URL(window.location.href + "result.html");
            nextUrl.searchParams.set('searchQuery', element.classList[0]);
            nextUrl.searchParams.set('type', 'category')
            element.firstChild.href = nextUrl;
    }

    const navBarCategory = document.querySelector('ul#navElements > li#category > ul')

    for (let index = 0; index < navBarCategory.children.length; index++) {
        const element = navBarCategory.children[index];
        
        const nextUrl = new URL(window.location.href + "result.html");
        nextUrl.searchParams.set('searchQuery', element.classList[0]);
        nextUrl.searchParams.set('type', 'category')
        element.firstChild.href = nextUrl
    }
}

_main();