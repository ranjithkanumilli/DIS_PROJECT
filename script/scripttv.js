
const API_KEY = 'api_key=f55104d0cb044a5ac6b66815a2732922';

const BASE_URL = 'https://api.themoviedb.org/3';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const movies = document.getElementsByClassName("movies-page")[0];

const MOVIE_URL = BASE_URL + '/discover/tv?sort_by=popularity.desc&' + API_KEY + '&language=en-US';

const searchURL = BASE_URL + '/search/tv?' + API_KEY;
getMovies(MOVIE_URL);

function getMovies(url) {

  fetch(url).then(res => res.json()).then(data => {
    showMovies(data.results);
  })

}

const genres = [
  {
    "id": 10759,
    "name": "Action & Adventure"
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
    "id": 10762,
    "name": "Kids"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10763,
    "name": "News"
  },
  {
    "id": 10764,
    "name": "Reality"
  },
  {
    "id": 10765,
    "name": "Sci-Fi & Fantasy"
  },
  {
    "id": 10766,
    "name": "Soap"
  },
  {
    "id": 10767,
    "name": "Talk"
  },
  {
    "id": 10768,
    "name": "War & Politics"
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

    movies.appendChild(movieEl);
  })
}


function showMovieDetails(id) {
  // This function will open a new page to show the details of the selected movie
  // You can use the title parameter to fetch the movie details from your API or database

  // Example code to redirect to the details page:
  window.location.href = `./Product.html?id=${id}&type=tv`;

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