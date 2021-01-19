import React, { useEffect, useState, useRef} from 'react';
import axios from 'axios';

import { useHistory } from 'react-router'
import { useLastLocation } from 'react-router-last-location';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { toast } from 'react-toastify';

import { addExtraDataToCurrentlyViewedMovie, setSimilarMoviesData, changeCurrentlyViewedMovie } from '../../Redux/movies-data/movies.actions'
import { selectMoviesCurrrentMovie, selectMoviesCurrrentMovieExtraData, selectMoviesCurrrentMovieSimilarData } from '../../Redux/movies-data/movies.selectors';

import { setFavouriteMovie, removeFavouriteMovie, setMustWatchMovie, removeMustWatchMovie  } from '../../Redux/user-data/user.actions';
import { selectUserIsAuthenticated, selectUserFavourites, selectUserMustWatch, selectUserID } from '../../Redux/user-data/user.selectors';

import BackButton from '../../Components/Go-back-btn/back-button.component';
import Banner from '../../Components/Banner/banner.component';
import Spinner from '../../Components/Spinner/spinner.component';
import ScrollToTop from '../../Components/ScrollToTop/scroll-to-top.component';
import Carousel from '../../Components/Carousel/carousel.component';
import CastCard from '../../Components/Cast-card/cast-card.component';
import MovieCard from '../../Components/Movie-card/movie-card.component';

import './movie-section-page.styles.scss';


const MovieSection = ({ currentMovie, extraData, setExtraData, similarMoviesData, isAuthenticated, setSimilarMoviesData, changeCurrentlyViewedMovie, setFavouriteMovie, removeFavouriteMovie, favourites, setMustWatchMovie,  removeMustWatchMovie, mustWatch, userID }) => {

    const [didPosterLoad, setPosterLoad] = React.useState(false);
    const [showOverlay, setShowOverlay] = useState(false)
    const [movieCastData, setMovieCastData] = useState([])
    const [trailerData, setTrailerData] = useState(null)
    const [hasSectionLoaded, setHasSectionLoaded] = useState(false) 
    const [backdrop, setBackdropPath] = useState('url(https://image.tmdb.org/t/p/original/3pvIMjJps4uJr5NOmolY0MXvTYD.jpg)')
    const [genreNames, setGenreNames] = useState([])
    const [isFavourite, setIsFavourite] = useState(false)
    const [isMustWatch, setIsMustWatch] = useState(false)


    let history = useHistory();
    const lastLocation = useLastLocation();

    const isInitialMount = useRef(true);

    

    const sendToPreviousPage = () => {
        lastLocation === null ? history.push('/') : history.push(lastLocation.pathname)
        setHasSectionLoaded(false)
        changeCurrentlyViewedMovie(null)
    }

    const showSimilarMovie = (e) => {
        if(e.target.value === 'Details'){
            setHasSectionLoaded(false);
            setIsFavourite(false);
            setIsMustWatch(false);
            setPosterLoad(false);
        } else {
            return
        }
    }

    useEffect(() => {

        let movieId = parseInt(window.location.pathname.replace('/movie/', ''))

        const checkCurrentMovie = () => {

            if(currentMovie === null){
                fetchMovieData()
            } else if( extraData === null) {
                fetchExtraMovieData()
            } else if (currentMovie.id !== movieId) {
                fetchMovieData()
            }
        }

        const fetchMovieData = async () => {

            console.log(movieId)
            try {
                let currentMovie = await axios(`http://localhost:3001/api/movie/${movieId}`)
                changeCurrentlyViewedMovie(currentMovie.data)
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

                if( responseAdditionalData.data.videos.results.length ){
                 setTrailerData(responseAdditionalData.data.videos.results[0].key)
                }

                if(currentMovie.backdrop_path){
                    setBackdropPath(`url(https://image.tmdb.org/t/p/w1280${currentMovie.backdrop_path}`)
                }


            } catch (error) {
                throw Error(error)
            } finally {
                setHasSectionLoaded(true);
            }
        }
        
        checkCurrentMovie()

    },[currentMovie, extraData, setExtraData, setSimilarMoviesData, changeCurrentlyViewedMovie])

    useEffect (() => {
            favourites.forEach( movie => {
                    
                if(currentMovie) {
                    if(movie.id === currentMovie.id) {
                        setIsFavourite(true)
                    }
                }
            })

            mustWatch.forEach( movie => {
                
                if(currentMovie) {
                    if(movie.id === currentMovie.id) {
                        setIsMustWatch(true)
                    }
                }
            })
    })


    useEffect( () => {

        if(isInitialMount.current) {
            isInitialMount.current = false
        } else {
            axios.post('http://localhost:3001/api/favourites', { id: userID, data: favourites })
                .then( response => undefined)
                .catch(error => toast.error('Hmm. something went wrong.', {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }))
        }

    }, [userID, favourites])

    useEffect( () => {

        if(isInitialMount.current) {
            isInitialMount.current = false
        } else {
            axios.post('http://localhost:3001/api/must-watch', { id: userID, data: mustWatch })
                .then( response => undefined)
                .catch(error => toast.error('Hmm. something went wrong.', {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }))
        }

    }, [userID, mustWatch])


    const handleFavourite = (e) => {

        if(!isFavourite){

            setIsFavourite(true)

            let favouriteMovieData = {
                id: currentMovie.id,
                title: currentMovie.title,
                releaseDate: currentMovie.release_date,
                posterPath: currentMovie.poster_path,
                voteAverage: currentMovie.vote_average,
                voteCount: currentMovie.vote_count,
                imdbID: extraData.imdb_id,
                videoKey: extraData.videos.results.length ? extraData.videos.results[0].key : null,
                genre: extraData.genre_ids.map( genreID => genreID.name)
            }
    
            setFavouriteMovie(favouriteMovieData)

            toast.info('❤️ Added to favourites!', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        } else {
            setIsFavourite(false)

            removeFavouriteMovie(currentMovie.id)


            toast.dark('💔 Removed from favourites!', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    const handleMustWatch = (e) => {
        if(!isMustWatch){
            setIsMustWatch(true)

            let mustWatchMovieData = {
                id: currentMovie.id,
                title: currentMovie.title,
                releaseDate: currentMovie.release_date,
                posterPath: currentMovie.poster_path,
                voteAverage: currentMovie.vote_average,
                voteCount: currentMovie.vote_count,
                imdbID: extraData.imdb_id,
                videoKey: extraData.videos.results.length ? extraData.videos.results[0].key : null,
                genre: extraData.genre_ids.map( genreID => genreID.name)
            }

            setMustWatchMovie(mustWatchMovieData)

            toast.info('❤️ Added to must-watch!', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        } else {
            setIsMustWatch(false)

            removeMustWatchMovie(currentMovie.id)

            toast.dark('💔 Removed from must-watch!', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }


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
                                            <div className='content__show-trailer' onClick={ () => setShowOverlay(true)} >
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
                                            {currentMovie.title}
                                        </h1>
                                        {
                                            isAuthenticated ? 
                                            <div className='details__interaction-icons'>
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className='icon icon-tabler icon-tabler-heart logged'
                                                    width="60" 
                                                    height="60" 
                                                    viewBox="0 0 24 24" 
                                                    strokeWidth="1" 
                                                    stroke="#ff2825" 
                                                    fill={isFavourite ? '#ff2825' : 'none'} strokeLinecap="round" 
                                                    strokeLinejoin="round" 
                                                    onClick={handleFavourite} >
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                        <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                                                        <title>Add to favourites</title>
                                                </svg>
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="icon icon-tabler icon-tabler-device-tv logged" 
                                                    width="60" 
                                                    height="60" 
                                                    viewBox="0 0 24 24" 
                                                    strokeWidth="1" 
                                                    stroke="#ffbf00" 
                                                    fill='none'
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round"
                                                    onClick={handleMustWatch}>
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                        <rect x="3" y="7" width="18" height="13" rx="2" fill={isMustWatch ? '#fff142' : 'none'} stroke={isMustWatch ? '#ffbf00' : '#00abfb'} />
                                                        <polyline points="16 3 12 7 8 3" stroke={isMustWatch ? '#ffbf00' : '#00abfb'}/>
                                                        <title>Add to must-watch</title>
                                                </svg>
                                            </div>
                                            :
                                            <div className='details__interaction-icons'>
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="icon icon-tabler icon-tabler-heart not-logged" 
                                                    width="60" 
                                                    height="60" 
                                                    viewBox="0 0 24 24" 
                                                    strokeWidth="1" 
                                                    stroke="#9e9e9e" 
                                                    fill='none' 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round" >
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                        <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                                                        <title>Log in to add to favourites.</title>
                                                </svg>
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="icon icon-tabler icon-tabler-device-tv not-logged" 
                                                    width="60" 
                                                    height="60" 
                                                    viewBox="0 0 24 24" 
                                                    strokeWidth="1" 
                                                    stroke="#9e9e9e" 
                                                    fill="none" 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                        <rect x="3" y="7" width="18" height="13" rx="2" />
                                                        <polyline points="16 3 12 7 8 3" />
                                                        <title>Log in to add to must-watch.</title>
                                                </svg>
                                            </div>
                                        }
                                    </div>
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
                                        <Carousel slideCount={movieCastData.length >= 5 ? 5 : 2} showDots={false}>
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
    similarMoviesData: selectMoviesCurrrentMovieSimilarData,
    isAuthenticated: selectUserIsAuthenticated,
    favourites: selectUserFavourites,
    mustWatch: selectUserMustWatch,
    userID: selectUserID
})

const mapDispatchToProps = dispatch => ({
    changeCurrentlyViewedMovie: item => dispatch(changeCurrentlyViewedMovie(item)),
    setExtraData: (data) => dispatch(addExtraDataToCurrentlyViewedMovie(data)),
    setSimilarMoviesData: (data) => dispatch(setSimilarMoviesData(data)),
    setFavouriteMovie: (data) => dispatch(setFavouriteMovie(data)),
    removeFavouriteMovie: (data) => dispatch(removeFavouriteMovie (data)),
    setMustWatchMovie: (data) => dispatch(setMustWatchMovie(data)),
    removeMustWatchMovie: (data) => dispatch(removeMustWatchMovie (data))
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(MovieSection));