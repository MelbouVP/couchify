
import React from 'react';
import { Route, Redirect } from 'react-router-dom' 

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUserIsAuthenticated } from '../../Redux/user-data/user.selectors'


const ProtectedRoute = ({ children, isAuthenticated, ...rest }) => {
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