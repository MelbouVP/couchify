import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MovieOverview from './Components/Movie-overview/movie-overview.component'
import Navbar from './Components/Navbar/navbar.component'
import Movie from './Components/Movie/movie.component';

import './app.scss';

const App = () => {
  
  return (
    <div>
      {/* <Switch> */}
          <Route path="/">
            <Navbar />
          </Route>
          <Route path='/search' component={MovieOverview}/>
          {/* <MovieOverview /> */}
        <div className="App">
          <Route exact path="/movie/:movieId">
            <Movie />
          </Route>
        </div>
      {/* </Switch> */}
    </div>
  );
}

export default App;
