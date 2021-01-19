import userActionTypes from './user.types'


export const loadProfileData = (data) => ({
    type: userActionTypes.LOAD_USER_DATA,
    payload: data
})

export const logOutUser = () => ({
    type: userActionTypes.LOG_OUT_USER
})

export const setFavouriteMovie = (data) => ({
    type: userActionTypes.SET_FAVOURITE_MOVIE,
    payload: data
})

export const removeFavouriteMovie = (movieID) => ({
    type: userActionTypes.REMOVE_FAVOURITE_MOVIE,
    payload: movieID
})

export const setMustWatchMovie = (data) => ({
    type: userActionTypes.SET_MUST_WATCH_MOVIE,
    payload: data
})

export const removeMustWatchMovie = (movieID) => ({
    type: userActionTypes.REMOVE_MUST_WATCH_MOVIE,
    payload: movieID
})