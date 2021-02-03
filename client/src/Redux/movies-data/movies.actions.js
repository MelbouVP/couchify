import moviesActionTypes from './movies.types';
import axios from 'axios';

export const changeFetchedMoviesData = (item) => ({
    type: moviesActionTypes.CHANGE_FETCHED_MOVIES_DATA,
    payload: item
})

export const fetchTrendingMovies = (item) => ({
    type: moviesActionTypes.FETCH_TRENDING_MOVIES,
    payload: item
})

export const fetchPopularMovies = (item) => ({
    type: moviesActionTypes.FETCH_POPULAR_MOVIES,
    payload: item
})

export const changeIsFetching = (bool) => ({
    type: moviesActionTypes.CHANGE_IS_FETCHING,
    payload: bool
})

export const changeCurrentlyViewedMovie = (item) => ({
    type: moviesActionTypes.CHANGE_CURRENTLY_VIEWED_MOVIE,
    payload: item
})

export const setMovieCastData = (data) => ({
    type: moviesActionTypes.SET_MOVIE_CAST_DATA,
    payload: data
})

export const setSimilarMoviesData = (data) => ({
    type:moviesActionTypes.SET_SIMILAR_MOVIES_DATA,
    payload: data
})


// redux-thunk actions
export const requestHomePageData = () => async (dispatch) => {
    dispatch({type: moviesActionTypes.REQUEST_HOME_PAGE_DATA_PENDING })

    try {
        const trending = await axios('http://localhost:3001/api/trending')
        const popular = await axios('http://localhost:3001/api/popular')
    
        dispatch(fetchTrendingMovies(trending.data))
        dispatch(fetchPopularMovies(popular.data))
        
        dispatch({type: moviesActionTypes.REQUEST_MOVIE_SECTION_DATA_SUCCESS })

    } catch (error) {
        dispatch({type: moviesActionTypes.REQUEST_HOME_PAGE_DATA_FAILED })
    }
}

export const requestMovieSectionData = (movieId) => async (dispatch) => {
    dispatch({type: moviesActionTypes.REQUEST_MOVIE_SECTION_DATA_PENDING })

    try {
        const responseMovieData = await axios(`http://localhost:3001/api/movie/${movieId}`)
        const responseSimilarMoviesData = await axios(`http://localhost:3001/api/similar/${movieId}`)
        const responseMovieCastData = await axios(`http://localhost:3001/api/credits/${movieId}`)

        dispatch(changeCurrentlyViewedMovie(responseMovieData.data))
        dispatch(setSimilarMoviesData(responseSimilarMoviesData.data))
        dispatch(setMovieCastData(responseMovieCastData.data))
        
        dispatch({type: moviesActionTypes.REQUEST_MOVIE_SECTION_DATA_SUCCESS })
        
    } catch (error) {
        dispatch({type: moviesActionTypes.REQUEST_MOVIE_SECTION_DATA_FAILED })
    }
}

export const requestSearchData = (searchValue, pageNum = 1) => async (dispatch) => {

    dispatch({type: moviesActionTypes.REQUEST_SEARCH_DATA_PENDING })

    try {
        const response = await fetch(`http://localhost:3001/api/find`, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    searchValue: searchValue,
                    pageNum: pageNum
                })
            })

        const data = await response.json()

        dispatch(changeFetchedMoviesData(data))
        
        dispatch({type: moviesActionTypes.REQUEST_SEARCH_DATA_SUCCESS })

    } catch (error) {
        dispatch({type: moviesActionTypes.REQUEST_SEARCH_DATA_FAILED })
    }
}

export const requestFilteredData = (filterOptions, initialFetch = false) => async (dispatch) => {

    const { sortBy, releaseDate, genres, pageNum } = filterOptions

    dispatch({type: moviesActionTypes.REQUEST_FILTER_DATA_PENDING })

    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:3001/api/filter',
            data: {
              sortBy,
              releaseDate,
              genres,
              pageNum,
              initialFetch: initialFetch
            }
        })

        const data = response.data

        dispatch(changeFetchedMoviesData(data))

        dispatch({type: moviesActionTypes.REQUEST_FILTER_DATA_SUCCESS })
        
    } catch (error) {
        dispatch({type: moviesActionTypes.REQUEST_FILTER_DATA_FAILED })
    }
}

