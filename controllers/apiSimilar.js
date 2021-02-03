require('dotenv').config();
const axios = require('axios');


// Retrieve data about similar movies to the specified movie
const handleSimilar = (req, res) => {
    const { id } = req.params

    axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.API_KEY}`)
        .then(response => res.send(response.data.results))
        .catch(err => res.send(err));
}
module.exports = {
    handleSimilar
}