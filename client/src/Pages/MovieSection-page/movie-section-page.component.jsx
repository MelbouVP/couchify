import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router'
import { useLastLocation } from 'react-router-last-location';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'

import { requestMovieSectionData, changeCurrentlyViewedMovie } from '../../Redux/movies-data/movies.actions'
import { selectMoviesCurrrentMovieData, selectMoviesCurrrentMovieSimilarData, selectMoviesHasLoaded } from '../../Redux/movies-data/movies.selectors';

import BackButton from '../../Components/Go-back-btn/back-button.component';
import Banner from '../../Components/Banner/banner.component';
import Spinner from '../../Components/Spinner/spinner.component';
import ScrollToTop from '../../Components/ScrollToTop/scroll-to-top.component';
import Carousel from '../../Components/Carousel/carousel.component';
import CastCard from '../../Components/Cast-card/cast-card.component';
import MovieCard from '../../Components/Movie-card/movie-card.component';
import MustWatchIcon from '../../Components/Icon-components/must-watch-icon.component';
import FavouriteIcon from '../../Components/Icon-components/favourite-icon.component';

import './movie-section-page.styles.scss';

const MovieSectionPage = ({ currentMovie, similarMoviesData, onRequestMovieSectionData, hasSectionLoaded  }) => {

    // MovieSectionpage component is responsible for displaying data about individual movies and fetching additional data such as movie cast info

    // props = {
    //     currentMovie, // data about currently display movie (redux)
    //     similarMoviesData, // data about movies similar to currently displayed (redux)
    //     onRequestMovieSectionData, // fetching additional movie data (redux-action)
    //     hasSectionLoaded // control display of page (redux)
    // }


    // handles display of poster img, see cast card for similar documentation
    const [didPosterLoad, setPosterLoad] = React.useState(false);

    // overlay acts as a modal and handles display of movie trailer
    const [showOverlay, setShowOverlay] = useState(false)
    const [trailerData, setTrailerData] = useState(null)

    // backdrop is used as background img (display either default or related to movie)
    const [backdrop, setBackdropPath] = useState('url(https://image.tmdb.org/t/p/w1280/3pvIMjJps4uJr5NOmolY0MXvTYD.jpg)')

    let history = useHistory();
    const lastLocation = useLastLocation();

    const sendToPreviousPage = () => {
        lastLocation === null ? history.push('/') : history.push(lastLocation.pathname)
    }

    // resets state (react SPA doesnt rerender component completely and therefore component poster state isnt reset)
    const showSimilarMovie = (e) => {
        if(e.target.value === 'Details'){
            setPosterLoad(false);
        } else {
            return
        }
    }

    // Fetch data about movie to be displayed
    useEffect(() => {
        let movieId = parseInt(window.location.pathname.replace('/movie/', ''))
        onRequestMovieSectionData(movieId)

    },[onRequestMovieSectionData])


    // Handles case when javascript can't read non existant object property data (it is neccessary to wait for all of object data to load first)
    useEffect( () => {
        
        if(hasSectionLoaded){

            if(currentMovie.videos.results.length) {
                setTrailerData(currentMovie.videos.results[0].key)
            }

            if(currentMovie.backdrop_path) {
                setBackdropPath(`url(https://image.tmdb.org/t/p/w1280${currentMovie.backdrop_path}`)
            }

        }
    },[hasSectionLoaded, currentMovie])


    const bannerStyle = {
        backgroundImage: backdrop
    }

    const genres =  hasSectionLoaded ? 
            currentMovie.genre_ids.map( ({name, id}) => <div className='details__genres--name' key={id} >{name}</div>)
        :
            null

    const cast = hasSectionLoaded ? 
            currentMovie.cast.map( (cast) => <CastCard actorData={cast} key={cast.id} />) 
        : 
            null

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
                                        <iframe 
                                            title={currentMovie.name} className='overlay__responsive-iframe' 
                                            width="860" 
                                            height="500" 
                                            src={`https://www.youtube.com/embed/${trailerData}`} frameBorder="0" 
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
                                        >    
                                        </iframe>
                                        <div 
                                            className="overlay__close-trailer--btn" 
                                            onClick={() => setShowOverlay(false)}
                                        >
                                        </div>
                                    </div>
                                :
                                    <div className='overlay__close-trailer'>
                                        <img 
                                            src="https://moviemaker.minitool.com/images/uploads/articles/2020/08/youtube-video-not-available/youtube-video-not-available-1.png" 
                                            alt="No trailer available"
                                        />
                                        <div 
                                            className="overlay__close-trailer--btn" 
                                            onClick={() => setShowOverlay(false)}
                                        >
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
                hasSectionLoaded ?
                    <Banner bannerStyle={bannerStyle} >
                        <div className='movie-section__page'>
                            <div className='movie-section__content'>
                                {
                                    didPosterLoad ?
                                    <div className='content__image'>
                                        <div style={{position: 'relative'}} >
                                            <img 
                                                src={currentMovie.poster_path ? `https://image.tmdb.org/t/p/w500${currentMovie.poster_path}` : `https://mozitime.com/no-poster.png`} 
                                                alt={`${currentMovie.title} movie poster`}
                                            />
                                            <div 
                                            className='content__show-trailer' 
                                            onClick={ () => setShowOverlay(true)} 
                                            >
                                                <div className="content__show-trailer--btn">
                                                    <span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className='content__image'>
                                        <div className='content__image-spinner'>
                                            <Spinner />
                                            <img 
                                                style={{visibility: 'hidden'}}  
                                                src={currentMovie.poster_path ? `https://image.tmdb.org/t/p/w500${currentMovie.poster_path}` : `https://mozitime.com/no-poster.png`} 
                                                onLoad={() => setPosterLoad(true)}
                                                alt='Spinner'
                                            />
                                        </div>
                                    </div>
                                }
                                <div className='content__details'>
                                    <div className='details__head'>
                                        <h1 className="details__title">
                                            {
                                                currentMovie.title
                                            }
                                        </h1>
                                        <div className='details__interaction-icons'>
                                            <FavouriteIcon 
                                                currentMovie={currentMovie}
                                            />
                                            <MustWatchIcon 
                                                currentMovie={currentMovie}
                                            />
                                        </div>
                                    </div>
                                    <div className='details__short-info'>
                                        <div className='details__short-info--release-date'>
                                            {
                                                currentMovie.release_date.split('-')[0]
                                            }
                                        </div>
                                        <div className='details__short-info--runtime'>
                                            {
                                                `${Math.floor((currentMovie.runtime/60))}h ${currentMovie.runtime%60}m`
                                            }
                                        </div>
                                        <div className='details__short-info--rating'>
                                            {currentMovie.vote_average} / 10
                                        </div>
                                        <div className='details__short-info--votes'>
                                            {
                                                currentMovie.vote_count
                                            }
                                        </div>
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
                                        <Carousel 
                                            slideCount={currentMovie.cast.length >= 5 ? 5 : 2} 
                                            showDots={false}
                                        >
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
    currentMovie: selectMoviesCurrrentMovieData,
    similarMoviesData: selectMoviesCurrrentMovieSimilarData,
    hasSectionLoaded: selectMoviesHasLoaded
})

const mapDispatchToProps = (dispatch) => ({
    changeCurrentlyViewedMovie: (item) => dispatch(changeCurrentlyViewedMovie(item)),
    onRequestMovieSectionData: (movieId) => dispatch(requestMovieSectionData(movieId))
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(MovieSectionPage));