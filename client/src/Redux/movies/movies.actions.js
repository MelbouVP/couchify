import moviesActionTypes from './movies.types';

export const fetchSearchedMovies = (item) => ({
    type: moviesActionTypes.FETCH_SEARCHED_MOVIES,
    payload: item
})

export const fetchTrendingMovies = (item) => ({
    type: moviesActionTypes.FETCH_TRENDING_MOVIES,
    payload: item
})

export const fetchPopularMovies = (item) => ({
    type: moviesActionTypes.FETCH_POPULAR_MOVIES,
    payload: item
})

export const changeFetchStatus = (bool) => ({
    type: moviesActionTypes.CHANGE_FETCH_STATUS,
    payload: bool
})

export const changeCurrentlyViewedMovie = (item) => ({
    type: moviesActionTypes.CHANGE_CURRENTLY_VIEWED_MOVIE,
    payload: item
})