require('dotenv').config();
const axios = require('axios');

// Retrieves data for all-time popular movies
const handlePopular = (req, res) => {
    // Since most popular movies of all time don't change often
    // fetch random page of popular movies in order to display different popular movies on front-end on each home-page visit
    const randomPopularPage = Math.floor(Math.random()*100)
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&sort_by=popularity.desc&page=${randomPopularPage}`)
        .then(response => res.send(response.data.results))
        .catch(err => res.send(err));
}
module.exports = {
    handlePopular
}