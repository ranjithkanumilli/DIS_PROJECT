// top-rated-movies-chart.js

const API_KEY = 'api_key=f55104d0cb044a5ac6b66815a2732922';

const BASE_URL = 'https://api.themoviedb.org/3';

const TOP_Grossing = BASE_URL + '/discover/movie?sort_by=revenue.desc&' + API_KEY;

const TRENDING_MOVIES_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const GENRES_URL = BASE_URL + '/genre/movie/list?' + API_KEY;
const POPULAR_URL = BASE_URL + '/movie/top_rated?' + API_KEY;

fetch(TRENDING_MOVIES_URL)
    .then(response => response.json())
    .then(data => {
        const movieTitles = data.results.map(movie => movie.title);
        const movieRatings = data.results.map(movie => movie.vote_average);

        const chartData = {
            labels: movieTitles,
            datasets: [
                {
                    label: 'Top Rated Movies',
                    backgroundColor: '#40513b',
                    data: movieRatings,
                },
            ],
        };

        const chartOptions = {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        };

        const ctx = document.getElementById('top-rated-movies-chart').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: chartOptions,
        });
    });


// highest-grossing-movies-chart.js


fetch(TOP_Grossing)
    .then(response => response.json())
    .then(data => {
        const movieIds = data.results.map(movie => movie.id);
        movieIds.shift();
        const promises = movieIds.map(id => {
            const endpoint = BASE_URL + `/movie/${id}?` + API_KEY;

            return fetch(endpoint).then(response => response.json());
        });

        Promise.all(promises)
            .then(data => {
                const movieTitles = data.map(movie => movie.title);
                const movieRevenues = data.map(movie => movie.revenue);

                const chartData = {
                    labels: movieTitles,
                    datasets: [
                        {
                            label: 'Highest Grossing Movies',
                            backgroundColor: '#40513b',
                            data: movieRevenues,
                        },
                    ],
                };

                const chartOptions = {
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                },
                            },
                        ],
                    },
                };

                const ctx = document.getElementById('highest-grossing-movies-chart').getContext('2d');
                const chart = new Chart(ctx, {
                    type: 'bar',
                    data: chartData,
                    options: chartOptions,
                });
            });
    });








fetch(GENRES_URL)
    .then(response => response.json())
    .then(data => {
        // Process the data and create the pie chart
        const genreData = data.genres.map(genre => {
            return {
                label: genre.name,
                value: Math.floor(Math.random() * 100) + 1 // Generate a random value between 1 and 100
            };
        });

        createPieChart(genreData);
    })
    .catch(error => console.error(error));

    

// Function to create the pie chart
function createPieChart(data) {
    const labels = data.map(genre => genre.label);
    const values = data.map(genre => genre.value);

    const ctx = document.getElementById('pie-chart').getContext('2d');
    const pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Popular Movie Genres'
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        const dataset = data.datasets[tooltipItem.datasetIndex];
                        const total = dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue);
                        const currentValue = dataset.data[tooltipItem.index];
                        const percentage = Math.floor(((currentValue / total) * 100) + 0.5);

                        return `${dataset.labels[tooltipItem.index]}: ${percentage}%`;
                    }
                }
            }
        }
    });
}





