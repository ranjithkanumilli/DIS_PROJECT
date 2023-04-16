//TMDB

const API_KEY = 'api_key=f55104d0cb044a5ac6b66815a2732922';

const BASE_URL = 'https://api.themoviedb.org/3';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const IMG_URL_ORIGINAL = 'https://image.tmdb.org/t/p/original';

const TRENDING_MOVIES_URL = BASE_URL + '/trending/movie/week?' + API_KEY;
const TRENDING_TV_URL = BASE_URL + '/trending/tv/week?' + API_KEY;

const trendingmovies = document.getElementsByClassName('carousel-container')[0];
const trendingtv = document.getElementsByClassName('carousel-container-tv')[0];



getTrendingMovies(TRENDING_MOVIES_URL);

getTrendingTv(TRENDING_TV_URL);

function getTrendingMovies(url) {

  fetch(url).then(res => res.json()).then(data => {
    showTrendingMovies(data.results);
    generateCarouselItems(data.results);
  })

}

function getTrendingTv(url) {

  fetch(url).then(res => res.json()).then(data => {
    showTrendingTv(data.results);
  })

}



//Carousel for trending movies
const carouselContainer = document.querySelector('.carousel-container');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
let scrollAmount = 0;
const itemsInView = 5;
const viewWidth = carouselContainer.offsetWidth / itemsInView;
let data = [];

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





//Carousel for trending TV
const carouselContainerTv = document.querySelector('.carousel-container-tv');
const prevButtonTv = document.querySelector('.prev-button-tv');
const nextButtonTv = document.querySelector('.next-button-tv');
let scrollAmountTv = 0;
const itemsInViewTv = 5;
const viewWidthTv = carouselContainerTv.offsetWidth / itemsInView;
let dataTv = [];

nextButtonTv.addEventListener('click', () => {
  scrollAmountTv += viewWidthTv;
  if (scrollAmountTv > carouselContainerTv.scrollWidthTv - viewWidthTv) {
    scrollAmountTv = carouselContainerTv.scrollWidthTv - viewWidthTv;
  }
  carouselContainerTv.scrollTo({
    top: 0,
    left: scrollAmountTv,
    behavior: 'smooth'
  });
});


prevButtonTv.addEventListener('click', () => {
  scrollAmountTv -= viewWidthTv;
  if (scrollAmountTv < 0) {
    scrollAmountTv = 0;
  }
  carouselContainerTv.scrollTo({
    top: 0,
    left: scrollAmountTv,
    behavior: 'smooth'
  });
});


function showTrendingTv(data) {
  trendingtv.innerHTML = '';

  data.forEach(item => {
    const { name, poster_path, vote_average, id } = item;
    const movieEl = document.createElement('div');
    movieEl.classList.add('carousel-item-tv');
    movieEl.innerHTML = `
        <a href="#" onclick="showTvDetails(${id})">
            <img src="${IMG_URL + poster_path}" alt="${name}">
        </a>
        <p>${name}</p>
        <p>imdb:${vote_average}</p>

        `
    trendingtv.appendChild(movieEl);
  })
}






function showMovieDetails(id) {

  window.location.href = `./Pages/Product.html?id=${id}&type=movie`;

}
function showTvDetails(id) {

  window.location.href = `./Pages/Product.html?id=${id}&type=tv`;

}


const searchURL = BASE_URL + '/search/movie?' + API_KEY;
const form = document.getElementById('form');
const search = document.getElementById('search');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value;

  if (searchTerm) {
    getTrendingMovies(searchURL + '&query=' + searchTerm)
  }
})



// carousel hero - home page

const carousel = document.querySelector(".carousel-hero");
const carouselContainerhero = document.querySelector(".carousel-container-hero");
const prevBtn = document.querySelector(".carousel-hero-prev");
const nextBtn = document.querySelector(".carousel-hero-next");

let currentIndex = 0;
let intervalId;

// Function to dynamically generate carousel items
function generateCarouselItems(data) {
  let carouselItemsHTML = "";
  data.forEach((item) => {
    const { backdrop_path, title } = item;
    carouselItemsHTML += `
      <div class="carousel-hero-item">
        <img src="${IMG_URL_ORIGINAL + backdrop_path}">
        <div class="carousel-hero-title">${title}</div>
      </div>
    `;
  });
  carouselContainerhero.innerHTML = carouselItemsHTML;
}



// Function to go to a specific slide
function goToSlide(index) {
  carouselContainerhero.style.transform = `translateX(-${index * carousel.offsetWidth}px)`;
  currentIndex = index;
}

// Function to go to the next slide
function goToNextSlide() {
  if (currentIndex === carouselContainerhero.children.length - 1) {
    goToSlide(0);
  } else {
    goToSlide(currentIndex + 1);
  }
}

// Function to go to the previous slide
function goToPrevSlide() {
  if (currentIndex === 0) {
    goToSlide(carouselContainerhero.children.length - 1);
  } else {
    goToSlide(currentIndex - 1);
  }
}

// Resize carousel items on window resize
window.addEventListener("resize", () => {
  resizeCarouselItems();
  goToSlide(currentIndex);
});

// Handle previous and next button clicks
prevBtn.addEventListener("click", () => {
  goToPrevSlide();
  clearInterval(intervalId);
});

nextBtn.addEventListener("click", () => {
  goToNextSlide();
  clearInterval(intervalId);
});

// Automatically transition to the next slide every 5 seconds
intervalId = setInterval(() => {
  goToNextSlide();
}, 5000);










