import { createSelector } from 'reselect';

const selectMovies = state => state.moviesData;


export const selectMoviesSearchData = createSelector(
    [selectMovies],
    data => data.searchData
)

export const selectMoviesTrendingData = createSelector(
    [selectMovies],
    data => data.trendingData
)

export const selectMoviesPopularData = createSelector(
    [selectMovies],
    data => data.popularData
)

export const selectMoviesIsFetching = createSelector(
    [selectMovies],
    data => data.isFetching
)

export const selectMoviesCurrentlyViewedMovie = createSelector(
    [selectMovies],
    data => data.currentlyViewedMovie
)