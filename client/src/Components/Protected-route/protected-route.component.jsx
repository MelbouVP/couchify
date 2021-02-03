
import React from 'react';
import { Route, Redirect } from 'react-router-dom' 

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUserIsAuthenticated } from '../../Redux/user-data/user.selectors'


const ProtectedRoute = ({ children, isAuthenticated, ...rest }) => {

  // ProtectedRoute component is responsible for controlling access to routes that require user to be authenticated.

  // props = {
  //   children, // protected components/routes - displayed to authenticated users
  //   isAuthenticated,  // (redux)
  //   ...rest // props to be passed for route i.e. path='xx', see app.js
  // }


    return (
      <Route {...rest} render={() => {
        return isAuthenticated === true
          ? children
          : <Redirect to='/login' />
      }} />
    )
}

const mapStateToProps = createStructuredSelector({
    isAuthenticated: selectUserIsAuthenticated
})

export default connect(mapStateToProps)(React.memo(ProtectedRoute))