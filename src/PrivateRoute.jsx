import React from 'react'
import { Redirect, Route, useLocation } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import ScrollToTop from './Components/ScrollToTop'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const location = useLocation()
  const jwt = localStorage.getItem('userToken')

  return (
    <Route {...rest}>
      {jwt && jwt !== undefined ? (
        <div>
          <ScrollToTop />
          <Header />
          <Component />
          <Footer />
        </div>
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: location } }} />
      )}
    </Route>
  )
}

export default PrivateRoute
