import React, { useState } from 'react';
import axios from 'axios';
import RangeSlider from '../Range-slider/range-slider.component';


import MOVIE_GENRES from './movie-genres';
import './movie-filter.styles.scss';


const MovieFilter = () => {

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
            return {...prevState, [value]: !prevState.[value]}
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:3001/api/filter',
                data: {
                  sortBy: sortByValue,
                  releaseDate: releaseDateRange,
                  genres: movieGenres
                }
            })

            console.log(response)
        } catch (error){
            console.log(error)
        }
    }
    
    return (
        <div className='container__filter'>
            <h2>This is filtering section</h2>

            <form onSubmit={handleSubmit}>
                {/* <h3>Sort By: </h3> */}
                <label htmlFor='sort-by'>Sort results by: </label>
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

                <div className='movie-filter__slider'>
                    <h3>Release date </h3>
                    <RangeSlider handleRangeChange={handleRangeChange} />
                </div>

                <div className="movie-filter__genres">
                    <h3>Genre </h3>
                    <ul className="ks-cboxtags">
                        <label htmlFor=""></label>
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxOne" 
                                value="Action" 
                                onChange={handleMovieGenres} />
                            <label htmlFor="checkboxOne">Action</label>
                        </li>
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxTwo" 
                                value="Adventure" 
                                onChange={handleMovieGenres}/>
                            <label htmlFor="checkboxTwo">Adventure</label>
                        </li>
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxThree" 
                                value="Animation" 
                                onChange={handleMovieGenres} />
                            <label htmlFor="checkboxThree">Animation</label>
                        </li>
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxFour" 
                                value="Comedy" 
                                onChange={handleMovieGenres} />
                            <label htmlFor="checkboxFour">Comedy</label>
                        </li>
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxFive" 
                                value="Crime" 
                                onChange={handleMovieGenres} />
                            <label htmlFor="checkboxFive">Crime</label>
                        </li>
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxSix" 
                                value="Documentary" 
                                onChange={handleMovieGenres} />
                        <label htmlFor="checkboxSix">Documentary</label></li>
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxSeven" 
                                value="Drama" 
                                onChange={handleMovieGenres} />
                            <label htmlFor="checkboxSeven">Drama</label></li>
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxEight" 
                                value="Family" 
                                onChange={handleMovieGenres} />
                            <label htmlFor="checkboxEight">Family</label>
                        </li>
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxNine" 
                                value="Fantasy" onChange={handleMovieGenres} />
                            <label htmlFor="checkboxNine">Fantasy</label>
                        </li>
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxTen" 
                                value="History" 
                                onChange={handleMovieGenres} />
                            <label htmlFor="checkboxTen">History</label>
                        </li>
                        <li className="ks-selected">
                            <input 
                                type="checkbox" 
                                id="checkboxEleven" 
                                value="Horror" 
                                onChange={handleMovieGenres} />
                            <label htmlFor="checkboxEleven">Horror</label>
                        </li>
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxTwelve" 
                                value="Music" 
                                onChange={handleMovieGenres} />
                                <label htmlFor="checkboxTwelve">Music</label>
                            </li>
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxThirteen" 
                                value="Mystery" 
                                onChange={handleMovieGenres} />
                            <label htmlFor="checkboxThirteen">Mystery</label>
                        </li>
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxFourteen" 
                                value="Romance" 
                                onChange={handleMovieGenres} />
                            <label htmlFor="checkboxFourteen">Romance</label>
                        </li>
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxFifteen" 
                                value="Science_Fiction" 
                                onChange={handleMovieGenres} />
                            <label htmlFor="checkboxFifteen">Science Fiction</label>
                        </li>   
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxSixteen" 
                                value="TV_Movie" 
                                onChange={handleMovieGenres} />
                            <label htmlFor="checkboxSixteen">TV Movie</label>
                        </li>
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxSeventeen" 
                                value="Thriller" 
                                onChange={handleMovieGenres} />
                            <label htmlFor="checkboxSeventeen">Thriller</label>
                        </li>
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxEighteen" 
                                value="War" 
                                onChange={handleMovieGenres} />
                            <label htmlFor="checkboxEighteen">War</label>
                        </li>
                        <li>
                            <input 
                                type="checkbox" 
                                id="checkboxNineteen" 
                                value="Western" 
                                onChange={handleMovieGenres} />
                            <label htmlFor="checkboxNineteen">Western</label>
                        </li>
                    </ul>
                </div>

                <button type='submit' >SEARCH</button>
            </form>
        </div>
    )
}

export default React.memo(MovieFilter);