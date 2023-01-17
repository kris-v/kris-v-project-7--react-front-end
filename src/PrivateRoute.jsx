import React from 'react'
import { Redirect, Route, useLocation } from 'react-router-dom'
import Header from './Components/Header'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const location = useLocation()
  const jwt = localStorage.getItem('userToken')

  return (
    <Route {...rest}>
      {jwt && jwt !== undefined ? (
        <div>
          <Header />
          <Component />
        </div>
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: location } }} />
      )}
    </Route>
  )
}

export default PrivateRoute
