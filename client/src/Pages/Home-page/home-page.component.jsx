import axios from 'axios';
import React, { useEffect } from 'react';
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'


import Carousel from '../../Components/Carousel/carousel.component'
import Spinner from '../../Components/Spinner/spinner.component';

import { selectMoviesTrendingData, selectMoviesPopularData } from '../../Redux/movies-data/movies.selectors';

import { changeFetchStatus, fetchTrendingMovies, fetchPopularMovies } from '../../Redux/movies-data/movies.actions'

import './home-page.styles.scss';

const HomePage = ({ trendingMovies, popularMovies, fetchTrendingMovies, changeFetchStatus, fetchPopularMovies }) => {

    useEffect(() => {
        const fetchData = async() => {
            try {
                changeFetchStatus(true);
                console.log('fetching')
                const trending = await axios('http://localhost:3001/api/trending')
                const popular = await axios('http://localhost:3001/api/popular')
    
                fetchTrendingMovies(trending.data)
                fetchPopularMovies(popular.data)
                        
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
        <div className="homepage__container">
            <div className='homepage'>
                {/* <Carousel sectionName={'Trending movies'} moviesData={trendingMovies}/>
                <Carousel sectionName={'Popular movies'} moviesData={popularMovies}/> */}
                {
                    trendingMovies.length ? 
                        <div>
                            <Carousel sectionName={'Trending movies'} moviesData={trendingMovies}/>
                            <Carousel sectionName={'Trending movies'} moviesData={popularMovies}/>
                        </div>
                    :
                        <Spinner />
                }
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    fetchTrendingMovies: data => dispatch(fetchTrendingMovies(data)),
    fetchPopularMovies: data => dispatch(fetchPopularMovies(data)),
    changeFetchStatus: bool => dispatch(changeFetchStatus(bool))
})

const mapStateToProps = createStructuredSelector({
    trendingMovies: selectMoviesTrendingData,
    popularMovies: selectMoviesPopularData
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)