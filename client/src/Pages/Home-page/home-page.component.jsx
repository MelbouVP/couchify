import axios from 'axios';
import React, { useEffect } from 'react';
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'


import Carousel from '../../Components/Carousel/carousel.component'

import { selectMoviesTrendingData, selectMoviesPopularData } from '../../Redux/movies/movies.selectors';

import { changeFetchStatus, fetchTrendingMovies } from '../../Redux/movies/movies.actions'

// import './home-page.styles.scss';

const HomePage = ({ trendingMovies, fetchTrendingMovies, changeFetchStatus }) => {

    useEffect(() => {
        const fetchData = async() => {
            try {
                changeFetchStatus(true);
                console.log('fetching')
                const response = await axios('http://localhost:3001/api/trending')
    
                fetchTrendingMovies(response.data)
                        
            } catch (error) {
                console.log(error)
            } finally {
                changeFetchStatus(false);
            }
        }

        if(!trendingMovies.length){
            fetchData()
        }


    })


    

    return (
        <div>
            <h1>Trending movies</h1>
            <Carousel moviesData={trendingMovies}/>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    fetchTrendingMovies: data => dispatch(fetchTrendingMovies(data)),
    changeFetchStatus: bool => dispatch(changeFetchStatus(bool))
})

const mapStateToProps = createStructuredSelector({
    trendingMovies: selectMoviesTrendingData,
    popularMovies: selectMoviesPopularData
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)