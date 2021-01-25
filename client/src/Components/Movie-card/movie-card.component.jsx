import React from 'react';
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom';

import Spinner from '../Spinner/spinner.component';

import './movie-card.styles.scss';

import { changeCurrentlyViewedMovie } from '../../Redux/movies-data/movies.actions'

const MovieCard = ({ movieData, changeCurrentlyViewedMovie }) => {
    let history = useHistory();

    const handleClick = () => {
        changeCurrentlyViewedMovie(movieData)
        history.push(`/movie/${movieData.id}`)
    }

    const [didLoad, setLoad] = React.useState(false);

    return (
        <div className="movie-card__container">
            {
                didLoad ?
                <div>
                    <div className="movie-card__rating">{movieData.vote_average}</div>
                    <div className="movie-card__front">
                        <img
                            src={movieData.poster_path ? `https://image.tmdb.org/t/p/w342${movieData.poster_path}` : `https://mozitime.com/no-poster.png`} 
                            alt={`${movieData.title} movie poster`} height='350px' width='260px'
                        />
                    </div>
                    <div className="movie-card__back">
                        <div className='movie-info'>
                            <h3 className='movie-info__title'>
                                {movieData.title}
                            </h3>
                            <div className="movie-info__statistics">
                                <div className="statistics__stat">
                                    <div className="statistics__stat--number">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-award" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2196F3" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <title>Number of votes</title>
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                            <circle cx="12" cy="9" r="6" />
                                            <polyline points="9 14.2 9 21 12 19 15 21 15 14.2" transform="rotate(-30 12 9)" />
                                            <polyline points="9 14.2 9 21 12 19 15 21 15 14.2" transform="rotate(30 12 9)" />
                                        </svg>
                                        <span>
                                            {movieData.vote_count}
                                        </span>
                                    </div>
                                    <span className="statistics__stat--name">
                                        Ratings
                                    </span>
                                </div>
                                <div className="statistics__stat">
                                    <div className="statistics__stat--number">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-comet" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#FFC107" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <title>Popularity</title>
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                            <path d="M15.5 18.5l-3 1.5l.5-3.5-2-2 3-.5 1.5-3 1.5 3 3 .5-2 2 .5 3.5z" />
                                            <line x1="4" y1="4" x2="11" y2="11" />
                                            <line x1="9" y1="4" x2="12.5" y2="7.5" />
                                            <line x1="4" y1="9" x2="7.5" y2="12.5" />
                                        </svg>
                                        <span>
                                            {parseFloat(movieData.popularity).toFixed(1)}
                                        </span>
                                    </div>
                                    <span className="statistics__stat--name">
                                        Popularity
                                    </span>
                                </div>
                            </div>
    
                            <div className="movie-info__details">
                                <button 
                                    className="movie-info__details--btn"
                                    value='Details'
                                    onClick={handleClick}>
                                    See details
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="movie-card__background"></div>
                </div>
                :
                <div className="movie-card__front--loading">
                    <Spinner size={{height: '150px', width: '150px'}}/>
                    <img 
                        style={{visibility: 'hidden'}}  
                        src={movieData.poster_path ? `https://image.tmdb.org/t/p/w342${movieData.poster_path}` : `https://mozitime.com/no-poster.png`} 
                        onLoad={() => setLoad(true)}
                        alt='' height='350px' width='180px'
                    />
                </div>
            }
        </div>


    )
}

const mapDispatchToProps = dispatch => ({
    changeCurrentlyViewedMovie: item => dispatch(changeCurrentlyViewedMovie(item))
})


export default connect(null, mapDispatchToProps)(React.memo(MovieCard));
