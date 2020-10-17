import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom';

import { fetchMovies, isLoading } from '../../Redux/movies/movies.actions';

import './searchbar.styles.scss';

const SearchBar = ({ fetchMovies, isLoading }) => {
    
    let history = useHistory();
    const [searchValue, setSearchValue] = useState('');
    
    const usePrevious = (value) => {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }
    
    const prevSearchValue = usePrevious(searchValue);

    console.log(prevSearchValue, searchValue)

    const fetchSearch = async () => {
        history.push('/search')
        
        if(searchValue === searchValue){
            console.log('similar')
            history.push('/search')
        }

        isLoading(true);

        try {
            console.log('fetching')
            const response = await fetch(`http://localhost:3001/api/find`, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    searchValue: searchValue
                })
            })

            const data = await response.json()
            console.log(data)
        
            fetchMovies(data);
            
        } catch(error) {
            console.log(error)
        }
        isLoading(false)
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
    isLoading: (bool) => dispatch(isLoading(bool)),
    fetchMovies: (data) => dispatch(fetchMovies(data))
})

export default connect(null, mapDispatchToProps)(SearchBar);