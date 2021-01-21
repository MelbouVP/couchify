import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectUserIsAuthenticated, selectUserMustWatch, selectUserID } from '../../Redux/user-data/user.selectors';

import { setMustWatchMovie, removeMustWatchMovie } from '../../Redux/user-data/user.actions'


const MustWatchIcon = ({ currentMovie, extraData, isAuthenticated, mustWatch, userID, setMustWatchMovie, removeMustWatchMovie }) => {

    const [isMustWatch, setIsMustWatch] = useState(false)
    const isInitialMount = useRef(true);

    useEffect( () => {

        if(isInitialMount.current) {
            isInitialMount.current = false
        } else {
            axios.post('http://localhost:3001/api/must-watch', { id: userID, data: mustWatch })
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

    }, [userID, mustWatch])


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
                imdbID: extraData.imdb_id,
                videoKey: extraData.videos.results.length ? extraData.videos.results[0].key : null,
                genre: extraData.genre_ids.map( genreID => genreID.name)
            }

            setMustWatchMovie(mustWatchMovieData)

            toast.info('❤️ Added to must-watch!', {
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

            removeMustWatchMovie(currentMovie.id)

            toast.dark('💔 Removed from must-watch!', {
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
    setMustWatchMovie: (data) => dispatch(setMustWatchMovie(data)),
    removeMustWatchMovie: (data) => dispatch(removeMustWatchMovie (data))
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(MustWatchIcon))