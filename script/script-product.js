

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'api_key=f55104d0cb044a5ac6b66815a2732922';
const IMG_URL = 'https://image.tmdb.org/t/p/original';

const productdetails = document.getElementsByClassName("product-details-main")[0];

// Get the movie title from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const movieid = urlParams.get("id");
const type = urlParams.get("type");
console.log(type)
productdetails.innerHTML = "";


// Fetch the movie details from your API or database
fetch(
    `${BASE_URL}/${type}/${movieid}?${API_KEY}&language=en-US`
)
    .then((response) => response.json())
    .then((data) => {
        // Display the movie details on the page
        const {title ,name, overview, vote_average, backdrop_path } = data;

        const moviedetail = document.createElement("div");
        moviedetail.classList.add("product-main");
        moviedetail.innerHTML = `
    <div class="product-image">
            <img src="${IMG_URL + backdrop_path}" alt="">
        </div>
    <div class="product-details">
    <h2>${title ? title : name} - IMDB :  ${vote_average}</h2>
    <p>${overview}</p>
       
            </div>
           
            `;
        productdetails.appendChild(moviedetail);
    })
    .catch((error) => {
        console.error("Error fetching movie details:", error);
    });
