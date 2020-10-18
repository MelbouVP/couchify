import React from 'react';
import { Route } from 'react-router-dom';

import HomePage from './Pages/Home-page/home-page.component'
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
        <div className="App">
          <Route exact path="/movie/:movieId">
            <Movie />
          </Route>
        </div>
    </div>
  );
}

export default App;
