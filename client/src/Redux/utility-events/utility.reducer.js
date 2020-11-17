import utilityActionTypes from './utility.types'

const INITIAL_STATE = {
    movieFilterHidden: false
}

const utilityEventsReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case utilityActionTypes.TOGGLE_MOVIE_FILTER:
            return {
                ...state,
                movieFilterHidden: action.payload
            }
        default:
            return state
    }

}

export default utilityEventsReducer;