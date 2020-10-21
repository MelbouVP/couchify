import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectMoviesIsFetching, selectMoviesSearchResults, selectMoviesCurrentSearchPage } from '../../Redux/movies/movies.selectors';

import { selectMoviesSearchValue } from '../../Redux/movies/movies.selectors';

import { changeFetchStatus, fetchSearchedMovies } from '../../Redux/movies/movies.actions'

import MovieCard from '../Movie-card/movie-card.component';
import ChangePageButton from '../Change-page-btn/change-page-button.component';

import './movie-overview.styles.scss';


const MovieOverview = ({ searchResult, currentPage, isLoading, changeFetchStatus, fetchSearchedMovies, searchValue }) => {

    console.log('Movie overview rendered')
    console.log(currentPage)


    const movies = searchResult.length ? 
        searchResult.map( movieData => 
                    <MovieCard key={movieData.id} movieData={movieData} />
        ) 
    :   
        null


    const getNewMoviePage = async (route) => {
        try {
            let nextPage = currentPage
            let currentSearch = searchValue

            const response = await fetch(`http://localhost:3001/api/find/${route}`, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    searchValue: currentSearch,
                    pageNum: nextPage
                })
            })

            const data = await response.json()
            console.log(data);
            fetchSearchedMovies(data);
            
        } catch(error) {
            console.log(error)
        }
    }

    const handleClick = async (event) => {
        let content = event.target.textContent
        console.log(searchValue)
        changeFetchStatus(true);
        if(content === 'NEXT PAGE'){
            getNewMoviePage('next')
        } else if (content ==='PREV PAGE'){
            getNewMoviePage('prev')
        }
        changeFetchStatus(false)


    } 


    return (
        <div className='container__search-page'>
            <div className='search__container'>
                <aside className='search__filter'>
                    
                </aside>
                <div className="search__movie-overview">
                    {
                        currentPage > 1 ?
                            <ChangePageButton 
                                handleClick={handleClick} 
                                position={{bottom: '-0.5%', left: '1%'}}>
                                PREV PAGE
                            </ChangePageButton>
                        :
                            null
                            
                    }

                    {   isLoading ? 
                        <div className="loader"></div>
                    :
                        movies
                    }

                    <ChangePageButton 
                        handleClick={handleClick} 
                        position={{bottom: '-0.5%', right: '1%'}} >
                        NEXT PAGE
                    </ChangePageButton>
                </div>
            </div>

            <div className='footer'></div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    changeFetchStatus: (bool) => dispatch(changeFetchStatus(bool)),
    fetchSearchedMovies: (data) => dispatch(fetchSearchedMovies(data))
})

const mapStateToProps = createStructuredSelector({
    searchResult: selectMoviesSearchResults,
    searchValue: selectMoviesSearchValue,
    currentPage: selectMoviesCurrentSearchPage,
    isLoading: selectMoviesIsFetching
})
  
export default connect(mapStateToProps, mapDispatchToProps)(MovieOverview)
