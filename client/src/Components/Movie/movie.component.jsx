import React from 'react';
import BackButton from '../Go-back-btn/back-button.component'

import './movie.styles.scss';

const Movie = () => {
    console.log('movie section rendered')
    return (
        <div>
            <BackButton />
            <h1>Movie Section</h1>
        </div>
    )
}

export default React.memo(Movie);