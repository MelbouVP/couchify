require('dotenv').config();
const axios = require('axios');
const bodyParser= require('body-parser');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');


// Server Setup
const app = express();
const PORT = process.env.port || 3001;


// Middlewares
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());


// ROUTES
app.get('/', (req, res) => {
    res.json("Hello visitor")
})


// Filter movies/ discover
app.get('/api/discover', async (req,res) => {
    try {
        // const resp = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)

        const resp = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&primary_release_date.gte=2019-09-15&primary_release_date.lte=2020-10-15`);
        
        const result = await resp.data.results
        const movies = await result.map(( {id, title, overview, poster_path, popularity, vote_count, vote_average, genre_ids } ) => {
            const movieInfo = {
                id,
                title,
                overview,
                poster_path,
                popularity,
                vote_count,
                vote_average,
                genre_ids
            }
            return movieInfo
        })
        return res.json(movies)
    } catch (error){
        console.log(error)
        res.sendStatus(500).send(error)
    }

})


// Search movie by name
app.post('/api/find', (req,res) => {
    const searchValue = req.body.searchValue
    console.log(searchValue)

    axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchValue}&api_key=${process.env.API_KEY}&language=en-US`)
        .then(response => res.json(response.data.results))
        .catch(err => res.send(err));
})

// Trending movies
app.get('/api/trending', (req, res) => {
    axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}`)
        .then(response => res.json(response.data.results))
        .catch(err => res.send(err));
})

// Get specific movie
app.get('/api/movie/:id', (req,res) => {
    const { id } = req.params
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US`)
        .then(response => {
            const { id, backdrop_path, poster_path, genres, original_title, popularity, overview, video, vote_average, vote_count, runtime } = response.data;
            const movieData = {
                id,
                backdrop_path,
                poster_path,
                genres,
                original_title,
                popularity,
                overview,
                video,
                vote_average,
                vote_count,
                runtime
            }
            return res.json(movieData)
        })
        .catch(err => res.send(err));
})


app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)

});

