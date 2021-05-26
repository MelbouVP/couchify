import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { selectMoviesIsFetching, selectMoviesSearchData } from '../../Redux/movies-data/movies.selectors';

import { changeIsFetching, requestSearchData, requestFilteredData } from '../../Redux/movies-data/movies.actions'

import MovieCard from '../Movie-card/movie-card.component';
import ChangePageButton from '../Change-page-btn/change-page-button.component';
import Spinner from '../Spinner/spinner.component';

import './movie-overview.styles.scss';


const MovieOverview = ({ searchData, isFetching, otherData, onRequestSearchData, onRequestFilteredData }) => {


    // MovieOverview component is responsible for display search and filter results for parent components (MovieFilterPage and SearchPage)

    // props = {
    //     searchData, // movie data results that were filtered/searched (redux)
    //     isFetching, (redux) 
    //     otherData // on initial mount, if not movies have been fetched, displays movie data from HomePage component i.e. popular movies
    //     onRequestSearchData, // handles request of new page of search results (redux-action)
    //     onRequestFilteredData // handles request of new page  filtering results
    // }


    const { results, page, searchValue, total_pages, sort_by, primary_release_date, with_genres } = searchData

    const history = useHistory()    
    
    const defaultMovies = otherData ?
            otherData.map( movieData =>
                <MovieCard key={movieData.id} movieData={movieData} />
        )
        :
        null


    // Display user search result or filtering result depending on section/path
    // if there isn't data, provide backup data
    const movies = results.length ? 
        results.map( movieData => 
                    <MovieCard key={movieData.id} movieData={movieData} />
        ) 
    :   
        defaultMovies


    // Handles fetching of additional search result pages
    const getNewSearchPage = (routeName) => {    

        // pageIteration variable represents current search result page iteration,
        // i.e 1st page of searched results, 2nd page of searched results etc.
        let pageIteration = page

        routeName === 'next' ? pageIteration++ : pageIteration--

        onRequestSearchData(searchValue, pageIteration)
    }

    // see documentation for getNewSearchPage
    const getNewFilterPage = async (routeName) => {

        let pageIteration = page

        routeName === 'next' ? pageIteration++ : pageIteration--
        
        onRequestFilteredData({
            sortBy: sort_by,
            releaseDate: primary_release_date,
            genres: with_genres,
            pageNum: pageIteration
        })
    }

    
    // Handles triggering of getNewSearchPage or getNewFilterPage based on current url path
    const handleClick = async (event) => {
        // pageChange (string next || prev) handles wether previous or next page of results is fetched
        let pageChange = event.target.textContent.toLowerCase()
        let pathname = history.location.pathname
        window.scrollTo(0, 0);


        try {
            if(pathname === '/search'){
                getNewSearchPage(pageChange)
            } else if (pathname === '/filter'){
                getNewFilterPage(pageChange)
            }

        } catch (error) {
            throw Error
        }
    } 


    return (
            <div className='search-result__container'>
                <div className="search-result__overview">
                    {
                        page > 1 && isFetching === false ?  // prevent possibility of fetching previous page on 1st page of fetch results.
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
                        total_pages > page && isFetching === false ? // prevent possibility of fetching next page if current page is last page of fetched results
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
    onRequestSearchData: (searchValue, pageNum) => dispatch(requestSearchData(searchValue, pageNum)),
    onRequestFilteredData: (filterOptions) => dispatch(requestFilteredData(filterOptions))
})

const mapStateToProps = createStructuredSelector({
    isFetching: selectMoviesIsFetching,
    searchData: selectMoviesSearchData
})
  
export default connect(mapStateToProps, mapDispatchToProps)(MovieOverview)
