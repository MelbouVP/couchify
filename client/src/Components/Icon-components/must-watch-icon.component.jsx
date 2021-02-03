import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectUserIsAuthenticated, selectUserMustWatch, selectUserID } from '../../Redux/user-data/user.selectors';

import { updateMustWatchMovieList } from '../../Redux/user-data/user.actions'


const MustWatchIcon = ({ currentMovie, isAuthenticated, mustWatch, userID, onUpdateMustWatchMovieList }) => {

    // See Favourite-icon component for documentation

    const [isMustWatch, setIsMustWatch] = useState(false)


    useEffect (() => {
        mustWatch.forEach( movie => {
                
            if(currentMovie) {
                if(movie.id === currentMovie.id) {
                    setIsMustWatch(true)
                }
            }
        })
    })


    const handleMustWatch = (e) => {

            
        if(!isMustWatch){
            setIsMustWatch(true)

            let mustWatchMovieData = {
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

            onUpdateMustWatchMovieList(mustWatch, mustWatchMovieData, userID, 'add')

            toast.info('📺 Added to must-watch!', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        } else {
            setIsMustWatch(false)

            onUpdateMustWatchMovieList(mustWatch, currentMovie.id, userID, 'remove')

            toast.dark('📺 Removed from must-watch!', {
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
                        className="icon icon-tabler icon-tabler-device-tv logged" 
                        width="60" 
                        height="60" 
                        viewBox="0 0 24 24" 
                        strokeWidth="1" 
                        stroke="#ffbf00" 
                        fill='none'
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        onClick={handleMustWatch}>
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <rect x="3" y="7" width="18" height="13" rx="2" fill={isMustWatch ? '#fff142' : 'none'} stroke={isMustWatch ? '#ffbf00' : '#00abfb'} />
                            <polyline points="16 3 12 7 8 3" stroke={isMustWatch ? '#ffbf00' : '#00abfb'}/>
                            <title>Add to must-watch</title>
                    </svg>
                    :
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="icon icon-tabler icon-tabler-device-tv not-logged" 
                        width="60" 
                        height="60" 
                        viewBox="0 0 24 24" 
                        strokeWidth="1" 
                        stroke="#9e9e9e" 
                        fill="none" 
                        strokeLinecap="round" 
                        strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <rect x="3" y="7" width="18" height="13" rx="2" />
                            <polyline points="16 3 12 7 8 3" />
                            <title>Log in to add to must-watch.</title>
                    </svg>
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    isAuthenticated: selectUserIsAuthenticated,
    mustWatch: selectUserMustWatch,
    userID: selectUserID
})

const mapDispatchToProps = dispatch => ({
    onUpdateMustWatchMovieList: (currentFavouritesList, movieToUpdate, userID, action) => dispatch(updateMustWatchMovieList(currentFavouritesList, movieToUpdate, userID, action))
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(MustWatchIcon))