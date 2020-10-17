import React from 'react';
import { useHistory } from 'react-router-dom';
import './movie-card.styles.scss';


const MovieCard = ({ movieData }) => {
    console.log('me render')
    let history = useHistory();

    return (
        <div className="movie-card" onClick={() => history.push(`/movie/${movieData.id}`)}>
            <h3>{movieData.title}</h3>
            <img src={movieData.poster_path ? `https://image.tmdb.org/t/p/original/${movieData.poster_path}` : `https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png`} alt="poster"/>
            <p>
                {movieData.overview}
            </p>

        </div>
    )
}

export default MovieCard;
