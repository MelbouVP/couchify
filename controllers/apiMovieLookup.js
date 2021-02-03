require('dotenv').config();
const axios = require('axios');


// Retrieves data for individual movie
const handleLookup = (req,res) => {
    const { id } = req.params
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&append_to_response=videos`)
        .then(response => {
            const { id, backdrop_path, genres, overview, poster_path, popularity, title, vote_average, vote_count, runtime, imdb_id, belong_to_collection, budget, homepage, videos, release_date } = response.data;

            const movieData = {
                id, 
                backdrop_path, 
                genre_ids: genres, 
                overview, 
                poster_path, 
                popularity, 
                title, 
                vote_average,
                vote_count,
                imdb_id,
                belong_to_collection,
                budget,
                homepage,
                runtime,
                videos,
                release_date
            }
            return res.json(movieData)
        })
        .catch(err => res.send(err));
}

module.exports = {
    handleLookup
}