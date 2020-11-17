import React from 'react';

import MovieOverview from '../../Components/Movie-overview/movie-overview.component'
import './search-page.styles.scss'

const SearchPage = () => {

    return(
        <div className='search-page__container'>
            <div className="search-page">
                <MovieOverview />
            </div>
        </div>
    )
}

export default React.memo(SearchPage);