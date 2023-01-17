import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [isDataLoading, setDataLoading] = useState(false)
  const jwt = localStorage.getItem('userToken')

  if (jwt) {
    return <h2>Home page! 🏡</h2>
  }
  return (
    <div>
      <h2>Home page! 🏡</h2>
      <Link to="/login">Log In</Link>
    </div>
  )
}

export default Home
