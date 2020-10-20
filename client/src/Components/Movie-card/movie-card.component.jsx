import React from 'react';
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom';
import './movie-card.styles.scss';

import { changeCurrentlyViewedMovie } from '../../Redux/movies/movies.actions'

const MovieCard = ({ movieData, changeCurrentlyViewedMovie }) => {
    console.log('moviecard rendered')
    let history = useHistory();

    const handleClick = () => {
        console.log(movieData)
        changeCurrentlyViewedMovie(movieData)
        history.push(`/movie/${movieData.id}`)
    }

    return (
        
        <div className="movie-card" onClick={handleClick}>
            <h3>{movieData.title}</h3>
            <img src={movieData.poster_path ? `https://image.tmdb.org/t/p/original/${movieData.poster_path}` : `https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png`} alt="poster"/>
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
