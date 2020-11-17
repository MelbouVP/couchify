import React, { useState } from 'react';
import RangeSlider from '../Range-slider/range-slider.component';


import MOVIE_GENRES from './movie-genres';
import './movie-filter.styles.scss';


const MovieFilter = ({ handleSubmit}) => {

    const [sortByValue, setSortByValue ] = useState('popularity.desc')
    const [releaseDateRange, setReleaseDateRange ] = useState([1980,2020])
    const [movieGenres, setMovieGenres ] = useState(MOVIE_GENRES)

    const handleSelectChange = (e) => {
        setSortByValue(e.target.value)
    }

    const handleRangeChange = (dateRange) => {
        setReleaseDateRange(dateRange)
    }

    const handleMovieGenres = (e) => {
        const value = e.target.value

        setMovieGenres( (prevState) => {
            return {...prevState, [value]: !prevState[value]}
        })
    }
    
    return (
        <div className='filter__container'>
            <form onSubmit={(e) => handleSubmit(e, sortByValue, releaseDateRange, movieGenres)}>
            
                <div className="filter-properties">
                    <div className="filter__sort-by">
                        <label htmlFor='sort-by'>Sort results by </label>
                        <select name="sorting" id="sorting" onClick={handleSelectChange}>
                            <option value="popularity.desc">Popularity &#8681;</option>
                            <option value="popularity.asc">Popularity &#8679;</option>
                            <option value="release_date.desc">Release date &darr;</option>
                            <option value="release_date.asc">Release date &uarr;</option>
                            <option value="vote_average.desc">Vote average &darr;</option>
                            <option value="vote_average.asc">Vote average &uarr;</option>
                            <option value="vote_count.desc">Vote count &darr;</option>
                            <option value="vote_count.asc">Vote count &uarr;</option>
                        </select>
                    </div>

                    <div className='filter__slider'>
                        <p>Release date </p>
                        <RangeSlider handleRangeChange={handleRangeChange} />
                    </div>
                </div>
                

                <div className="filter__genres">
                    <p>Genre </p>
                    <ul className="ks-cboxtags">
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxOne" 
                                value="Action" 
                                onClick={handleMovieGenres} 
                                checked={movieGenres.Action}
                                />
                            <label htmlFor="checkboxOne">Action</label>
                        </li>
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxTwo" 
                                value="Adventure" 
                                onChange={handleMovieGenres}
                                checked={movieGenres.Adventure}
                                />
                            <label htmlFor="checkboxTwo">Adventure</label>
                        </li>
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxThree" 
                                value="Animation" 
                                onChange={handleMovieGenres} 
                                checked={movieGenres.Animation}
                                />
                            <label htmlFor="checkboxThree">Animation</label>
                        </li>
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxFour" 
                                value="Comedy" 
                                onChange={handleMovieGenres} 
                                checked={movieGenres.Comedy}
                                />
                            <label htmlFor="checkboxFour">Comedy</label>
                        </li>
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxFive" 
                                value="Crime" 
                                onChange={handleMovieGenres} 
                                checked={movieGenres.Crime}
                                />
                            <label htmlFor="checkboxFive">Crime</label>
                        </li>
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxSix" 
                                value="Documentary" 
                                onChange={handleMovieGenres}
                                checked={movieGenres.Documentary}
                                />
                        <label htmlFor="checkboxSix">Documentary</label></li>
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxSeven" 
                                value="Drama" 
                                onChange={handleMovieGenres} 
                                checked={movieGenres.Drama}
                                />
                            <label htmlFor="checkboxSeven">Drama</label></li>
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxEight" 
                                value="Family" 
                                onChange={handleMovieGenres} 
                                checked={movieGenres.Family}
                                />
                            <label htmlFor="checkboxEight">Family</label>
                        </li>
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxNine" 
                                value="Fantasy" 
                                onChange={handleMovieGenres} 
                                checked={movieGenres.Fantasy}
                                />
                            <label htmlFor="checkboxNine">Fantasy</label>
                        </li>
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxTen" 
                                value="History" 
                                onChange={handleMovieGenres} 
                                checked={movieGenres.History}
                                />
                            <label htmlFor="checkboxTen">History</label>
                        </li>
                        <li className="ks-selected">
                            <input 
                                type="checkbox" 
                                id="checkboxEleven" 
                                value="Horror" 
                                onChange={handleMovieGenres} 
                                checked={movieGenres.Horror}
                                />
                            <label htmlFor="checkboxEleven">Horror</label>
                        </li>
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxTwelve" 
                                value="Music" 
                                onChange={handleMovieGenres} 
                                checked={movieGenres.Music}
                                />
                                <label htmlFor="checkboxTwelve">Music</label>
                            </li>
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxThirteen" 
                                value="Mystery" 
                                onChange={handleMovieGenres} 
                                checked={movieGenres.Mystery}
                                />
                            <label htmlFor="checkboxThirteen">Mystery</label>
                        </li>
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxFourteen" 
                                value="Romance" 
                                onChange={handleMovieGenres} 
                                checked={movieGenres.Romance}
                                />
                            <label htmlFor="checkboxFourteen">Romance</label>
                        </li>
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxFifteen" 
                                value="Science_Fiction" 
                                onChange={handleMovieGenres} 
                                checked={movieGenres.Science_Fiction}
                                />
                            <label htmlFor="checkboxFifteen">Science Fiction</label>
                        </li>   
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxSixteen" 
                                value="TV_Movie" 
                                onChange={handleMovieGenres} 
                                checked={movieGenres.TV_Movie}
                                />
                            <label htmlFor="checkboxSixteen">TV Movie</label>
                        </li>
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxSeventeen" 
                                value="Thriller" 
                                onChange={handleMovieGenres} 
                                checked={movieGenres.Thriller}
                                />
                            <label htmlFor="checkboxSeventeen">Thriller</label>
                        </li>
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxEighteen" 
                                value="War" 
                                onChange={handleMovieGenres} 
                                checked={movieGenres.War}
                                />
                            <label htmlFor="checkboxEighteen">War</label>
                        </li>
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxNineteen" 
                                value="Western" 
                                onChange={handleMovieGenres} 
                                checked={movieGenres.Western}
                                />
                            <label htmlFor="checkboxNineteen">Western</label>
                        </li>
                    </ul>
                </div>

                <div className='filter__submit-btn'>
                    <button type='submit' > Search </button>
                </div>
            </form>
        </div>
    )
}

export default React.memo(MovieFilter);