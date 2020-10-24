import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { createStructuredSelector } from 'reselect';

import MovieOverview from '../../Components/Movie-overview/movie-overview.component';
import MovieFilter from '../../Components/Movie-filter/movie-filter.component';

import { changeFetchStatus, fetchSearchedMovies } from '../../Redux/movies/movies.actions';
import { selectMoviesIsFetching } from '../../Redux/movies/movies.selectors';

import './filter-page.styles.scss';

const FilterPage = ({ changeFetchStatus, fetchSearchedMovies, isLoading }) => {

    const handleSubmit = async (e, sortByValue, releaseDateValue, movieGenresValue) => {
        e.preventDefault()

        changeFetchStatus(true);
        try {

            const response = await axios({
                method: 'post',
                url: 'http://localhost:3001/api/filter',
                data: {
                  sortBy: sortByValue,
                  releaseDate: releaseDateValue,
                  genres: movieGenresValue
                }
            })
            const data = response.data
            console.log(data)
            
            fetchSearchedMovies(data)
            
        } catch (error){
            console.log(error)
        }

        changeFetchStatus(false);
    }
    
    return (
        <div className='filter-page-container' >
            <div className='container__overview'>
                <aside className='container__overview--filter'>
                    <MovieFilter handleSubmit={handleSubmit} />
                </aside>
                <MovieOverview />
            </div>
        </div>
    )
}

// const mapStateToProps = createStructuredSelector({
//     isLoading: selectMoviesIsFetching
// })


const mapDispatchToProps = dispatch => ({
    changeFetchStatus: (bool) => dispatch(changeFetchStatus(bool)),
    fetchSearchedMovies: (data) => dispatch(fetchSearchedMovies(data))
})

export default connect(null, mapDispatchToProps)(FilterPage);