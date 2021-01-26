require('dotenv').config();
const axios = require('axios');

const handlePopular = (req, res) => {
    const randomPopularPage = Math.floor(Math.random()*100)
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&sort_by=popularity.desc&page=${randomPopularPage}`)
        .then(response => res.send(response.data.results))
        .catch(err => res.send(err));
}
module.exports = {
    handlePopular
}