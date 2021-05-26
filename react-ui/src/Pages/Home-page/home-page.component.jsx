import React, { useEffect } from 'react';
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import Carousel from '../../Components/Carousel/carousel.component'
import Spinner from '../../Components/Spinner/spinner.component';
import Banner from '../../Components/Banner/banner.component';
import MovieCard from '../../Components/Movie-card/movie-card.component';

import { selectMoviesTrendingData, selectMoviesPopularData } from '../../Redux/movies-data/movies.selectors';

import { requestHomePageData } from '../../Redux/movies-data/movies.actions'

import './home-page.styles.scss';

const HomePage = ({ trendingMovies, popularMovies, onRequestHomePageData }) => {

    // HomePage component is responsible for dispalying home-banner and popular/trending movie data
    // props = {
    //     trendingMovies, // data about trending movies (redux)
    //     popularMovies, // data about popular movies (redux)
    //     onRequestHomePageData // fetches popular and trending movie data (redux-action)
    // }

    useEffect(() => {
        const fetchData = () => {

            onRequestHomePageData()
        }

        if(!trendingMovies.length){
            fetchData()
        }


    })


    const popularMoviesItem = popularMovies ? 
        popularMovies.map( movieData => 
                <MovieCard key={movieData.id} movieData={movieData} />
            ) 
        :   
            null

    const trendingMoviesItem = trendingMovies ? 
        trendingMovies.map( movieData => 
                <MovieCard key={movieData.id} movieData={movieData} />
            ) 
        :   
            null


    return (
        <div className='page__container'>
            <Banner shapeDivider={true} >
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
                        (trendingMovies.length && popularMovies.length) ? 
                            <div>
                                <Carousel sectionName={'Popular movies'} >
                                    {
                                        popularMoviesItem
                                    }
                                </Carousel>
                                <Carousel sectionName={'Trending movies'} >
                                    {
                                        trendingMoviesItem
                                    }
                                </Carousel>
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
    onRequestHomePageData: () => dispatch(requestHomePageData())
})

const mapStateToProps = createStructuredSelector({
    trendingMovies: selectMoviesTrendingData,
    popularMovies: selectMoviesPopularData,
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(HomePage))