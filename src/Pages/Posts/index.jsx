import React, { useState, useEffect } from 'react'
import Card from '../../Components/Card'
import { Link } from 'react-router-dom'

function PostsListView() {
  const [postsData, setPostsData] = useState([])
  // const [usersRead, setUsersRead] = useState([])
  const [isDataLoading, setDataLoading] = useState(false)
  const [error, setError] = useState(false)
  const jwt = localStorage.getItem('userToken')
  const userId = parseInt(localStorage.getItem('userId'))

  const addIdToUsersReadArray = () => {
    console.log('testing usersRead callback')
  }

  useEffect(() => {
    async function fetchPosts() {
      setDataLoading(true)
      try {
        const response = await fetch('http://localhost:3000/api/posts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + jwt,
          },
        })
        const data = await response.json()
        setPostsData(data)
        console.log(data)
      } catch (err) {
        console.log('==== error ====', err)
        setError(true)
      } finally {
        setDataLoading(true)
      }
    }
    fetchPosts()
  }, [])

  if (postsData.length === undefined) {
    return (
      <div>
        <h2>Oops... Content restricted to registered users. Please log in.</h2>
        <Link to="/login">Click here to Log In</Link>
      </div>
    )
  } else {
    return (
      <div>
        <h2>Here all the posts! 😎</h2>
        <Link to={'/upload'}>
          <button>Create a post</button>
        </Link>
        {postsData.map((post) => (
          <Link
            to={`/posts/${post.post_id}`}
            key={`${post.post_id}`}
            onClick={() => addIdToUsersReadArray(userId)}
          >
            {post.users_read.includes(userId) ? null : <span>New</span>}
            <Card
              title={post.title}
              userName={post.username}
              postId={post.post_id}
              onClick={() => console.log(post.post_id)}
            />
          </Link>
        ))}
      </div>
    )
  }
}

export default PostsListView
