import React from 'react';
import { Route } from 'react-router-dom';

import HomePage from './Pages/Home-page/home-page.component'
import SearchPage from './Pages/Search-page/search-page.component';
import FilterPage from './Pages/Filter-page/filter-page.component';
import ErrorBoundary from './Pages/Error-page/error-page.component';

import Navbar from './Components/Navbar/navbar.component';
import Footer from './Components/Footer/footer.component';
import MovieSection from './Components/Movie-section/movie-section.component';

import './app.scss';

const App = () => {
  
  return (
    <div className="App">
      {/* <Switch> */}
      <ErrorBoundary>
        <Navbar />
            <Route exact path="/" component={HomePage} />
            <Route path='/search' component={SearchPage}/>
            <Route path='/filter' component={FilterPage}/>
            <Route exact path="/movie/:movieId" component={MovieSection}/>
        <Footer />
      </ErrorBoundary>

    </div>
  );
}

export default App;
