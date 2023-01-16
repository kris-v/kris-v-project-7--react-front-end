import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [postsData, setPostsData] = useState([])
  const [isDataLoading, setDataLoading] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div>
      <h2>Home page! 🏡</h2>
    </div>
  )
}

export default Home
