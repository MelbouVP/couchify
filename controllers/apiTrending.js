require('dotenv').config();
const axios = require('axios');


// retrieves data about currently trending movies( time window 2 weeks)
const handleTrending = (req, res) => {
    axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}`)
        .then(response => res.json(response.data.results))
        .catch(err => res.send(err));
}
module.exports = {
    handleTrending
}