

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'api_key=f55104d0cb044a5ac6b66815a2732922';
const IMG_URL = 'https://image.tmdb.org/t/p/original';

const productdetails = document.getElementsByClassName("product-details-main")[0];
const actionButton = document.getElementsByClassName("action-buttons")[0];

// Get the movie title from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const movieid = urlParams.get("id");
const type = urlParams.get("type");
productdetails.innerHTML = "";
actionButton.innerHTML = "";

// Fetch the movie details from your API or database
fetch(
    `${BASE_URL}/${type}/${movieid}?${API_KEY}&language=en-US&append_to_response=videos`
)
    .then((response) => response.json())
    .then((data) => {
        const youtubeKey = data.videos.results[0].key;
        // Construct YouTube link
        const youtubeLink = `https://www.youtube.com/watch?v=${youtubeKey}`;

        // Display the movie details on the page
        const { title, name, overview, vote_average, backdrop_path } = data;

        const moviedetail = document.createElement("div");
        moviedetail.classList.add("product-main");
        moviedetail.innerHTML = `
        <div class="product-image">
        <img src="${IMG_URL + backdrop_path}" alt="">
    </div>
    <div class="product-details">
        <h2>${title ? title : name} - IMDB : ${vote_average}</h2>
        <p>${overview}</p>
    
    </div>
            `;
        productdetails.appendChild(moviedetail);


        const actionlink = document.createElement("div");
        actionlink.classList.add("link");
        actionlink.innerHTML = ` 
        <button><a target="_blank" href = ${youtubeLink}>Watch Now</a></button>
        `
        actionButton.appendChild(actionlink)

    })
    .catch((error) => {
        console.error("Error fetching movie details:", error);
    });


const searchURL = BASE_URL + '/search/movie?' + API_KEY;
const form = document.getElementById('form');
const search = document.getElementById('search');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;

    if (searchTerm) {

        window.location.href = `../Pages/moviesPage.html?search=${searchTerm}`;
        // getTrendingMovies(searchURL + '&query=' + searchTerm)
    }
})