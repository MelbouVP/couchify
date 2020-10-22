import { createSelector } from 'reselect';

const selectMovies = state => state.moviesData;

const selectMoviesSearchData = createSelector(
    [selectMovies],
    data => data.searchData
)

export const selectMoviesSearchResults = createSelector(
    [selectMoviesSearchData],
    data => data.results
)

export const selectMoviesSearchValue = createSelector(
    [selectMoviesSearchData],
    data => data.searchValue
)

export const selectMoviesCurrentSearchPage = createSelector(
    [selectMoviesSearchData],
    data => data.page
)

export const selectMoviesTotalSearchPage = createSelector(
    [selectMoviesSearchData],
    data => data.total_pages
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