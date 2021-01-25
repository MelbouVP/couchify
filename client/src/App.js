import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import ErrorBoundary from './Pages/Error-page/error-page.component';
import ProtectedRoute from './Components/Protected-route/protected-route.component';
import PageSpinner from './Components/Page-spinner/page-spinner.component';

// import Navbar from './Components/Navbar/navbar.component';
// import Footer from './Components/Footer/footer.component';

import './app.scss';

const HomePage = lazy(() => import('./Pages/Home-page/home-page.component'))
const SearchPage = lazy(() => import('./Pages/Search-page/search-page.component'))
const FilterPage = lazy(() => import('./Pages/Filter-page/filter-page.component'))

const LoginPage = lazy(() => import('./Pages/Login-page/login-page.component'))
const RegisterPage = lazy(() => import('./Pages/Register-page/register-page.component'))
const ProfilePage = lazy(() => import('./Pages/Profile-page/profile-page.component'))

const MovieSectionPage = lazy(() => import('./Pages/MovieSection-page/movie-section-page.component'))

const Navbar =  lazy(() => import('./Components/Navbar/navbar.component'))
const Footer =  lazy(() => import('./Components/Footer/footer.component'))



const App = () => {
  
  return (
    <div className="App">
      <ErrorBoundary>
            <Suspense fallback={<PageSpinner />}>
          <Navbar />
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path='/search' component={SearchPage}/>
                <Route path='/filter' component={FilterPage}/>
                <Route path='/login' component={LoginPage} />
                <Route path='/register' component={RegisterPage} />
                <Route exact path="/movie/:movieId" component={MovieSectionPage}/>
                <ProtectedRoute path='/profile' >
                  <ProfilePage />
                </ProtectedRoute>
              </Switch>
          <Footer />
            </Suspense>
        <ToastContainer />
      </ErrorBoundary>
    </div>
  );
}

export default App;
