import React from 'react'
import { Redirect, Route, useLocation } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const location = useLocation()
  const jwt = localStorage.getItem('userToken')

  return (
    <Route {...rest}>
      {jwt && jwt !== undefined ? (
        <Component />
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: location } }} />
      )}
    </Route>
  )
}

export default PrivateRoute
