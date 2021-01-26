require('dotenv').config();
const bodyParser= require('body-parser');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const pg = require('pg')
const bcrypt = require('bcryptjs');
const knex = require('knex')

// Controllers

 // api controllers
const search = require('./controllers/apiSearch');
const filter = require('./controllers/apiFilter');
const movieLookup = require('./controllers/apiMovieLookup');
const trending = require('./controllers/apiTrending');
const popular = require('./controllers/apiPopular');
const recommendation = require('./controllers/apiRecommendations');
const similar = require('./controllers/apiSimilar');
const credits = require('./controllers/apiCredits');

 // database controllers
const userData = require('./controllers/dbUserData');


// Server Setup
const app = express();
const PORT = process.env.port || 3001;

// Connect to database

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : process.env.PG_PASS,
        database : 'couchify'
    },
});

// Middlewares
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

// ROUTES

//? TMDB API fetch - Get searched movies based on user search input value
app.post('/api/find', (req, res) => search.handleSearch(req, res))

app.post('/api/find/prev', (req,res) => search.handleSearch(req, res, undefined, true))

app.post('/api/find/next', (req,res) => search.handleSearch(req, res, true, undefined))

//? TMDB API fetch - Get filtered movies based on user filter input
app.post('/api/filter', (req, res) => filter.handleFilter(req, res))

app.post('/api/filter/next', (req,res) => filter.handleFilter(req, res, undefined, true))

app.post('/api/filter/prev', (req,res) => filter.handleFilter(req, res, true, undefined))

//? TMDB API fetch - Get trending movies
app.get('/api/trending', (req, res) => trending.handleTrending(req, res))

//? TMDB API fetch - Get popular movies
app.get('/api/popular', (req, res) => popular.handlePopular(req, res))

//? TMDB API fetch - Get specific movie
app.get('/api/movie/:id', (req,res) => movieLookup.handleLookup( req, res))

//? TMDB API fetch - Get recomendations
app.get('/api/recommendation/:id', (req, res) => recommendation.handleRecommendations(req, res))

//? TMDB API fetch - Get similar
app.get('/api/similar/:id', (req, res) => similar.handleSimilar(req, res))

//? TMDB API fetch - Get movie cast
app.get('/api/credits/:id', (req, res) => credits.handleCast(req, res))

//? DB post - Register new user
app.post('/api/register', (req,res) => userData.handleRegister(req, res, db, bcrypt))

//? DB post - Login existing user
app.post('/api/login', (req, res) => userData.handleLogin(req, res, db, bcrypt))

//? DB post - Change user's favourite movies
app.post('/api/favourites', (req, res) => userData.handleFavourite(req, res, db))

//? DB post - Change user's must-watch movies
app.post('/api/must-watch', (req, res) => userData.handleMustWatch(req, res, db))

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)

});

