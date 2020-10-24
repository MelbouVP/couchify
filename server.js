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


//? Filter movies/ discover
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


//? Trending movies
app.get('/api/trending', (req, res) => {
    axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}`)
        .then(response => res.json(response.data.results))
        .catch(err => res.send(err));
})

//? Get specific movie
// Append search instead of doing multiple searcheds
// https://api.themoviedb.org/3/movie/157336?api_key={api_key}
// https://api.themoviedb.org/3/movie/157336/videos?api_key={api_key}
// https://api.themoviedb.org/3/movie/157336?api_key={api_key}&append_to_response=videos
// ttps://api.themoviedb.org/3/movie/157336?api_key={api_key}&append_to_response=videos,images
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



//? Sorting route
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


app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)

});

