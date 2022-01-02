const APIKEY = '';
let page = 1;
const APIURL = 'https://api.themoviedb.org/3/movie/popular?api_key=&language=en-US&page=';
const ImgPath='https://image.tmdb.org/t/p/w500';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?api_key=&language=en-US&query=';

const YT = 'https://www.youtube.com/watch?v=';
const main= document.querySelector('main');

const form = document.querySelector('form');
const search = document.getElementById('search');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

getMovie(APIURL + page);

async function getMovie(url){
    const respMovie = await fetch(url);
    const response = await respMovie.json();
    console.log(response);
    showMovies(response);
}

async function showMovies(movies) {
    //initial clear
    main.innerHTML='';
    movies.results.forEach((movie)=>{
        if(movie.poster_path)
        {
            const movieEl = document.createElement("div");
            movieEl.classList.add('movie');
            movieEl.innerHTML='<img src=" '+ImgPath+movie.poster_path+' "><div class="movie-info"><h3>'+movie.title+'</h3><span class='+getAverage(movie.vote_average)+'>'+movie.vote_average+'</span></div><div class="overview"><h4>Overview: </h4>'+movie.overview+'</div>';
            fetch('https://api.themoviedb.org/3/movie/'+movie.id+'/videos?api_key=&language=en-US').then(res=>{
                return res.json();
            }).then((videoData)=>{
               const video=videoData.results[0].key;
               movieEl.innerHTML ='<a style="text-decoration:none" href="'+YT + video+'">'+ movieEl.innerHTML + '</a>';
               console.log(movieEl.innerHTML);
            });
            main.appendChild(movieEl);
            
        }
    });
    
}

function getAverage(vote) {
    if(vote>=8)
    return "green";
    else if(vote>=5)
    return "orange";
    else
    return "red";
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const searchVal = search.value;
    if(searchVal)
    {
        getMovie(SEARCHAPI + searchVal);
        search.value='';
    }
});

nextButton.addEventListener('click',(e)=>{
    page++;
    getMovie(APIURL+page);
});

prevButton.addEventListener('click',(e)=>{
    if(page>1)
    {
        page--;
        getMovie(APIURL+page);
    }
})