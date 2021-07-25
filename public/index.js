const API_KEY='api_key=8cfb59266dc37f808d7bc159b1dca769';
const BASE_URL='https://api.themoviedb.org/3';
const API_URL=BASE_URL+`/discover/movie?sort_by=popularity.desc&${API_KEY}`;
const IMG_URL='https://image.tmdb.org/t/p/w500';
const SEARCH_URL=BASE_URL+`/search/movie?`+API_KEY

const mainBody=document.querySelector('#main');
const form=document.querySelector('#form');
const search=document.querySelector('#search');
const clearButton=document.getElementById('clear');


async function getMovies(url){

    try{
    const response=await fetch(url);
    const data=await response.json();
    console.log(data.results);
    showMovies(data.results)//data.results is an array of objects

    }
    catch(err){
        console.log(err);
    }  
    

}

getMovies(API_URL);

function showMovies(data){
    //Before looping we want to set the inner HTML to empty so that everything this function is called there is a blank state to work with
    mainBody.innerHTML='';

    //For each movie in data we want to create a card
    data.forEach(movie=>{
        //We will use array destructuring to get particular properties
        const {title,poster_path,vote_average,overview}=movie;
        const movieElement=document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML=`
        <img src="${IMG_URL+poster_path}" alt="${title}" class="" >
        <div class="movie-info text-center font-bold text-lg">
            <h3 class="mt-2">${title}</h3>
            <span class="${getColor(vote_average)} font-bold ">${vote_average}</span>
        </div>
        <div class="overView p-1 opacity-100 bg-white rounded-t-lg">
            <h3 class="text-lg font-bold text-center">Overview</h3>
            <p class="text-center">${overview}</p>
        </div>
        `
        mainBody.appendChild(movieElement);
    })
}

function getColor(vote_average){
    if(vote_average>=8)return 'green';
    else if(vote_average>=5)return 'orange';
    else{
        return 'red';
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const searchTerm=search.value;
    //If searchTerm exists

    if(searchTerm){
        getMovies(SEARCH_URL+`&query=`+searchTerm);
    }else{
        getMovies(API_URL);

    }
})

clearButton.addEventListener('click',clear);

function clear(){
    
    document.getElementById('search').value='';

    getMovies(API_URL);

}






