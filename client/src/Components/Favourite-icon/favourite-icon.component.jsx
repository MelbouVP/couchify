import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectUserIsAuthenticated, selectUserFavourites, selectUserID } from '../../Redux/user-data/user.selectors';

import { setFavouriteMovie, removeFavouriteMovie } from '../../Redux/user-data/user.actions'


const FavouriteIcon = ({ currentMovie, extraData, isAuthenticated, favourites, userID, setFavouriteMovie, removeFavouriteMovie }) => {

    const [isFavourite, setIsFavourite] = useState(false)
    const isInitialMount = useRef(true);

    useEffect( () => {

        if(isInitialMount.current) {
            isInitialMount.current = false
        } else {
            axios.post('http://localhost:3001/api/favourites', { id: userID, data: favourites })
                .then( response => undefined)
                .catch(error => toast.error('Hmm. something went wrong.', {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }))
        }

    }, [userID, favourites])


    useEffect (() => {
        favourites.forEach( movie => {
                
            if(currentMovie) {
                if(movie.id === currentMovie.id) {
                    setIsFavourite(true)
                }
            }
        })
    })


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
                imdbID: extraData.imdb_id,
                videoKey: extraData.videos.results.length ? extraData.videos.results[0].key : null,
                genre: extraData.genre_ids.map( genreID => genreID.name)
            }
    
            setFavouriteMovie(favouriteMovieData)

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

            removeFavouriteMovie(currentMovie.id)


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
    setFavouriteMovie: (data) => dispatch(setFavouriteMovie(data)),
    removeFavouriteMovie: (data) => dispatch(removeFavouriteMovie(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(FavouriteIcon))