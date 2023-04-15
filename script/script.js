//TMDB

const API_KEY = 'api_key=f55104d0cb044a5ac6b66815a2732922';

const BASE_URL = 'https://api.themoviedb.org/3';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const TRENDING_MOVIES_URL = BASE_URL + '/trending/movie/week?' + API_KEY;
const TRENDING_TV_URL = BASE_URL + '/trending/tv/week?' + API_KEY;

const trendingmovies = document.getElementsByClassName('carousel-container')[0];
const trendingtv = document.getElementsByClassName('carousel-container')[1];



getTrendingMovies(TRENDING_MOVIES_URL);

getTrendingTv(TRENDING_TV_URL);

function getTrendingMovies(url) {

    fetch(url).then(res => res.json()).then(data => {
        showTrendingMovies(data.results);
    })

}

function getTrendingTv(url) {

    fetch(url).then(res => res.json()).then(data => {
        showTrendingTv(data.results);
        console.log(data.results)
    })

}




const carouselContainers = document.querySelectorAll('.carousel-container');
// const prevButton = document.querySelector('.prev-button');
// const nextButton = document.querySelector('.next-button');
// let scrollAmount = 0;
// const itemsInView = 5;
// const viewWidth = carouselContainer.offsetWidth / itemsInView;
// let data = [];




carouselContainers.forEach(carouselContainer => {
    const prevButton = document.getElementsByClassName('prev-button')[0];
    const nextButton = document.getElementsByClassName('next-button')[0];
    let scrollAmount = 0;
    const itemsInView = 5;
    const viewWidth = carouselContainer.offsetWidth / itemsInView;
    let data = [];

    // Add event listeners to previous and next buttons

    nextButton.addEventListener('click', () => {
        scrollAmount += viewWidth;
        if (scrollAmount > carouselContainer.scrollWidth - viewWidth) {
            scrollAmount = carouselContainer.scrollWidth - viewWidth;
        }
        carouselContainer.scrollTo({
            top: 0,
            left: scrollAmount,
            behavior: 'smooth'
        });
    });


    prevButton.addEventListener('click', () => {
        scrollAmount -= viewWidth;
        if (scrollAmount < 0) {
            scrollAmount = 0;
        }
        carouselContainer.scrollTo({
            top: 0,
            left: scrollAmount,
            behavior: 'smooth'
        });
    });



});

function showTrendingMovies(data) {
    trendingmovies.innerHTML = '';

    data.forEach(item => {
        const { title, poster_path, vote_average, id } = item;
        const movieEl = document.createElement('div');
        movieEl.classList.add('carousel-item');
        movieEl.innerHTML = `
        <a href="#" onclick="showMovieDetails(${id})">
            <img src="${IMG_URL + poster_path}" alt="${title}">
        </a>
        <p>${title}</p>
        <p>imdb:${vote_average}</p>

        `

        trendingmovies.appendChild(movieEl);
    })
}

function showTrendingTv(data) {
    trendingtv.innerHTML = '';

    data.forEach(item => {
        const { name, poster_path, vote_average, id } = item;
        const movieEl = document.createElement('div');
        movieEl.classList.add('carousel-item');
        movieEl.innerHTML = `
        <a href="#" onclick="showMovieDetails(${id})">
            <img src="${IMG_URL + poster_path}" alt="${name}">
        </a>
        <p>${name}</p>
        <p>imdb:${vote_average}</p>

        `
        trendingtv.appendChild(movieEl);
    })
}




// // Add event listeners to previous and next buttons
// nextButton.addEventListener('click', () => {
//     scrollAmount += viewWidth;
//     if (scrollAmount > carouselContainer.scrollWidth - viewWidth) {
//         scrollAmount = carouselContainer.scrollWidth - viewWidth;
//     }
//     carouselContainer.scrollTo({
//         top: 0,
//         left: scrollAmount,
//         behavior: 'smooth'
//     });
// });

// prevButton.addEventListener('click', () => {
//     scrollAmount -= viewWidth;
//     if (scrollAmount < 0) {
//         scrollAmount = 0;
//     }
//     carouselContainer.scrollTo({
//         top: 0,
//         left: scrollAmount,
//         behavior: 'smooth'
//     });
// });




function showMovieDetails(id) {
    // This function will open a new page to show the details of the selected movie
    // You can use the title parameter to fetch the movie details from your API or database

    // Example code to redirect to the details page:
    window.location.href = `./Pages/Product.html?id=${id}`;

}


const searchURL = BASE_URL + '/search/movie?' + API_KEY;
const form = document.getElementById('form');
const search = document.getElementById('search');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;

    if(searchTerm){
        getTrendingMovies(searchURL + '&query=' + searchTerm)
    }
})