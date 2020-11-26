import React, { useEffect } from 'react';
import axios from 'axios';

import { useHistory } from 'react-router'
import { useLastLocation } from 'react-router-last-location';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'

import { selectMoviesCurrentlyViewedMovie } from '../../Redux/movies-data/movies.selectors';

import BackButton from '../Go-back-btn/back-button.component';
import Banner from '../Banner/banner.component';
import Spinner from '../Spinner/spinner.component';
import ScrollToTop from '../ScrollToTop/scroll-to-top.component';

import './movie-section.styles.scss';
import { useState } from 'react';

const MovieSection = ({ currentMovie }) => {
    console.log('movie section rendered')
    console.log(currentMovie);

    const [data, setData] = useState()

    let history = useHistory();
    const lastLocation = useLastLocation();

    const sendToPreviousPage = () => {
        history.push(lastLocation)
    }

    
    useEffect(() => {
        const fetchMovieData = async() => {
            try {
                const response = await axios(`http://localhost:3001/api/movie/${currentMovie.id}`)
                setData(response.data);
            } catch (error) {
                console.log(error)
            }
        }

        if(!data){
            fetchMovieData()
        }
    })


    const bannerStyle = {
        backgroundImage: `url('https://image.tmdb.org/t/p/w1280${currentMovie.backdrop_path}')`
    }
    
    console.log(data)

    return (
        <div className='movie-section__container'>
            <ScrollToTop />
            <div className='movie-section__back-btn'>
                <BackButton handleClick={sendToPreviousPage} />
            </div>
            {
                data ?
                    <Banner bannerStyle={bannerStyle} >
                        <div className='movie-section__page'>
                            <div className='movie-section__content'>
                                <div className='content__image'>
                                    <img 
                                        // style={style}  
                                        src={currentMovie.poster_path ? `https://image.tmdb.org/t/p/w500${currentMovie.poster_path}` : `https://mozitime.com/no-poster.png`} 
                                        alt={`${currentMovie.title} movie poster`}
                                    />
                                </div>
                                <div className='content__details'>
                                    <h1 className="details__title">
                                        {currentMovie.title}
                                    </h1>
                                    <div className='details__short-info'>
                                        <div className='details__short-info--release-date'>{currentMovie.release_date.split('-')[0]}</div>
                                        <div className='details__short-info--runtime'>{`${Math.floor((data.runtime/60))}h ${data.runtime%60}m`}</div>
                                        <div className='details__short-info--rating'>{currentMovie.vote_average} / 10</div>
                                        {/* <div className='details__short-info--votes'>{currentMovie.vote_count}</div> */}
                                    </div>
                                    <div className="details__summary">
                                        {currentMovie.overview}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Banner>
                :
                    <div className="movie-section__page loading">
                        <Spinner />
                    </div>
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentMovie: selectMoviesCurrentlyViewedMovie
})

export default connect(mapStateToProps)(React.memo(MovieSection));