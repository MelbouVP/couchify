import React from 'react';
import { Route } from 'react-router-dom';

import HomePage from './Pages/Home-page/home-page.component'
// import SearchPage from './Pages/Search-page/search-page.component';
import FilterPage from './Pages/Filter-page/filter-page.component';

import MovieOverview from './Components/Movie-overview/movie-overview.component'
import Navbar from './Components/Navbar/navbar.component'
import Movie from './Components/Movie/movie.component';

import './app.scss';

const App = () => {
  
  return (
    <div>
      {/* <Switch> */}
          <Navbar />
          <Route exact path="/" component={HomePage} />
          <Route path='/search' component={MovieOverview}/>
          {/* <Route path='/search' component={SearchPage}/> */}
          <Route path='/filter' component={FilterPage}/>
        <div className="App">
          <Route exact path="/movie/:movieId" component={Movie} />
        </div>
    </div>
  );
}

export default App;
