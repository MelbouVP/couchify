import moviesActionTypes from './movies.types';

export const INITIAL_STATE = {
    searchData: {
        searchValue: '',
        sort_by: '',
        primary_release_date: [],
        with_genres: [],
        page: 0,
        total_pages: 0,
        results: []
    },
    trendingData: [],
    popularData: [],
    isFetching: false,
    currentlyViewedMovie: {
        id: null,
        data: null,
        additionalData: null,
        similarMoviesData: null
    }
}

const movieReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case moviesActionTypes.FETCH_SEARCHED_MOVIES:
            return {
                ...state,
                searchData: action.payload
            }
        case moviesActionTypes.FETCH_FILTERED_MOVIES:
            return {
                ...state,
                filteredData: action.payload
            }
        case moviesActionTypes.CHANGE_FETCHED_SEARCH_VALUE:
            return {
                ...state,
                searchData: {
                    ...state.searchData,
                    searchValue: action.payload
                }
            }
        case moviesActionTypes.FETCH_TRENDING_MOVIES:
            return {
                ...state,
                trendingData: action.payload
            }
        case moviesActionTypes.FETCH_POPULAR_MOVIES:
            return {
                ...state,
                popularData: action.payload
            }
        case moviesActionTypes.CHANGE_FETCH_STATUS:
            return {
                ...state,
                isFetching: action.payload
            }
        case moviesActionTypes.CHANGE_CURRENTLY_VIEWED_MOVIE:
            return {
                ...state,
                currentlyViewedMovie: {
                    data: action.payload,
                }
            }
        case moviesActionTypes.ADD_EXTRA_DATA_TO_CURRENTLY_VIEWED_MOVIE:
            return {
                ...state,
                currentlyViewedMovie: {
                    ...state.currentlyViewedMovie,
                    additionalData: action.payload
                }
            }
        case moviesActionTypes.SET_SIMILAR_MOVIES_DATA:
            return {
                ...state,
                currentlyViewedMovie: {
                    ...state.currentlyViewedMovie,
                    similarMoviesData: action.payload
                }
            }
        default:
            return state
    }
}

export default movieReducer;