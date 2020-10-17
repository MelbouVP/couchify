import { combineReducers } from 'redux';
import movieReducer from './movies/movies.reducer';


const rootReducer = combineReducers({
    movies: movieReducer
})

export default rootReducer