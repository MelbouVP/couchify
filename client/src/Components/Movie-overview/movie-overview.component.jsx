import React from 'react';
import { connect } from 'react-redux';

import MovieCard from '../Movie-card/movie-card.component';

import './movie-overview.styles.scss';


const MovieOverview = ({ searchResult, isLoading }) => {

    console.log('rendered')

    const movies = searchResult.length ? 
        searchResult.map( movieData => 
            // return (
                // <Link to={`/movie/${movieData.id}`}>
                    <MovieCard key={movieData.id} movieData={movieData} />
                /* </Link> */
        //     )
        // })
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

const mapStateToProps = (state) => ({
    searchResult: state.movies.searchData,
    isLoading: state.movies.isLoading
})
  
export default connect(mapStateToProps)(MovieOverview)
