import React, { useState } from 'react'

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { selectUserProfile } from '../../Redux/user-data/user.selectors'

import SelectionCard from '../../Components/Selection-card/selection-card.component';
import ScrollToTop from '../../Components/ScrollToTop/scroll-to-top.component';


import './profile-page.styles.scss';


const ProfilePage = ({ profile }) => {

    const { name, email, joined, favourite_movies, must_watch_movies } = profile

    const [showOverlay, setShowOverlay] = useState(false)
    const [currentMovie, setCurrentMovie] = useState({name: null, trailerKey: null})


    const handleVideo = (title, trailerKey) => {
        setShowOverlay(true)
        setCurrentMovie({name: title, trailerKey: trailerKey})
    }


    const favouriteMovieItems = favourite_movies.map( movie => <SelectionCard data={movie} handleVideo={handleVideo} key={movie.id} />)

    const mustWatchMovieItems = must_watch_movies.map( movie => <SelectionCard data={movie} handleVideo={handleVideo} key={movie.id} />)

    return (
        <div className='profile-page__container'>
            <ScrollToTop/>
            {
                showOverlay ?
                    <div className='overlay' >
                        <div className="overlay__content">
                                <div className='overlay__close-trailer'>
                                    <iframe title={currentMovie.name} className='overlay__responsive-iframe' width="860" height="500" src={`https://www.youtube.com/embed/${currentMovie.trailerKey}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                    <div className="overlay__close-trailer--btn" onClick={() => setShowOverlay(false)}>

                                    </div>
                                </div>
                        </div>
                    </div>
                :
                    null
            }
            <div className='profile-page__details' >
                <div className='details__user-img'>
                    <img src="https://png.pngtree.com/png-vector/20190623/ourlarge/pngtree-personalpersonalizationprofileuser-abstract-flat-color-ico-png-image_1491346.jpg" alt="user icon"/>
                </div>
                <div className='details__user-bio'>
                    <h1>User profile page.</h1>
                    <ul>
                        <li>Name: {name}</li>
                        <li>Email: {email}</li>
                        <li>Register date: {joined.replace('T',' ').substring(0, 19)}</li>
                    </ul>
                </div>
            </div>
            <div className='profile-page__list'>
                <Tabs>
                    <TabList>
                        <Tab>Favourites</Tab>
                        <Tab>Must-watch</Tab>
                    </TabList>

                    <TabPanel>
                        <table className='profile-page__tab-panel__table'>
                            <thead>
                                <tr className='profile-page__tab-panel__header'>
                                    <th>Details</th>
                                    <th>Title</th>
                                    <th>Release date</th>
                                    <th>Genre</th>
                                    <th>Rating</th>
                                    <th>IMDB</th>
                                    <th>Trailer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    favouriteMovieItems
                                }
                            </tbody>
                        </table>
                    </TabPanel>
                    <TabPanel>
                    <table className='profile-page__tab-panel__table'>
                            <thead>
                                <tr className='profile-page__tab-panel__header'>
                                    <th>Details</th>
                                    <th>Title</th>
                                    <th>Release date</th>
                                    <th>Genre</th>
                                    <th>Rating</th>
                                    <th>IMDB</th>
                                    <th>Trailer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    mustWatchMovieItems
                                }
                            </tbody>
                        </table>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    profile: selectUserProfile
})

export default connect(mapStateToProps)(React.memo(ProfilePage))