import userActionTypes from './user.types'
import axios from 'axios';
import { showNotification } from './user.utils';


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

export const requestUserData = (data, history) => async (dispatch) => {
    dispatch({ type: userActionTypes.REQUEST_USER_DATA_PENDING })

    try {
        const response = await axios.post('http://localhost:3001/api/login', data)
        showNotification('success', '🚀 Login successful!')
        dispatch(loadProfileData(response.data))

        history.push('/profile')

        dispatch({type: userActionTypes.REQUEST_USER_DATA_SUCCESS})

    } catch {
        dispatch({type: userActionTypes.REQUEST_USER_DATA_FAILED})
        showNotification('error', '❌ Hmm, Something went wrong')
    }
}

export const registerNewUser = (data, history) =>  async (dispatch) => {
    dispatch({ type: userActionTypes.REGISTER_NEW_USER_PENDING })

    try {
        await axios.post('http://localhost:3001/api/register', data)
        showNotification('info', '🚀 Registration successful!')
        dispatch({ type: userActionTypes.REGISTER_NEW_USER_SUCCESS })

        const { password, email } = data
        
        dispatch(requestUserData({ password, email }, history))

    } catch {
        dispatch({ type: userActionTypes.REGISTER_NEW_USER_FAILED })
        showNotification('error', '❌ Hmm, Something went wrong')
    }
}