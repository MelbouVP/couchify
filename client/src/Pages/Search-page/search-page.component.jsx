import React from 'react';

import Navbar from '../../Components/Navbar/navbar.component';
import MovieOverview from '../../Components/Movie-overview/movie-overview.component'

import './search-page.styles.scss'

const SearchPage = () => {


    return(
        <div>
            <Navbar />
            <MovieOverview />
        </div>
    )
}

export default SearchPage;