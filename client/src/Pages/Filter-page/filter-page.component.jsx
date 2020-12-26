import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { createStructuredSelector } from 'reselect';

import MovieOverview from '../../Components/Movie-overview/movie-overview.component';
import MovieFilter from '../../Components/Movie-filter/movie-filter.component';
import BackButton from '../../Components/Go-back-btn/back-button.component';
import ForwardButton from '../../Components/Go-forward-btn/forward-button.component';

// Data from movies reducer
import { changeFetchStatus, fetchSearchedMovies } from '../../Redux/movies-data/movies.actions';
import { selectMoviesPopularData } from '../../Redux/movies-data/movies.selectors';

// Data from utility-events reducer
import { toggleMovieFilter } from '../../Redux/utility-events/utility.actions';
import { selectMovieFilterHidden } from '../../Redux/utility-events/utility.selectors';

import './filter-page.styles.scss';

const FilterPage = ({ changeFetchStatus, fetchSearchedMovies, toggleMovieFilter, filterHidden, popularMoviesData }) => {


    const handleSubmit = async (e, sortByValue, releaseDateValue, movieGenresValue) => {
        e.preventDefault()
        window.scrollTo(0, 0);
        toggleMovieFilter(!filterHidden);
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
            throw Error(error)
        }

        changeFetchStatus(false);
    }


    const handleMovieFilter = () => {
        toggleMovieFilter(!filterHidden)
    }


    return (
        <div className='filter-page__container' >
            <div className='container__overview'>
                {
                    filterHidden ?
                        <div className="filter__open-btn">
                            <ForwardButton handleClick={handleMovieFilter} />
                        </div>
                    :
                        <aside className='container__movie-filter'>
                            <div className="filter__close-btn">
                                <BackButton handleClick={handleMovieFilter} />
                            </div>
                            <MovieFilter handleSubmit={handleSubmit} />
                        </aside>
                }
                <div className='filter-page'>
                    <MovieOverview otherData={popularMoviesData}/>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    filterHidden: selectMovieFilterHidden,
    popularMoviesData: selectMoviesPopularData
})


const mapDispatchToProps = dispatch => ({
    changeFetchStatus: (bool) => dispatch(changeFetchStatus(bool)),
    fetchSearchedMovies: (data) => dispatch(fetchSearchedMovies(data)),
    toggleMovieFilter: (bool) => dispatch(toggleMovieFilter(bool)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterPage);