import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useHistory } from 'react-router'
import { useLastLocation } from 'react-router-last-location';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'

import { addExtraDataToCurrentlyViewedMovie, setSimilarMoviesData, changeCurrentlyViewedMovie } from '../../Redux/movies-data/movies.actions'
import { selectMoviesCurrrentMovie, selectMoviesCurrrentMovieExtraData, selectMoviesCurrrentMovieSimilarData } from '../../Redux/movies-data/movies.selectors';

import BackButton from '../Go-back-btn/back-button.component';
import Banner from '../Banner/banner.component';
import Spinner from '../Spinner/spinner.component';
import ScrollToTop from '../ScrollToTop/scroll-to-top.component';
import Carousel from '../Carousel/carousel.component';
import CastCard from '../Cast-card/cast-card.component';
import MovieCard from '../Movie-card/movie-card.component';

import './movie-section.styles.scss';


const MovieSection = ({ currentMovie, extraData, setExtraData, similarMoviesData, setSimilarMoviesData, changeCurrentlyViewedMovie, ownProps }) => {


    const [showOverlay, setShowOverlay] = useState(false)
    const [movieCastData, setMovieCastData] = useState([])
    const [trailerData, setTrailerData] = useState(null)
    const [hasLoaded, setHasLoaded] = useState(false) 
    const [backdrop, setBackdropPath] = useState('url(https://image.tmdb.org/t/p/original/3pvIMjJps4uJr5NOmolY0MXvTYD.jpg)')
    const [genreNames, setGenreNames] = useState([])

    let history = useHistory();
    const lastLocation = useLastLocation();

    

    const sendToPreviousPage = () => {
        lastLocation === null ? history.push('/') : history.push(lastLocation.pathname)
        setHasLoaded(false)
        changeCurrentlyViewedMovie(null)
    }

    const showSimilarMovie = (e) => {
        if(e.target.value === 'Details'){
            setHasLoaded(false);
        } else {
            return
        }
    }

    useEffect(() => {

        const checkCurrentMovie = () => {
            console.log(currentMovie)

            if(currentMovie === null){
                fetchMovieData()
            } else {
                fetchExtraMovieData()
            }
        }

        const fetchMovieData = async () => {
            let movieId = parseInt(window.location.pathname.replace('/movie/', ''))

            console.log(movieId)
            try {
                let currentMovie = await axios(`http://localhost:3001/api/movie/${movieId}`)
                changeCurrentlyViewedMovie(currentMovie.data)
                // fetchExtraMovieData()
            } catch (error) {
                throw Error
            }

            
        }

        const fetchExtraMovieData = async() => {
            try {
                const responseAdditionalData = await axios(`http://localhost:3001/api/movie/${currentMovie.id}`)

                const responseSimilarMoviesData = await axios(`http://localhost:3001/api/similar/${currentMovie.id}`)
                const responseMovieCastData = await axios(`http://localhost:3001/api/credits/${currentMovie.id}`)

                setExtraData(responseAdditionalData.data)
                setSimilarMoviesData(responseSimilarMoviesData.data);
                setMovieCastData(responseMovieCastData.data)

                let genres = responseAdditionalData.data.genre_ids.map(data => data.name)
                setGenreNames(genres)

                if( responseAdditionalData.data.videos ){
                 setTrailerData(responseAdditionalData.data.videos.results[0].key)
                }

                if(currentMovie.backdrop_path){
                    setBackdropPath(`url(https://image.tmdb.org/t/p/w1280${currentMovie.backdrop_path}`)
                }


            } catch (error) {
                throw Error(error)
            } finally {
                setHasLoaded(true);
            }
        }
        
        checkCurrentMovie()

    },[currentMovie, setExtraData, setSimilarMoviesData, changeCurrentlyViewedMovie])

    const bannerStyle = {
        backgroundImage: backdrop
    }

    const genres = genreNames.map( (genre, index) => <div className='details__genres--name' key={index} >{genre}</div>)

    

    const cast = movieCastData.map( (cast) => <CastCard actorData={cast} key={cast.id} />)

    const similarMoviesItem = similarMoviesData ? 
            similarMoviesData.map( movieData => 
                <MovieCard key={movieData.id} movieData={movieData} />
            ) 
        :   
            null


    return (
        <div className='movie-section__container'>
            <ScrollToTop />
            {
                showOverlay ?
                    <div className='overlay' >
                        <div className="overlay__content">
                            {
                                trailerData  ?
                                    <div className='overlay__close-trailer'>
                                        <iframe title={currentMovie.name} className='overlay__responsive-iframe' width="860" height="500" src={`https://www.youtube.com/embed/${trailerData}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                        <div className="overlay__close-trailer--btn" onClick={() => setShowOverlay(false)}>

                                        </div>
                                    </div>
                                :
                                    <div className='overlay__close-trailer'>
                                        <img src="https://moviemaker.minitool.com/images/uploads/articles/2020/08/youtube-video-not-available/youtube-video-not-available-1.png" alt="No trailer available"/>
                                        <div className="overlay__close-trailer--btn" onClick={() => setShowOverlay(false)}>

                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                :
                    null
            }
            <div className='movie-section__back-btn'>
                <BackButton handleClick={sendToPreviousPage} />
            </div>
            {
                hasLoaded ?
                    <Banner bannerStyle={bannerStyle} >
                        <div className='movie-section__page'>
                            <div className='movie-section__content'>
                                <div className='content__image'>
                                    <div style={{position: 'relative'}} >
                                        <img 
                                            src={currentMovie.poster_path ? `https://image.tmdb.org/t/p/w500${currentMovie.poster_path}` : `https://mozitime.com/no-poster.png`} 
                                            alt={`${currentMovie.title} movie poster`}
                                        />
                                        <div className='content__show-trailer' onClick={ () => setShowOverlay(true)} >
                                            <div className="content__show-trailer--btn">
                                                <span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='content__details'>
                                    <h1 className="details__title">
                                        {currentMovie.title}
                                    </h1>
                                    <div className='details__short-info'>
                                        <div className='details__short-info--release-date'>{currentMovie.release_date.split('-')[0]}</div>
                                        <div className='details__short-info--runtime'>{`${Math.floor((extraData.runtime/60))}h ${extraData.runtime%60}m`}</div>
                                        <div className='details__short-info--rating'>{currentMovie.vote_average} / 10</div>
                                        <div className='details__short-info--votes'>{currentMovie.vote_count}</div>
                                    </div>
                                    <div className='details__genres'>
                                        <h4>Genres</h4>
                                            {
                                                genres
                                            }
                                    </div>
                                    <div className="details__summary">
                                        <h4>Summary</h4>
                                        <div className="details__summary--overview">
                                            {
                                                currentMovie.overview ? currentMovie.overview : 'No summary available'
                                            }
                                        </div>
                                    </div>
                                    <div className="details__cast">
                                        <h4>Cast</h4>
                                        <Carousel slideCount={movieCastData.length >= 6 ? 6 : 2} showDots={false}>
                                            {
                                                cast
                                            }
                                        </Carousel>
                                    </div>
                                </div>
                            </div>
                            {
                                similarMoviesData ? 
                                        <div onClick={ (e) => showSimilarMovie(e)} >
                                            <Carousel sectionName={'Similar movies'}>
                                                {
                                                    similarMoviesItem
                                                }
                                            </Carousel>
                                        </div>
                                    :
                                        <Spinner />
                            }
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
    currentMovie: selectMoviesCurrrentMovie,
    extraData: selectMoviesCurrrentMovieExtraData,
    similarMoviesData: selectMoviesCurrrentMovieSimilarData
})

const mapDispatchToProps = dispatch => ({
    changeCurrentlyViewedMovie: item => dispatch(changeCurrentlyViewedMovie(item)),
    setExtraData: (data) => dispatch(addExtraDataToCurrentlyViewedMovie(data)),
    setSimilarMoviesData: (data) => dispatch(setSimilarMoviesData(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(MovieSection));