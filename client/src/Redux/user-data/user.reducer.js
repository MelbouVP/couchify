import userActionTypes from './user.types';
import { removeMovie } from './user.utils';

export const INITIAL_STATE = {
    isAuthenticated: false,
    profile: {
        id: null,
        name: null,
        favourite_movies: [],
        must_watch_movies: [],
        joined: null
    }
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case userActionTypes.LOAD_USER_DATA:
            return {
                ...state,
                isAuthenticated: true,
                profile: action.payload
            }
        case userActionTypes.LOG_OUT_USER: 
            return {
                ...INITIAL_STATE
            }
        case userActionTypes.SET_FAVOURITE_MOVIE:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    favourite_movies: [...state.profile.favourite_movies, action.payload]
                }
            }
        case userActionTypes.REMOVE_FAVOURITE_MOVIE:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    favourite_movies: removeMovie(state.profile.favourite_movies, action.payload)
                }
            }
        case userActionTypes.SET_MUST_WATCH_MOVIE:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    must_watch_movies: [...state.profile.must_watch_movies, action.payload]
                }
            }
        case userActionTypes.REMOVE_MUST_WATCH_MOVIE:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    must_watch_movies: removeMovie(state.profile.must_watch_movies, action.payload)
                }
            }
        default:
            return state
    }
}

export default userReducer;