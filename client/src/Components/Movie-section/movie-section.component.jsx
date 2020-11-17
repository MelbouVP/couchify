import React from 'react';
import { useHistory } from 'react-router'
import { useLastLocation } from 'react-router-last-location';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { selectMoviesCurrentlyViewedMovie } from '../../Redux/movies-data/movies.selectors';

import BackButton from '../Go-back-btn/back-button.component'

import './movie-section.styles.scss';

const MovieSection = ({ currentMovie }) => {
    console.log('movie section rendered')

    let history = useHistory();
    const lastLocation = useLastLocation();

    const sendToPreviousPage = () => {
        history.push(lastLocation)
    }


    return (
        <div>
            <div className='movie-section__back-btn'>
                <BackButton handleClick={sendToPreviousPage} />
            </div>
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