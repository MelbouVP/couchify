import axios from 'axios';
import React, { useEffect } from 'react';
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import Navbar from '../../Components/Navbar/navbar.component';
import Carousel from '../../Components/Carousel/carousel.component'
import Spinner from '../../Components/Spinner/spinner.component';
import Banner from '../../Components/Banner/banner.component';

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

    const movieBannerInfo = popularMovies[0]

    return (
        <div className='page__container'>
            <Navbar />
            <Banner bannerImg={movieBannerInfo}>
                <div className='homepage__banner'>
                    <h1 className='homepage__banner--title'>
                        Couchify
                    </h1>
                    <p className='homepage__banner--sub-title'>Find your favourite movies and discover recent movie trends.
                    </p>
                    <div className='homepage__banner--button'>
                        <a href="#overview">Explore</a>
                    </div>
                </div>
            </Banner>
            <div className="homepage__container" id='overview' >
                <div className='homepage'>
                    {
                        trendingMovies.length ? 
                            <div>
                                <Carousel sectionName={'Trending movies'} moviesData={trendingMovies}/>
                                <Carousel sectionName={'Popular movies'} moviesData={popularMovies}/>
                            </div>
                        :
                            <Spinner />
                    }
                </div>

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