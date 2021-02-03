import React from 'react';

import MovieOverview from '../../Components/Movie-overview/movie-overview.component'
import './search-page.styles.scss'

const SearchPage = () => {

    // SearchPage component is responsible for displaying search results
    // see SearchBar component for search result fetching

    return(
        <div className='search-page__container'>
            <div className="search-page">
                <MovieOverview />
            </div>
        </div>
    )
}

export default React.memo(SearchPage);