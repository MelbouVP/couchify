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


//? Search movie by name
app.post('/api/find', (req,res) => {
    const searchValue = req.body.searchValue
    let encodedSearch = encodeURIComponent(searchValue)
    console.log('Find path: ', searchValue)

    axios.get(`https://api.themoviedb.org/3/search/movie?query=${encodedSearch}&api_key=${process.env.API_KEY}&page=1`)
        .then( ({ data: { page, total_pages, results}}) => {
            const modifiedResponse = {
                searchValue: searchValue,
                page: page,
                total_pages: total_pages,
                results : results
            }
            res.json(modifiedResponse)
        })
        .catch(err => res.send(err));
})

app.post('/api/find/next', (req,res) => {
    const searchValue = req.body.searchValue
    const pageNum = req.body.pageNum + 1
    let encodedSearch = encodeURIComponent(searchValue)
    console.log('Find/next path: ', searchValue, pageNum)
    

    axios.get(`https://api.themoviedb.org/3/search/movie?query=${encodedSearch}&api_key=${process.env.API_KEY}&page=${pageNum}`)
        .then( ({ data: { page, total_pages, results}}) => {
            const modifiedResponse = {
                searchValue: searchValue,
                page: page,
                total_pages: total_pages,
                results : results
            }
            res.json(modifiedResponse)
        })
        .catch(err => res.send(err));
})

app.post('/api/find/prev', (req,res) => {
    const searchValue = req.body.searchValue
    const pageNum = req.body.pageNum - 1
    let encodedSearch = encodeURIComponent(searchValue)
    console.log('Find/next path: ', searchValue, pageNum)
    

    axios.get(`https://api.themoviedb.org/3/search/movie?query=${encodedSearch}&api_key=${process.env.API_KEY}&page=${pageNum}`)
        .then( ({ data: { page, total_pages, results}}) => {
            const modifiedResponse = {
                searchValue: searchValue,
                page: page,
                total_pages: total_pages,
                results : results
            }
            res.json(modifiedResponse)
        })
        .catch(err => res.send(err));
})

//? Filtering route
app.post('/api/filter', (req, res) => {
    const { sortBy, releaseDate, genres } = req.body

    const currentYear = parseInt(new Date().toISOString().replace('T', ' ').substr(0, 4))
    let movieGenre = {
        Action: 28,
        Adventure: 12,
        Animation: 16,
        Comedy: 35,
        Crime: 80,
        Documentary: 99,
        Drama: 18,
        Family: 10751,
        Fantasy: 14,
        History: 36,
        Horror: 27,
        Music: 10402,
        Mystery: 9648,
        Romance: 10749,
        Science_Fiction: 878,
        TV_Movie: 10770,
        Thriller: 53,
        War: 10752,
        Western: 37
    }


    let genreID = []

    for(key in genres){
        if(genres[key] === true){
            genreID.push(movieGenre[key])
        }
    }

    let minReleaseDate;
    let maxReleaseDate;

    if(releaseDate[0] === 2020){
        minReleaseDate = '2020-01-01'
    } else {
        minReleaseDate = `${releaseDate[0]}-01-01`
    }
    
    if(releaseDate[1] === currentYear){
        maxReleaseDate = new Date().toISOString().replace('T', ' ').substr(0, 10)
    } else {
        maxReleaseDate = `${releaseDate[1]}-01-01`
    }

    
    axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&sort_by=${sortBy}&primary_release_date.gte=${minReleaseDate}&primary_release_date.lte=${maxReleaseDate}&with_genres=${genreID}`
        )
        .then( ({ data: { page, total_pages, results}}) => {
            const modifiedResponse = {
                sort_by: sortBy,
                primary_release_date: [minReleaseDate, maxReleaseDate],
                with_genres: genreID,
                page: page,
                total_pages: total_pages,
                results : results
            }
            // console.log(modifiedResponse)
            res.json(modifiedResponse)
        })
        .catch(err => res.send(err));

    
})


app.post('/api/filter/next', (req,res) => {
    const { sortBy, releaseDate, genres} = req.body
    let { pageNum } = req.body
    const [ minReleaseDate, maxReleaseDate ] = releaseDate
    
    pageNum++

    axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&sort_by=${sortBy}&primary_release_date.gte=${minReleaseDate}&primary_release_date.lte=${maxReleaseDate}&with_genres=${[...genres]}&page=${pageNum}`
        )
        .then( ({ data: { page, total_pages, results}}) => {
            const modifiedResponse = {
                sort_by: sortBy,
                primary_release_date: [minReleaseDate, maxReleaseDate],
                with_genres: genres,
                page: page,
                total_pages: total_pages,
                results : results
            }
            res.json(modifiedResponse)
        })
        .catch(err => res.send(err));
})

app.post('/api/filter/prev', (req,res) => {
    const { sortBy, releaseDate, genres} = req.body
    let { pageNum } = req.body
    const [ minReleaseDate, maxReleaseDate ] = releaseDate
    
    pageNum--

    axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&sort_by=${sortBy}&primary_release_date.gte=${minReleaseDate}&primary_release_date.lte=${maxReleaseDate}&with_genres=${[...genres]}&page=${pageNum}`
        )
        .then( ({ data: { page, total_pages, results}}) => {
            const modifiedResponse = {
                sort_by: sortBy,
                primary_release_date: [minReleaseDate, maxReleaseDate],
                with_genres: genres,
                page: page,
                total_pages: total_pages,
                results : results
            }
            res.json(modifiedResponse)
        })
        .catch(err => res.send(err));
})


//? Trending movies
app.get('/api/trending', (req, res) => {
    axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}`)
        .then(response => res.json(response.data.results))
        .catch(err => res.send(err));
})

//? Popular movies
app.get('/api/popular', (req, res) => {


    const randomPopularPage = Math.floor(Math.random()*100)
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&sort_by=popularity.desc&page=${randomPopularPage}`)
        .then(response => res.send(response.data.results))
        .catch(err => res.send(err));

})

//? Get specific movie
app.get('/api/movie/:id', (req,res) => {
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
})


//? Get reccomendations
app.get('/api/recommendation/:id', (req, res) => {

    const { id } = req.params
    axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.API_KEY}`)
        .then(response => res.send(response.data.results))
        .catch(err => res.send(err));
})

//? Get similar
app.get('/api/similar/:id', (req, res) => {
    const { id } = req.params
    console.log(id)
    axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.API_KEY}`)
        .then(response => res.send(response.data.results))
        .catch(err => res.send(err));
})

//? Get movie cast
app.get('/api/credits/:id', (req, res) => {
    const { id } = req.params
    axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}`)
        .then(response => {


            const castData = response.data.cast.map( ({ id, name, profile_path }) => {

                return { id, actorName: name, profile_path}

            })

            // return res.send(castData)
            return castData

        })
        .then( async data => {

            let castData = await Promise.all(data.map( async (actor) => {

                let fullData = await axios.get(`https://api.themoviedb.org/3/person/${actor.id}?api_key=${process.env.API_KEY}`)
                    .then(response => {
                        actor.imdb_id  = response.data.imdb_id
                        return actor
                    })
                    .catch(error => console.log(error.msg))

                // console.log(fullData)
                return fullData
            }))

            // console.log(castData)
            res.send(castData)
        })
        .catch(err => res.send(err));
})

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)

});

