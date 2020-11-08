import { combineReducers } from 'redux';
import movieReducer from './movies-data/movies.reducer';
import utilityEventsReducer from './utility-events/utility.reducer';


const rootReducer = combineReducers({
    moviesData: movieReducer,
    utilityEvents: utilityEventsReducer
})

export default rootReducer