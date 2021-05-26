import { combineReducers } from 'redux';
import movieReducer from './movies-data/movies.reducer';
import userReducer from './user-data/user.reducer';
import utilityEventsReducer from './utility-events/utility.reducer';


const rootReducer = combineReducers({
    userData: userReducer,
    moviesData: movieReducer,
    utilityEvents: utilityEventsReducer
})

export default rootReducer