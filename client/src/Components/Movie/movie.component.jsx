import React from 'react';
import { useHistory } from 'react-router'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { selectMoviesCurrentlyViewedMovie } from '../../Redux/movies/movies.selectors';

import BackButton from '../Go-back-btn/back-button.component'

import './movie.styles.scss';

const Movie = ({ currentMovie }) => {
    console.log('movie section rendered')

    let history = useHistory();

    return (
        <div>
            <BackButton />
            <h1>Movie Section</h1>
            <div className='container__movie-section'>
                {
                    currentMovie ? 
                        <h2>{currentMovie.title}</h2>
                    : 
                        // <div className='loader'></div>
                        history.push('/')
                }
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentMovie: selectMoviesCurrentlyViewedMovie
})

export default connect(mapStateToProps)(Movie);