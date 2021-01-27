import { createSelector } from 'reselect';

const selectMovies = state => state.moviesData;

export const selectMoviesSearchData = createSelector(
    [selectMovies],
    data => data.searchData
)

const selectMoviesCurrentlyViewedMovie = createSelector(
    [selectMovies],
    data => data.currentlyViewedMovie
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

export const selectMoviesHasLoaded = createSelector(
    [selectMovies],
    data => data.hasLoaded
)

export const selectMoviesSearchResults = createSelector(
    [selectMoviesSearchData],
    data => data.results
)

export const selectMoviesSearchValue = createSelector(
    [selectMoviesSearchData],
    data => data.searchValue
)

export const selectMoviesCurrrentMovie = createSelector(
    [selectMoviesCurrentlyViewedMovie],
    movie => movie.data
)

export const selectMoviesCurrrentMovieSimilarData = createSelector(
    [selectMoviesCurrentlyViewedMovie],
    movie => movie.similarMoviesData
)