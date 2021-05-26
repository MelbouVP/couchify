# Couchify 

Couchify is an application that can be used to find movies to watch, explore trending and most popular movies. Functionality is supported by The Movie Database (TMDB) API.

<img src="https://s3.gifyu.com/images/home-page_banner.png" />

**Application live-demo can be seen at @**

## Table of contents 
* [Introduction](#introduction)
* [Technologies](#technologies)
* [Features](#features)
* [Project status](#project-status)

## Introduction

Main goal of this project was expand knoweledge of React.js. 

Couchify is an application where users can find movies to watch through exploration of currently trending movies or exploring most popular movies of all time. Besides that, the user can also manually search movies by name or use filtering functionality to find movies that fit their movie parameters such as release year, popularity, vote count, vote averages and prefered genres.

When user is viewing a particular movie, he/she is also given a list of similar movies.

Each movie has information dispalyed about it:
  * Release year
  * Rating 
  * Vote count 
  * Running time
  * Plot summary 
  * Actors involved
  * Genres
  * Movie trailer
  * Similar movies

Favourite movie or must-watch movie lists can be made to build a list of movies that the user would like to see. Lists are persisted into the database.

Besides core functionality, this application has a database that allows for user login/signup. User profile page tracks all movies that user has included in either favourite/must-watch movies list.

## Technologies

* **React.js** (v. 17.0.0) - front-end
  * **Redux** (v 4.0.5) - application state management
  * **Redux-thunk** (v 2.3.0) - asynchronous data fetching
  * **Reselect** (v 4.0.0) - state data memoization
  * **React router** (v 5.2.0) - front-end routing
  * **React slick** (v 0.27.14) - image carousel
  * **React tab** (v 3.1.2) - tabs for movie lists
  * **React toastify** (v 6.2.0) - user notification
* **Node.js** (v. 13.12.0) - back-end
  * **PostgreSQL** (node-postgres v. 8.5.1) - database 
  * **Express** (v. 4.17.1) - back-end server
  * **Knex.js** (v. 0.21.15) - ORM query builder
  * **Joi** (v 17.3.0) - validation
* **Utility tech** - bcrypt, helmet, axios, body-parser, cors, dotenv, nodemon, react-particles-js

## Features

**1. Trending and most popular movies exploration**

<p align="center">
  <img src="/readme_assets/movies exploration.gifgit push heroku main" width="805" height="341"/>
</p>
<br/>
<br/>

**2. Exploration of individual movie**
<br/>
<br/>
<p align="center">
  <img src="/readme_assets/exploration of individual movie.gif" width="805" height="341"/>
</p>
<br/>
<br/>

**3. Movie search**
<br/>
<br/>
<p align="center">
  <img src="/readme_assets/movie search.gif" width="805" height="341"/>
</p>
<br/>
<br/>

**4. Movie filtering**
<br/>
<br/>
<p align="center">
  <img src="/readme_assets/movie  filter.gif" width="805" height="341"/>
</p>

**4. Adding/removing movie to favourite/must-watch movies list.**
<br/>
<br/>
<p align="center">
  <img src="https://s3.gifyu.com/images/movie-lists.gif" width="805" height="341"/>
</p>

## Project status

**Project is finished.**

In the next project would prefer to separate business logic and view layer more by implementation of such library as Redux-saga.
