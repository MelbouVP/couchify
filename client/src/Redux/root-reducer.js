import { combineReducers } from 'redux';
import movieReducer from './movies/movies.reducer';


const rootReducer = combineReducers({
    moviesData: movieReducer
})

export default rootReducer