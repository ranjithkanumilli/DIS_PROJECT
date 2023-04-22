
const API_KEY = 'api_key=f55104d0cb044a5ac6b66815a2732922';

const BASE_URL = 'https://api.themoviedb.org/3';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const movies = document.getElementsByClassName("movies-page")[0];

const MOVIE_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;

const searchURL = BASE_URL + '/search/movie?' + API_KEY;
getMovies(MOVIE_URL);

function getMovies(url) {

    fetch(url).then(res => res.json()).then(data => {
        showMovies(data.results);
    })

}

const genres = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }

]

const tagsEl = document.getElementById('tags');

var selectedGenre = []
setGenre()
function setGenre() {
    tagsEl.innerHTML = '';
    genres.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id = genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () => {
            if (selectedGenre.length == 0) {
                selectedGenre.push(genre.id);
            } else {
                if (selectedGenre.includes(genre.id)) {
                    selectedGenre.forEach((id, idx) => {
                        if (id == genre.id) {
                            selectedGenre.splice(idx, 1);
                        }
                    })
                } else {
                    selectedGenre.push(genre.id);
                }
            }
            getMovies(MOVIE_URL + '&with_genres=' + encodeURI(selectedGenre.join(',')));
            highlightSelection()
        })
        tagsEl.append(t);
    })
}

function highlightSelection() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.style.cssText = 'color:none';
    })
    if (selectedGenre.length != 0) {
        selectedGenre.forEach(id => {
            const highlightedtag = document.getElementById(id);
            highlightedtag.style.cssText = 'background-color:#609966';
        })
    }

}

function showMovies(data) {
    movies.innerHTML = '';

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

        movies.appendChild(movieEl);
    })
}


function showMovieDetails(id) {
    // This function will open a new page to show the details of the selected movie
    // You can use the title parameter to fetch the movie details from your API or database

    // Example code to redirect to the details page:
    window.location.href = `./Product.html?id=${id}&type=movie`;

}



const urlParams = new URLSearchParams(window.location.search);
const searchTermhome = urlParams.get("search");

if (searchTermhome) {
    getMovies(searchURL + '&query=' + searchTermhome)
}


const form = document.getElementById('form');
const search = document.getElementById('search');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(searchURL + '&query=' + searchTerm)
    }
})

const searchIcon = document.querySelector('.search-icon');
  const searchInput = document.querySelector('#search');

  searchIcon.addEventListener('click', () => {
    searchInput.focus();
  });