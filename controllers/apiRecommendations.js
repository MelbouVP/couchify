require('dotenv').config();
const axios = require('axios');

const handleRecommendations = (req, res) => {
    const { id } = req.params
    axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.API_KEY}`)
        .then(response => res.send(response.data.results))
        .catch(err => res.send(err));
}
module.exports = {
    handleRecommendations
}