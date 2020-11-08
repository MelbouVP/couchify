import React from 'react';
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom';

import Spinner from '../Spinner/spinner.component';

import './movie-card.styles.scss';

import { changeCurrentlyViewedMovie } from '../../Redux/movies-data/movies.actions'

const MovieCard = ({ movieData, changeCurrentlyViewedMovie }) => {
    console.log('moviecard rendered')
    let history = useHistory();

    const handleClick = () => {
        console.log(movieData)
        changeCurrentlyViewedMovie(movieData)
        history.push(`/movie/${movieData.id}`)
    }

    const [didLoad, setLoad] = React.useState(false);

    const style = didLoad ? {} : {visibility: 'hidden'};


    return (
        
        <div className="movie-card__container" onClick={handleClick}>
            <h3>{movieData.title}</h3>
            {
                didLoad ? null : <Spinner />
            }
            <img 
                style={style} 
                src={movieData.poster_path ? `https://image.tmdb.org/t/p/original/${movieData.poster_path}` : `https://mozitime.com/no-poster.png`} 
                alt='movie poster'
                onLoad={() => setLoad(true)} 
            />
            <p>
                {movieData.overview}
            </p>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    changeCurrentlyViewedMovie: item => dispatch(changeCurrentlyViewedMovie(item))
})


export default connect(null, mapDispatchToProps)(MovieCard);
