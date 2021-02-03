import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectUserIsAuthenticated, selectUserFavourites, selectUserID } from '../../Redux/user-data/user.selectors';

import { updateFavouriteMovieList } from '../../Redux/user-data/user.actions'


const FavouriteIcon = ({ currentMovie, isAuthenticated, favourites, userID, onUpdateFavouriteMovieList }) => {

    // FavouriteIcon is responsible for handling changes in favourite movies of user and communicating changes to back-end server.

    // props = {
    //     currentMovie, // data about currently viewed movie acquired from parent component (MovieSectionPage)
    //     isAuthenticated, // checks if user is authenticated (redux)
    //     favourites, // array of favourite movies objects (redux)
    //     userId, // id of logged in user (redux)
    //     onUpdateFavouriteMovieList // handles changes of favourites movie array (react-action)
    // }

    // Controls styling of svg element
    const [isFavourite, setIsFavourite] = useState(false)


    // Checks if movie is favourite on mount
    useEffect (() => {
        favourites.forEach( movie => {
                
            if(currentMovie) {
                if(movie.id === currentMovie.id) {
                    setIsFavourite(true)
                }
            }
        })
    })


    // Handles internal state changes, dispatching of redux actions and and informing user about changes
    const handleFavourite = (e) => {

        if(!isFavourite){

            setIsFavourite(true)

            let favouriteMovieData = {
                id: currentMovie.id,
                title: currentMovie.title,
                releaseDate: currentMovie.release_date,
                posterPath: currentMovie.poster_path,
                voteAverage: currentMovie.vote_average,
                voteCount: currentMovie.vote_count,
                imdbID: currentMovie.imdb_id,
                videoKey: currentMovie.videos.results.length ? currentMovie.videos.results[0].key : null,
                genre: currentMovie.genre_ids.map( genreID => genreID.name)
            }

            onUpdateFavouriteMovieList(favourites, favouriteMovieData, userID, 'add')

            toast.info('❤️ Added to favourites!', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        } else {
            setIsFavourite(false)

            onUpdateFavouriteMovieList(favourites, currentMovie.id, userID, 'remove')

            toast.dark('💔 Removed from favourites!', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <div>
            {
                isAuthenticated ?
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className='icon icon-tabler icon-tabler-heart logged'
                        width="60" 
                        height="60" 
                        viewBox="0 0 24 24" 
                        strokeWidth="1" 
                        stroke="#ff2825" 
                        fill={isFavourite ? '#ff2825' : 'none'} strokeLinecap="round" 
                        strokeLinejoin="round" 
                        onClick={handleFavourite} >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                            <title>Add to favourites</title>
                    </svg>
                    :
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="icon icon-tabler icon-tabler-heart not-logged" 
                        width="60" 
                        height="60" 
                        viewBox="0 0 24 24" 
                        strokeWidth="1" 
                        stroke="#9e9e9e" 
                        fill='none' 
                        strokeLinecap="round" 
                        strokeLinejoin="round" >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                            <title>Log in to add to favourites.</title>
                    </svg>
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    isAuthenticated: selectUserIsAuthenticated,
    favourites: selectUserFavourites,
    userID: selectUserID
})

const mapDispatchToProps = dispatch => ({
    onUpdateFavouriteMovieList: (currentFavouritesList, movieToUpdate, userID, action) => dispatch(updateFavouriteMovieList(currentFavouritesList, movieToUpdate, userID, action))
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(FavouriteIcon))