


const IMG_URL = 'https://image.tmdb.org/t/p/original';

const productdetails = document.getElementsByClassName("product-details-main")[0];

// Get the movie title from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const movieid = urlParams.get("id");

productdetails.innerHTML = "";


// Fetch the movie details from your API or database
fetch(
    `https://api.themoviedb.org/3/movie/${movieid}?api_key=f55104d0cb044a5ac6b66815a2732922&language=en-US`
)
    .then((response) => response.json())
    .then((data) => {
        // Display the movie details on the page
        const { title, overview, vote_average, backdrop_path } = data;

        const moviedetail = document.createElement("div");
        moviedetail.classList.add("product-main");
        moviedetail.innerHTML = `
    <div class="product-image">
            <img src="${IMG_URL + backdrop_path}" alt="">
        </div>
    <div class="product-details">
    <h2>${title} - IMDB :  ${vote_average}</h2>
    <p>${overview}</p>
       
            </div>
           
            `;
        productdetails.appendChild(moviedetail);
    })
    .catch((error) => {
        console.error("Error fetching movie details:", error);
    });
