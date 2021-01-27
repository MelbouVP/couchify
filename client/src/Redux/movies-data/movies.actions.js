import moviesActionTypes from './movies.types';
import axios from 'axios';

export const fetchSearchedMovies = (item) => ({
    type: moviesActionTypes.FETCH_SEARCHED_MOVIES,
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

export const requestHomePageData = () => async (dispatch) => {
    dispatch({type: moviesActionTypes.REQUEST_HOME_PAGE_DATA_PENDING })

    try {
        const trending = await axios('http://localhost:3001/api/trending')
        const popular = await axios('http://localhost:3001/api/popular')
    
        dispatch(fetchTrendingMovies(trending.data))
        dispatch(fetchPopularMovies(popular.data))
        
    } catch (error) {
        dispatch({type: moviesActionTypes.REQUEST_HOME_PAGE_DATA_FAILED })
    } finally {
        dispatch({type: moviesActionTypes.REQUEST_MOVIE_SECTION_DATA_SUCCESS })
    }
}

export const requestMovieSectionData = (movieId) => async (dispatch) => {
    console.log(movieId)
    dispatch({type: moviesActionTypes.REQUEST_MOVIE_SECTION_DATA_PENDING })

    try {
        const responseMovieData = await axios(`http://localhost:3001/api/movie/${movieId}`)
        const responseSimilarMoviesData = await axios(`http://localhost:3001/api/similar/${movieId}`)
        const responseMovieCastData = await axios(`http://localhost:3001/api/credits/${movieId}`)

        dispatch(changeCurrentlyViewedMovie(responseMovieData.data))
        dispatch(setSimilarMoviesData(responseSimilarMoviesData.data))
        dispatch(setMovieCastData(responseMovieCastData.data))
        
    } catch (error) {
        dispatch({type: moviesActionTypes.REQUEST_MOVIE_SECTION_DATA_FAILED })
    } finally {
        dispatch({type: moviesActionTypes.REQUEST_MOVIE_SECTION_DATA_SUCCESS })
    }
}

export const requestSearchData = (searchValue) => async (dispatch) => {

    dispatch({type: moviesActionTypes.REQUEST_SEARCH_DATA_PENDING })

    try {
        const response = await fetch(`http://localhost:3001/api/find`, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    searchValue: searchValue
                })
            })

        const data = await response.json()

        dispatch(fetchSearchedMovies(data))
        
    } catch (error) {
        dispatch({type: moviesActionTypes.REQUEST_SEARCH_DATA_FAILED })
    } finally {
        dispatch({type: moviesActionTypes.REQUEST_SEARCH_DATA_SUCCESS })
    }
}

export const requestFilteredData = (filterOptions) => async (dispatch) => {

    const { sortByValue, releaseDateValue, movieGenresValue, pageNum } = filterOptions

    dispatch({type: moviesActionTypes.REQUEST_FILTER_DATA_PENDING })

    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:3001/api/filter',
            data: {
              sortBy: sortByValue,
              releaseDate: releaseDateValue,
              genres: movieGenresValue,
              pageNum: pageNum
            }
        })

        const data = response.data
        
        fetchSearchedMovies(data)

        dispatch(fetchSearchedMovies(data))
        
    } catch (error) {
        dispatch({type: moviesActionTypes.REQUEST_FILTER_DATA_FAILED })
    } finally {
        dispatch({type: moviesActionTypes.REQUEST_FILTER_DATA_SUCCESS })
    }
}

