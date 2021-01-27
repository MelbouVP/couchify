import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MovieOverview from '../../Components/Movie-overview/movie-overview.component';
import MovieFilter from '../../Components/Movie-filter/movie-filter.component';
import BackButton from '../../Components/Go-back-btn/back-button.component';
import ForwardButton from '../../Components/Go-forward-btn/forward-button.component';

// Data from movies reducer
import { requestFilteredData } from '../../Redux/movies-data/movies.actions';
import { selectMoviesPopularData } from '../../Redux/movies-data/movies.selectors';

// Data from utility-events reducer
import { toggleMovieFilter } from '../../Redux/utility-events/utility.actions';
import { selectMovieFilterHidden } from '../../Redux/utility-events/utility.selectors';

import './filter-page.styles.scss';

const FilterPage = ({ toggleMovieFilter, filterHidden, popularMoviesData, onRequestFilteredData }) => {


    const handleSubmit = async (e, sortByValue, releaseDateValue, movieGenresValue) => {
        e.preventDefault()
        window.scrollTo(0, 0);

        toggleMovieFilter(!filterHidden);

        onRequestFilteredData({sortByValue, releaseDateValue, movieGenresValue, pagenum: 1})

    }

    const handleMovieFilter = () => {
        toggleMovieFilter(!filterHidden)
    }

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
                <div className='filter-page' style={ (window.innerWidth < 900 && !filterHidden) ? styleDisplayNone : null}>
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
    onRequestFilteredData: (filterOptions) => dispatch(requestFilteredData(filterOptions))
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterPage);