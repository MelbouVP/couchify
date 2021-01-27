import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { selectMoviesIsFetching, selectMoviesSearchData } from '../../Redux/movies-data/movies.selectors';

import { changeIsFetching, fetchSearchedMovies } from '../../Redux/movies-data/movies.actions'

import MovieCard from '../Movie-card/movie-card.component';
import ChangePageButton from '../Change-page-btn/change-page-button.component';
import Spinner from '../Spinner/spinner.component';

import './movie-overview.styles.scss';


const MovieOverview = ({ searchData, isFetching, changeIsFetching, fetchSearchedMovies, otherData }) => {

    const { results, page, searchValue, total_pages, sort_by, primary_release_date, with_genres } = searchData

    const history = useHistory()    
    
    const defaultMovies = otherData ?
            otherData.map( movieData =>
                <MovieCard key={movieData.id} movieData={movieData} />
        )
        :
        null


    // Display user search result or filtering result depending on section/path
    // if there isn't data, provide backup data - defaultMovies(parent props)
    const movies = results.length ? 
        results.map( movieData => 
                    <MovieCard key={movieData.id} movieData={movieData} />
        ) 
    :   
        defaultMovies


    const getNewSearchPage = async (routeName) => {
        let route = routeName.toLowerCase()
        changeIsFetching(true);
        try {
            let currentSearch = searchValue

            const response = await axios({
                method: 'post',
                url: `http://localhost:3001/api/find/${route}`,
                headers: {'Content-Type': 'application/json'},
                data : {
                    searchValue: currentSearch,
                    pageNum: page
                }
            })

            const data = await response.data
            console.log(data);
            fetchSearchedMovies(data);
            
        } catch(error) {
            throw Error(error)
        }

        changeIsFetching(false);
    }

    const getNewFilterPage = async (routeName) => {
        let route = routeName.toLowerCase()
        changeIsFetching(true);

        try {
            const response = await fetch(`http://localhost:3001/api/filter/${route}`, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    sortBy: sort_by,
                    releaseDate: primary_release_date,
                    genres: with_genres,
                    pageNum: page
                })
            })

            const data = await response.json()
            console.log(data);
            fetchSearchedMovies(data);
            
        } catch(error) {
            console.log(error)
        }
        changeIsFetching(false);
    }

    const handleClick = async (event) => {
        let pageChange = event.target.textContent
        let pathname = history.location.pathname
        window.scrollTo(0, 0);


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
                        page > 1 && isFetching === false ?
                            <ChangePageButton 
                                handleClick={handleClick} 
                                position={{top: '100%', right: '55%'}}>
                                PREV
                            </ChangePageButton>
                        :
                            null
                            
                    }

                    {   isFetching ? 
                            <Spinner />
                        :
                            movies
                    }

                    {
                        total_pages > page && isFetching === false ?
                            <ChangePageButton 
                                handleClick={handleClick} 
                                position={{top: '100%', left: '55%'}} >
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
    changeIsFetching: (bool) => dispatch(changeIsFetching(bool)),
    fetchSearchedMovies: (data) => dispatch(fetchSearchedMovies(data))
})

const mapStateToProps = createStructuredSelector({
    isFetching: selectMoviesIsFetching,
    searchData: selectMoviesSearchData
})
  
export default connect(mapStateToProps, mapDispatchToProps)(MovieOverview)
