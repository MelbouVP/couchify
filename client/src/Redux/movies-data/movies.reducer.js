import moviesActionTypes from './movies.types';

export const INITIAL_STATE = {
    searchData: {
        searchValue: '',
        sort_by: '',
        primary_release_date: [],
        with_genres: [],
        page: 1,
        total_pages: 0,
        results: []
    },
    trendingData: [],
    popularData: [],
    hasLoaded: false,
    isFetching: false,
    currentlyViewedMovie: {
        data: {},
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
        case moviesActionTypes.CHANGE_CURRENTLY_VIEWED_MOVIE:
            return {
                ...state,
                currentlyViewedMovie: {
                    similarMoviesData: null,
                    data: action.payload,
                },
                hasLoaded: false
            }
        case moviesActionTypes.SET_SIMILAR_MOVIES_DATA:
            return {
                ...state,
                currentlyViewedMovie: {
                    ...state.currentlyViewedMovie,
                    similarMoviesData: action.payload
                }
            }
        case moviesActionTypes.SET_MOVIE_CAST_DATA:
            return {
                ...state,
                currentlyViewedMovie: {
                    ...state.currentlyViewedMovie,
                    data: {
                        ...state.currentlyViewedMovie.data,
                        cast: [...action.payload]
                    }
                }
            }
        case moviesActionTypes.REQUEST_MOVIE_SECTION_DATA_SUCCESS:
        case moviesActionTypes.REQUEST_HOME_PAGE_DATA_SUCCESS:
        case moviesActionTypes.REQUEST_SEARCH_DATA_SUCCESS:
        case moviesActionTypes.REQUEST_FILTER_DATA_SUCCESS:
            return {
                ...state,
                hasLoaded: true
            }
        case moviesActionTypes.REQUEST_HOME_PAGE_DATA_PENDING:
        case moviesActionTypes.REQUEST_HOME_PAGE_DATA_FAILED:  
        case moviesActionTypes.REQUEST_MOVIE_SECTION_DATA_PENDING:
        case moviesActionTypes.REQUEST_MOVIE_SECTION_DATA_FAILED:
        case moviesActionTypes.REQUEST_SEARCH_DATA_PENDING:
        case moviesActionTypes.REQUEST_SEARCH_DATA_FAILED:
        case moviesActionTypes.REQUEST_FILTER_DATA_PENDING:
        case moviesActionTypes.REQUEST_FILTER_DATA_FAILED:
            return {
                ...state,
                hasLoaded: false
            }
        default:
            return state
    }
}

export default movieReducer;