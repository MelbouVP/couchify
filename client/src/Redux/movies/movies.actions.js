import moviesActionTypes from './movies.types';

export const addSearchValue = (value) => ({
    type: moviesActionTypes.SET_SEARCH_VALUE,
    payload: value
})

export const fetchMovies = (item) => ({
    type: moviesActionTypes.FETCH_MOVIES,
    payload: item
})

export const isLoading = (bool) => ({
    type: moviesActionTypes.IS_LOADING,
    payload: bool
})