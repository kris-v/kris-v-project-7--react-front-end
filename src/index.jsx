import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Pages/Home'
import PostsListView from './Pages/Posts'
import OnePost from './Pages/OnePost'
import Upload from './Pages/Upload'
import Account from './Pages/Account'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Error from './Components/Error'
import ScrollToTop from './Components/ScrollToTop'
import Auth from './Components/Registration/Auth'
import PrivateRoute from './PrivateRoute'
import GlobalStyle from './Styles/GlobalStyle'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Router>
      <GlobalStyle />
      <Switch>
        <Route exact path="/">
          <ScrollToTop />
          <Header />
          <Home />
          <Footer />
        </Route>
        <Route exact path="/login">
          <Header />
          <Auth />
          <Footer />
        </Route>
        <Route exact path="/posts">
          <ScrollToTop />
          <Header />
          <PostsListView />
          <Footer />
        </Route>
        <Route path="/posts/:post_id">
          <ScrollToTop />
          <Header />
          <OnePost />
          <Footer />
        </Route>
        <PrivateRoute path="/upload" component={Upload} />
        <PrivateRoute path="/account" component={Account} />
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>
)
