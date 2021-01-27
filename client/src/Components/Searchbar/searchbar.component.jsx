import React, { useState } from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { useHistory } from 'react-router-dom';

import { selectMoviesSearchValue } from '../../Redux/movies-data/movies.selectors';

import { requestSearchData } from '../../Redux/movies-data/movies.actions';

import './searchbar.styles.scss';

const SearchBar = ({ onRequestSearchData, fetchedSearchValue }) => {
    
    let history = useHistory();

    const [searchValue, setSearchValue] = useState('');

    const fetchSearch = async () => {
        if(searchValue === '') return
        // Stops user from re-fetching data if search value hasn't changed
        // redirects back to search result overview component
        if(searchValue === fetchedSearchValue){
            history.location.pathname !== '/search' && history.push('/search')
            return
        }

        history.push('/search')

        onRequestSearchData(searchValue)

        setSearchValue('');
    }

    const handleKeyDown = (event) => {
        event.key === 'Enter' && fetchSearch()
    }

    return (
        <div className="search-bar__container" >
            <div className='search-bar'>
                <input 
                    type="search" 
                    value={searchValue}
                    placeholder='Search' 
                    onChange={ event => setSearchValue(event.target.value)} onKeyDown={handleKeyDown}
                    aria-label="Keywords for a movie search"
                />
                
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#3F51B5" fill="none" strokeLinecap="round" strokeLinejoin="round" onClick={fetchSearch} >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <circle cx="10" cy="10" r="7" />
                    <line x1="21" y1="21" x2="15" y2="15" />
                </svg>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    fetchedSearchValue: selectMoviesSearchValue
})


const mapDispatchToProps = dispatch => ({
    onRequestSearchData: (data) => dispatch(requestSearchData(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);