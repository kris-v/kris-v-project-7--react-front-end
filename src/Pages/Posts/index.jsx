import React, { useState, useEffect } from 'react'
import Card from '../../Components/Card'
import { Link } from 'react-router-dom'

function PostsListView() {
  const [postsData, setPostsData] = useState([])
  const [isDataLoading, setDataLoading] = useState(false)
  const [error, setError] = useState(false)

  // useEffect(() => {
  //   fetch('http://localhost:3000/api/posts')
  //     .then((response) => response.json())
  //     .then((data) => console.log(data))
  // }, [])

  useEffect(() => {
    async function fetchPosts() {
      setDataLoading(true)
      try {
        const response = await fetch('http://localhost:3000/api/posts')
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

  if (error) {
    return <span>Looks like there is an error!</span>
  }

  return (
    <div>
      <h2>Here all the posts! 😎</h2>
      <Link to={'/upload'}>
        <button>Upload GIF</button>
      </Link>
      {postsData.map((post) => (
        <Link to={`/posts/${post.post_id}`} key={`${post.post_id}`}>
          <Card
            title={post.title}
            postId={post.post_id}
            image={post.image_url}
            onClick={() => console.log(post.post_id)}
          />
        </Link>
      ))}
    </div>
  )
}

export default PostsListView
