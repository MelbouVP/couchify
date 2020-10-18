import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectMoviesIsFetching, selectMoviesSearchData } from '../../Redux/movies/movies.selectors';

import MovieCard from '../Movie-card/movie-card.component';

import './movie-overview.styles.scss';


const MovieOverview = ({ searchResult, isLoading }) => {

    console.log('Movie overview rendered')

    const movies = searchResult.length ? 
        searchResult.map( movieData => 
                    <MovieCard key={movieData.id} movieData={movieData} />
        ) 
    :   
        null

    return (
        <div className="movie-overview">
            
            {   isLoading ? 
            <div className="loader">
            </div>
        :
            
            movies
            
        }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    searchResult: selectMoviesSearchData,
    isLoading: selectMoviesIsFetching
})
  
export default connect(mapStateToProps)(MovieOverview)
