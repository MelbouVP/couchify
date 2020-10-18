import moviesActionTypes from './movies.types';

export const INITIAL_STATE = {
    searchData: [],
    trendingData: [],
    popularData: [],
    isFetching: false
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
        case moviesActionTypes.CHANGE_FETCH_STATUS:
            return {
                ...state,
                isFetching: action.payload
            }
        default:
            return state
    }
}

export default movieReducer;