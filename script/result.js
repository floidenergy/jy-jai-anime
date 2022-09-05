
async function _main(){

    const searchQuery = new URL(window.location.href).searchParams.get('searchQuery');
    const searchType = new URL(window.location.href).searchParams.get('type');
    const searchPage = new URL(window.location.href).searchParams.get('page');

    // console.log(searchQuery);
    // console.log(searchType);
    // console.log(searchPage);

    if(searchType == 'category')
        await GetCategorySearchResult(searchQuery, searchPage)
    else
        await GetQuerySearchResult(searchQuery, searchPage);

    document.getElementById('loader').style.display = 'none';

}

_main();