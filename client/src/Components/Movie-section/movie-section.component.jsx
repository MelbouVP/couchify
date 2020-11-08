import React from 'react';
import { useHistory } from 'react-router'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { selectMoviesCurrentlyViewedMovie } from '../../Redux/movies-data/movies.selectors';

import BackButton from '../Go-back-btn/back-button.component'

import './movie-section.styles.scss';

const MovieSection = ({ currentMovie }) => {
    console.log('movie section rendered')

    let history = useHistory();

    return (
        <div>
            <BackButton />
            <h1>Movie Section</h1>
            <div className='movie-section__container'>
                {
                    currentMovie ? 
                        <h2>{currentMovie.title}</h2>
                    : 
                        history.push('/')
                }
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentMovie: selectMoviesCurrentlyViewedMovie
})

export default connect(mapStateToProps)(MovieSection);