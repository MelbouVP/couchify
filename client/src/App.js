import React from 'react';
import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from './Pages/Home-page/home-page.component'
import SearchPage from './Pages/Search-page/search-page.component';
import FilterPage from './Pages/Filter-page/filter-page.component';
import LoginPage from './Pages/Login-page/login-page.component'
import RegisterPage from './Pages/Register-page/register-page.component'
import ProfilePage from './Pages/Profile-page/profile-page.component'
import ErrorBoundary from './Pages/Error-page/error-page.component';
import ProtectedRoute from './Components/Protected-route/protected-route.component'

import Navbar from './Components/Navbar/navbar.component';
import Footer from './Components/Footer/footer.component';
import MovieSection from './Pages/MovieSection-page/movie-section-page.component'

import './app.scss';

const App = () => {
  
  return (
    <div className="App">
      <ErrorBoundary>
        <Navbar />
            <Route exact path="/" component={HomePage} />
            <Route path='/search' component={SearchPage}/>
            <Route path='/filter' component={FilterPage}/>
            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={RegisterPage} />
            <Route exact path="/movie/:movieId" component={MovieSection}/>
            <ProtectedRoute path='/profile' >
              <ProfilePage />
            </ProtectedRoute>
        <Footer />
        <ToastContainer />
      </ErrorBoundary>
    </div>
  );
}

export default App;
