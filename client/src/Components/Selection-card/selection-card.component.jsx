import React from 'react'

import { useHistory } from 'react-router-dom';


import './selection-card.styles.scss';


const SelectionCard = ({ data, handleVideo}) => {

    const { id, posterPath, genre, imdbID, releaseDate, title, videoKey, voteAverage } = data

    const history = useHistory()

    const handleClick = () => {
        history.push(`/movie/${id}`)
    }

    return (
        <tr className='selection-card__container'>
            <td className='selection-card__list-item' >
                <img 
                    src={ posterPath ? `http://image.tmdb.org/t/p/w185/${posterPath}` : `https://mozitime.com/no-poster.png`} 
                    alt="Movie poster" 
                    className='selection-card__list-item--movie-poster' 
                    onClick={handleClick} 
                />
            </td>
            <td className='selection-card__list-item title'>
                {title}
            </td>
            <td className='selection-card__list-item'>{releaseDate.substring(0,4)}</td>
            <td className='selection-card__list-item'>{genre.join(', ')}</td>
            <td className='selection-card__list-item'><span role='img' aria-labelledby="star">&#11088;</span>{voteAverage}</td>
            <td className='selection-card__list-item'>
                <a href={`https://www.imdb.com/title/${imdbID}`} rel="noopener noreferrer" target='_blank' >
                    <img src="https://icons.iconarchive.com/icons/chrisbanks2/cold-fusion-hd/128/imdb-2-icon.png" alt="IMDb logo" className='selection-card__list-item--imdb-logo' />
                </a>
            </td>
            <td className='selection-card__list-item'>
                {
                    videoKey ?
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="icon icon-tabler icon-tabler-player-play play-btn" 
                            width="30" 
                            height="30" 
                            viewBox="0 0 24 24" 
                            strokeWidth="1" 
                            stroke="#79bdf5" 
                            fill="#79bdf5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            onClick={() => handleVideo(title, videoKey)}
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M7 4v16l13 -8z" />
                        </svg>
                    :
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="icon icon-tabler icon-tabler-ban" 
                            width="30" 
                            height="30" 
                            viewBox="0 0 24 24" 
                            strokeWidth="1.5" 
                            stroke="#79bdf5" 
                            fill="none" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <circle cx="12" cy="12" r="9" />
                            <line x1="5.7" y1="5.7" x2="18.3" y2="18.3" />
                        </svg>
                }
            </td>
        </tr>
    )
}

export default SelectionCard