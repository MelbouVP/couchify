import React from 'react';


import MovieOverview from '../../Components/Movie-overview/movie-overview.component'

import './search-page.styles.scss'

const SearchPage = () => {

    return(
        <div>
            <MovieOverview />
        </div>
    )
}

export default React.memo(SearchPage);