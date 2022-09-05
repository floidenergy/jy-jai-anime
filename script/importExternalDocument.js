let isToggled = false;
let isLoaded = false;

async function settingExternalDocument(){
    const loaderData = await fetch('import/loader').then(res => res.text());
    // console.log(loaderData);
    document.getElementById('loader').innerHTML = loaderData;

    const navbar = document.querySelector('nav');
    let result = await fetch('import/navbar');
    let data = await result.text();
    navbar.innerHTML = data;

    toggelNavBar();

    const footer = document.querySelector('#footer');
    result = await fetch('import/footer');
    data = await result.text();
    footer.innerHTML = data;    

    isLoaded = true;

    // footer category
    const navBarCategory = document.querySelector('ul#navElements > li#category > ul')

    for (let index = 0; index < navBarCategory.children.length; index++) {
        const element = navBarCategory.children[index];
        
        const nextUrl = new URL(window.location.origin + "/result.html");
        nextUrl.searchParams.set('searchQuery', element.classList[0]);
        nextUrl.searchParams.set('type', 'category')
        element.firstChild.href = nextUrl
        // console.log(element);
    }

    const footerCategory = document.querySelector('footer#footer > section#categories > ul');

    for (let index = 0; index < footerCategory.children.length; index++) {
            const element = footerCategory.children[index];

            const nextUrl = new URL(window.location.origin + "/result.html");
            nextUrl.searchParams.set('searchQuery', element.classList[0]);
            nextUrl.searchParams.set('type', 'category')
            element.firstChild.href = nextUrl;
    }
    
}

// toggel nav bar for mobile contability
function toggelNavBar(){
    window.onresize = () => {
        if(window.screen.width > 490){
            document.querySelector('#navElements').style.display = "flex";
        }else{
            document.querySelector('#navElements').style.display = "none";
            isToggled = false;
        }
    };
    document.querySelector('#navbar > .toggol').onclick = () => {
        if(window.screen.width > 490) return
        
        if(isToggled){
            document.querySelector('#navElements').style.display = "none";
            isToggled = false;
        }
        else{
            document.querySelector('#navElements').style.display = "block"
            isToggled = true;
        }
    }
}

settingExternalDocument();

// document.querySelector('#navbar > ul').innerHTML = "<li>aaaaaa</li>"
