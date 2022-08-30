const api = 'https://consumet-api.herokuapp.com'
const server = 'meta/anilist';

// function infoAnime (gogoAnimeRes, anilistRes){
//     this.gogoAnime = gogoAnimeRes;
//     this.anilist = anilistRes;
// }

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
            const direction = new URL(window.location.href+'player.html');
            const element = data.results.slice(0, 10)[e.id];
            direction.searchParams.set('server', "gogoanime");
            direction.searchParams.set('id', element.id);
            direction.searchParams.set('EpId', element.episodeId);
            direction.searchParams.set('episodUrl', element.url);
            console.log(direction);
            window.location.href = direction;
        };
    })
    document.getElementById('loader').style.display = 'none';
}

// let animeBase = [];
async function GetTopAnime(){
    const data = await fetch(`${api}/${server}/trending`).then(r => r.json());

    // console.log(data);
    await data.results.map(async (e, index) =>{
        const listDiv = document.querySelector('#topAnime > .content .vertical-list');
        const coverDiv = document.querySelector('section > .content > .preview');


        // console.log(coverDiv);
        // anime cover
        const newCover = document.createElement('div');
        newCover.className = "cover active";
        newCover.id = e.id

        newCover.innerHTML= `<img src="${e.cover}" alt="${e.title.english || e.title.userPreferred}" class="avatar">
        <span class="rating white b-blue">
            <p class="note bold">${(e.rating * 5) / 100}</p>
            <span class="white">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-half"></i>
                <i class="bi bi-star"></i>
            </span>
        </span>

        <div class="info b-red">
            <p class="name Xtitle bold blue">${e.title.english || e.title.userPreferred}</p>
            <p class="description white">${e.description.split("\n")[0]}</p>
        </div>`;

        // creating cards scrolling element
        const newCard = document.createElement('div');
        newCard.className = 'v-card';
        newCard.id = index;

        const genres = document.createElement('ul')
        genres.className = "white";

        // adding genre elements
        e.genres.map(g => {
            const list = document.createElement('li');
            list.className = 'b-red';
            list.innerText = g;
            genres.appendChild(list)
        })

        newCard.innerHTML =
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

            console.log();
        listDiv.appendChild(newCard)
        coverDiv.appendChild(newCover)

        listDiv.childNodes.forEach(child => {
            child.onclick = () => {
                coverDiv.childNodes.forEach(c => {
                    // if(c.classList)
                    // "hey".search(h)
                    console.log(c.classList.value);
                })
            }
        })

    })

}

GetRecentEp();
GetTopAnime();
