import React, { useState } from 'react';
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom';

import { fetchSearchedMovies, changeFetchStatus } from '../../Redux/movies/movies.actions';

import './searchbar.styles.scss';

const SearchBar = ({ fetchSearchedMovies, changeFetchStatus }) => {
    
    let history = useHistory();
    const [searchValue, setSearchValue] = useState('');
    const [fetchedSearchValue, setFetchedSearchValue] = useState('')

    const fetchSearch = async () => {
        if(searchValue === '') return
        // Stops user from re-fetching data if search value hasn't changed
        // redirects back to search result overview component
        if(searchValue === fetchedSearchValue){
            history.location.pathname !== '/search' && history.push('/search')
            return
        }

        
        history.push('/search')
        changeFetchStatus(true);

        try {
            const response = await fetch(`http://localhost:3001/api/find`, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    searchValue: searchValue
                })
            })

            const data = await response.json()
        
            fetchSearchedMovies(data);
            setFetchedSearchValue(searchValue);
            
        } catch(error) {
            console.log(error)
        }
        changeFetchStatus(false)
    }

    const handleKeyDown = (event) => {
        event.key === 'Enter' && fetchSearch()
    }

    return (
        <div className="navbar__content--search-bar" >
            <input 
                type="text" 
                value={searchValue} 
                onChange={ event => setSearchValue(event.target.value)} onKeyDown={handleKeyDown}
            />
            <img 
                src="https://cms-assets.tutsplus.com/uploads/users/523/posts/27345/preview_image/search-icon-large.png" 
                alt="search icon" 
                onClick={fetchSearch} 
            />
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    changeFetchStatus: (bool) => dispatch(changeFetchStatus(bool)),
    fetchSearchedMovies: (data) => dispatch(fetchSearchedMovies(data))
})

export default connect(null, mapDispatchToProps)(SearchBar);