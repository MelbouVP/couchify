import utilityActionTypes from './utility.types'

export const toggleMovieFilter = (bool) => ({
    type: utilityActionTypes.TOGGLE_MOVIE_FILTER,
    payload: bool
})