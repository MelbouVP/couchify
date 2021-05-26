import userActionTypes from './user.types'
import axios from 'axios';
import { showNotification, addMovie, removeMovie } from './user.utils';


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

export const updateFavouriteMovieList = (currentFavouritesList, movieToUpdate, userID, action)  => (dispatch) => {

    dispatch({ type: userActionTypes.UPDATE_FAVOURITE_MOVIE_PENDING })

    let updatedFavouritesArray

    if(action === 'add'){

        updatedFavouritesArray = addMovie(currentFavouritesList, movieToUpdate)
        dispatch(setFavouriteMovie(updatedFavouritesArray))
        
    } else if (action === 'remove') {

        updatedFavouritesArray = removeMovie(currentFavouritesList, movieToUpdate)
        dispatch(removeFavouriteMovie(updatedFavouritesArray))
    }

    axios.post('https://secret-bayou-82769.herokuapp.com/api/favourites', { id: userID, data: updatedFavouritesArray})
        .then( response => {
            dispatch({ type: userActionTypes.UPDATE_FAVOURITE_MOVIE_SUCCESS })
        })
        .catch(error => {
            dispatch({ type: userActionTypes.UPDATE_FAVOURITE_MOVIE_FAILED })
            showNotification('error', 'Hmm. something went wrong.')
    })
}

export const updateMustWatchMovieList = (currentMustWatchList, movieToUpdate, userID, action)  => (dispatch) => {

    dispatch({ type: userActionTypes.UPDATE_MUST_WATCH_MOVIE_PENDING })

    let updatedMustWatchArray

    if(action === 'add'){

        updatedMustWatchArray = addMovie(currentMustWatchList, movieToUpdate)
        dispatch(setMustWatchMovie(updatedMustWatchArray))
        
    } else if (action === 'remove') {

        updatedMustWatchArray = removeMovie(currentMustWatchList, movieToUpdate)
        dispatch(removeMustWatchMovie(updatedMustWatchArray))
    }

    axios.post('https://secret-bayou-82769.herokuapp.com/api/must-watch', { id: userID, data: updatedMustWatchArray})
        .then( response => {
            dispatch({ type: userActionTypes.UPDATE_MUST_WATCH_MOVIE_SUCCESS })
        })
        .catch(error => {
            dispatch({ type: userActionTypes.UPDATE_MUST_WATCH_MOVIE_FAILED })
            showNotification('error', 'Hmm. something went wrong.')
    })
}

export const requestUserData = (data, history) => async (dispatch) => {
    dispatch({ type: userActionTypes.REQUEST_USER_DATA_PENDING })

    try {
        const response = await axios.post('https://secret-bayou-82769.herokuapp.com/api/login', data)
        showNotification('success', '🚀 Login successful!')
        dispatch(loadProfileData(response.data))

        history.push('/profile')

        dispatch({type: userActionTypes.REQUEST_USER_DATA_SUCCESS})

    } catch (error) {
        dispatch({type: userActionTypes.REQUEST_USER_DATA_FAILED})
        showNotification('error', '❌ Hmm, Something went wrong')
    }
}

export const registerNewUser = (data, history) =>  async (dispatch) => {
    dispatch({ type: userActionTypes.REGISTER_NEW_USER_PENDING })

    try {
        await axios.post('https://secret-bayou-82769.herokuapp.com/api/register', data)
        showNotification('info', '🚀 Registration successful!')
        dispatch({ type: userActionTypes.REGISTER_NEW_USER_SUCCESS })

        const { password, email } = data
        
        dispatch(requestUserData({ password, email }, history))

    } catch (error) {
        dispatch({ type: userActionTypes.REGISTER_NEW_USER_FAILED })
        showNotification('error', '❌ Hmm, Something went wrong')
    }
}