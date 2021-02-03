import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MovieOverview from '../../Components/Movie-overview/movie-overview.component';
import MovieFilter from '../../Components/Movie-filter/movie-filter.component';
import BackButton from '../../Components/Go-back-btn/back-button.component';
import ForwardButton from '../../Components/Go-forward-btn/forward-button.component';


import { requestFilteredData } from '../../Redux/movies-data/movies.actions';
import { selectMoviesPopularData } from '../../Redux/movies-data/movies.selectors';

import { toggleMovieFilter } from '../../Redux/utility-events/utility.actions';
import { selectMovieFilterHidden } from '../../Redux/utility-events/utility.selectors';

import './filter-page.styles.scss';

const FilterPage = ({ toggleMovieFilter, filterHidden, popularMoviesData, onRequestFilteredData }) => {

    // FilterPage component is responsible for fetching and displaying movie data results based on filtering options
    // props = {
    //     toggleMovieFilter, // responsible for display of MovieFilter component (redux-action)
    //     filterHidden, // (redux)
    //     popularMoviesData, // used as a back-up to display if no movies have been filtered so far (redux)
    //     onRequestFilteredData // fetch filtering results (redux-action)
    // } 


    // Fetches filtering results and hides MovieFilter component(aside), therefore whole page can be used to display results
    const handleSubmit = async (e, sortByValue, releaseDateValue, movieGenresValue) => {
        e.preventDefault()
        window.scrollTo(0, 0);

        toggleMovieFilter(!filterHidden);

        // true paramater indicates that it is initial fetch, see server-side controller apiFilter
        onRequestFilteredData({
            sortBy: sortByValue, 
            releaseDate: releaseDateValue, 
            genres: movieGenresValue, 
            pagenum: 1
            }, 
            true
        )
    }

    // Handle display of MovieFilter component
    const handleMovieFilter = () => {
        toggleMovieFilter(!filterHidden)
    }


    // Used for responsive styling - MovieFilter is hidden by default, if not hidden then occupies whole page
    const styleDisplayNone = {
        display: 'none'
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
                <div 
                    className='filter-page' 
                    style={ (window.innerWidth < 900 && !filterHidden) ? styleDisplayNone : null}>
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
    toggleMovieFilter: (bool) => dispatch(toggleMovieFilter(bool)),
    onRequestFilteredData: (filterOptions, initialFetch) => dispatch(requestFilteredData(filterOptions, initialFetch))
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterPage);