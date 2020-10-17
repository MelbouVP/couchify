import React from 'react';

import './movie.styles.scss';

const Movie = () => {
    console.log('re-rendered')
    return (
        <div>
            <h1>Movie Section</h1>
        </div>
    )
}

export default React.memo(Movie);