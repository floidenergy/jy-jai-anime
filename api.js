const api = 'https://consumet-api.herokuapp.com'
const server = 'meta/anilist';

// function infoAnime (gogoAnimeRes, anilistRes){
//     this.gogoAnime = gogoAnimeRes;
//     this.anilist = anilistRes;
// }

var activeCoverIndex = 0;


async function GetRecentEp(){
    const data = await fetch(`${api}/${server}/recent-episodes`).then(r => r.json());
    const recentEpSection = document.querySelector('#recent-ep > .list')

    data.results.slice(0, 10).map((element, index) =>{
        let newCard = document.createElement('div');
        newCard.className = 'card';
        newCard.id = index
        newCard.innerHTML = `<img src="${element.image}" alt="">
        <div class="info">
            <p class="anime_title bold red">${element.title.english || element.title.native}</p>
            <div class="subInfo">
                <p class="episods bold" style="font-size:18px; width: unset;">EP ${element.episodeNumber}</p>
            </div>
        </div>`;


        recentEpSection.appendChild(newCard)
    })

    // array.slice(0, 5).indexOf(0).

    recentEpSection.childNodes.forEach(e =>{
        e.onclick = () => {
            const direction = new URL(window.location.href+'Detail.html');
            const element = data.results.slice(0, 10)[e.id];
            direction.searchParams.set('id', element.id);
            window.location.href = direction;
        };
    })
    document.getElementById('loader').style.display = 'none';
}

async function GetPopularAnime(){
    const data = await fetch(`${api}/${server}/popular`).then(r => r.json());
    const recentEpSection = document.querySelector('#Popular > .list')

    data.results.slice(0, 10).map((element, index) =>{
        let newCard = document.createElement('div');
        newCard.className = 'card';
        newCard.id = index
        newCard.innerHTML = `<img src="${element.image}" alt="">
        <div class="info">
            <p class="anime_title bold red">${element.title.english || element.title.native}</p>
            <div class="subInfo">
                <p class="episods b-cyan">EP ${element.totalEpisodes}</p>
                <span class="rating" style="font-size: 3px !important;">
                    ${GetRattingElement(element.rating).innerHTML}
                </span>
            </div>
        </div>`;


        recentEpSection.appendChild(newCard)
    })

    // array.slice(0, 5).indexOf(0).

    recentEpSection.childNodes.forEach(e =>{
        e.onclick = () => {
            const direction = new URL(window.location.href+'Detail.html');
            const element = data.results.slice(0, 10)[e.id];
            direction.searchParams.set('id', element.id);
            window.location.href = direction;
        };
    })

}

// let animeBase = [];
async function GetTrendingAnime(){
    const listDiv = document.querySelector('#TrendingAnime > .content .vertical-list');
    const coverDiv = document.querySelector('section > .content > .preview');
    const data = await fetch(`${api}/${server}/trending`).then(r => r.json());

    // console.log(data);
    await data.results.map(async (e, index) =>{

        // anime cover
        const newCover = document.createElement('div');
        newCover.className = "cover";
        newCover.id = e.id

        newCover.innerHTML=
        `<img src="${e.cover}" alt="${e.title.english || e.title.userPreferred}" class="avatar">
        <span class="rating white b-blue">
            ${GetRattingElement(e.rating).innerHTML}
        </span>

        <div class="info b-red">
            <p class="name Xtitle bold blue">${e.title.english || e.title.userPreferred}</p>
            <p class="description white">${e.description.split("\n")[0]}</p>
        </div>`;

        // creating cards scrolling element
        const newVCard = document.createElement('div');
        newVCard.className = 'v-card';
        newVCard.id = index;

        const genres = document.createElement('ul')
        genres.className = "white";

        // adding genre elements
        e.genres.map(g => {
            const list = document.createElement('li');
            list.className = 'b-red';
            list.innerText = g;
            genres.appendChild(list)
        })

        newVCard.innerHTML =
            `<img src="${e.image}" alt="${e.title.english || e.title.userPreferred}">
            <div class="info">
                <p class="name bold red">${e.title.english || e.title.userPreferred}</p>
                <p class="episods white b-cyan">${e.totalEpisodes} EP</p>
                <p class="status red b-white">${e.status}</p>
                <div class="category">
                    <ul class="white">
                        ${genres.innerHTML}
                    </ul>
                </div>
            </div>`;

        coverDiv.appendChild(newCover);
        listDiv.appendChild(newVCard);

        listDiv.childNodes.forEach(child => {
            child.onclick = () => {
                try{
                    listDiv.querySelector(".active").classList.remove('active')
                }catch(err){}
                child.classList.add('active')

                try{
                    coverDiv.querySelector(".active").classList.remove('active');
                }catch(err){}
                coverDiv.childNodes[Number(child.id)+1].classList.add('active');
                activeCoverIndex = child.id;
            }
        })

    })

    listDiv.children[0].classList.add('active');
    coverDiv.children[0].classList.add('active');

    setInterval(SwitchActiveCover, 7000);
}

// get Ratting stars
function GetRattingElement(ratting){
            // <p class="note bold">${(e.rating * 5) / 100}</p>
            // <span class="white">
            //     <i class="bi bi-star-fill"></i>
            //     <i class="bi bi-star-fill"></i>
            //     <i class="bi bi-star-fill"></i>
            //     <i class="bi bi-star-half"></i>
            //     <i class="bi bi-star"></i>
            // </span>

            const pureRating = (ratting * 5) / 100;

            let rat = pureRating;
            const exportElement = document.createElement('span')
            const starsContainer = document.createElement('span');
            starsContainer.innerHTML= `<i class="bi bi-star-fill"></i>
                <i class="bi "></i>
                <i class="bi "></i>
                <i class="bi "></i>
                <i class="bi "></i>`

            
            for (let index = 0; index <= starsContainer.childNodes.length + 1 ; index++) {
                const element = starsContainer.childNodes[index];
                try{
                    if(rat > 1){
                        element.classList.add('bi-star-fill')
                        rat -= 1
                    }else if(rat < 1 && rat > 0){
                        element.classList.add('bi-star-half')
                        rat = 0
                    }else{
                        element.classList.add('bi-star')
                        // rat -= 1
                    }
                }catch(err){
                    // console.log(err);
                }
            }

            exportElement.innerHTML = `<p class="note bold">${pureRating}</p>
            <span class="white">
                ${starsContainer.innerHTML}
            </span>`

            return exportElement
}

function SwitchActiveCover(){
    const listDiv = document.querySelector('#topAnime > .content .vertical-list');
    const coverDiv = document.querySelector('section > .content > .preview');

        console.log(activeCoverIndex);
    if(activeCoverIndex == listDiv.childNodes.length - 2)
        activeCoverIndex = 0;

    console.log(activeCoverIndex);
    activeCoverIndex++;
    // console.log(listDiv.childNodes);
    
    //remove active cover
    // for (let index = 0; index < listDiv.children.length; index++) {
    //     const element = listDiv.children[index];
    //     // console.log(element);
    //     // console.log(coverDiv.children[index]);
    //     if(element.classList.contains('active'))
    // }
    try{
        listDiv.querySelector('.active').classList.remove('active');
        coverDiv.querySelector('.active').classList.remove('active');
    }catch(err){

    }

    listDiv.children[activeCoverIndex].classList.add('active');
    coverDiv.children[activeCoverIndex].classList.add('active');

}


GetRecentEp();
GetTrendingAnime();
GetPopularAnime();
