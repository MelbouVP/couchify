import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { selectMoviesSearchValue, selectMoviesIsFetching, selectMoviesSearchResults, 
    selectMoviesCurrentSearchPage, selectMoviesTotalSearchPage, selectMoviesFilteredSortByValue, 
    selectMoviesFilteredReleaseDates, selectMoviesFilteredGenres } from '../../Redux/movies-data/movies.selectors';

import { changeFetchStatus, fetchSearchedMovies } from '../../Redux/movies-data/movies.actions'

import MovieCard from '../Movie-card/movie-card.component';
import ChangePageButton from '../Change-page-btn/change-page-button.component';
import Spinner from '../Spinner/spinner.component';

import './movie-overview.styles.scss';


const MovieOverview = ({ 
    searchResult, currentPage, isLoading, changeFetchStatus, 
    fetchSearchedMovies, searchValue, totalPages,
    sortByValue, releaseDates, genres }) => {

    console.log('Movie overview rendered')
    console.log(currentPage)

    const history = useHistory()
    console.log(history.location.pathname)


    const movies = searchResult.length ? 
        searchResult.map( movieData => 
                    <MovieCard key={movieData.id} movieData={movieData} />
        ) 
    :   
        null


    const getNewSearchPage = async (routeName) => {
        let route = routeName.toLowerCase()
        changeFetchStatus(true);
        try {
            let currentSearch = searchValue

            const response = await axios({
                method: 'post',
                url: `http://localhost:3001/api/find/${route}`,
                headers: {'Content-Type': 'application/json'},
                data : {
                    searchValue: currentSearch,
                    pageNum: currentPage
                }
            })

            const data = await response.data
            console.log(data);
            fetchSearchedMovies(data);
            
        } catch(error) {
            console.log(error)
        }

        changeFetchStatus(false);
    }

    const getNewFilterPage = async (routeName) => {
        let route = routeName.toLowerCase()
        changeFetchStatus(true);

        try {
            const response = await fetch(`http://localhost:3001/api/filter/${route}`, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    sortBy: sortByValue,
                    releaseDate: releaseDates,
                    genres: genres,
                    pageNum: currentPage
                })
            })

            const data = await response.json()
            console.log(data);
            fetchSearchedMovies(data);
            
        } catch(error) {
            console.log(error)
        }
        changeFetchStatus(false);
    }

    const handleClick = async (event) => {
        let pageChange = event.target.textContent
        let pathname = history.location.pathname
        try {
            if(pathname === '/search'){
                getNewSearchPage(pageChange)
            } else if (pathname === '/filter'){
                getNewFilterPage(pageChange)
            }

        } catch (error) {
            console.log(error)
        }
    } 


    return (
            <div className='search-result__container'>
                <div className="search-result__overview">
                    {
                        currentPage > 1 && isLoading === false ?
                            <ChangePageButton 
                                handleClick={handleClick} 
                                position={{bottom: '-0.25%', left: '10%'}}>
                                PREV
                            </ChangePageButton>
                        :
                            null
                            
                    }

                    {   isLoading ? 
                        <Spinner />
                    :
                        movies
                    }

                    {
                        totalPages > currentPage && isLoading === false ?
                            <ChangePageButton 
                                handleClick={handleClick} 
                                position={{bottom: '-0.25%', right: '10%'}} >
                                NEXT
                            </ChangePageButton>
                        :
                            null
                            
                    }

                </div>
            </div>

    )
}

const mapDispatchToProps = dispatch => ({
    changeFetchStatus: (bool) => dispatch(changeFetchStatus(bool)),
    fetchSearchedMovies: (data) => dispatch(fetchSearchedMovies(data))
})

const mapStateToProps = createStructuredSelector({
    sortByValue: selectMoviesFilteredSortByValue,
    releaseDates: selectMoviesFilteredReleaseDates,
    genres: selectMoviesFilteredGenres,
    searchResult: selectMoviesSearchResults,
    searchValue: selectMoviesSearchValue,
    currentPage: selectMoviesCurrentSearchPage,
    totalPages: selectMoviesTotalSearchPage,
    isLoading: selectMoviesIsFetching
})
  
export default connect(mapStateToProps, mapDispatchToProps)(MovieOverview)
