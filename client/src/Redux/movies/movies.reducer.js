import moviesActionTypes from './movies.types';

export const INITIAL_STATE = {
    searchValue: null,
    searchData: [],
    isLoading: false
}

const movieReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case moviesActionTypes.ADD_SEARCH_VALUE:
            return {
                ...state,
                searchValue: action.payload
            }
        case moviesActionTypes.FETCH_MOVIES:
            return {
                ...state,
                searchData: action.payload
            }
        case moviesActionTypes.IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        default:
            return state
    }
}

export default movieReducer;