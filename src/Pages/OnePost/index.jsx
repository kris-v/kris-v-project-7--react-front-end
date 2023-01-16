import logo from '../../assets/icon.png'
import { useParams, useRouteMatch } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function OnePost(props) {
  const [singlePostData, setSinglePostData] = useState([])
  const { post_id } = useParams()
  console.log(useRouteMatch())

  const deleteGif = () => {
    fetch(`http://localhost:3000/api/posts/${post_id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
  }

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/posts/${post_id}`
        )
        const data = await response.json()
        setSinglePostData(data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchPosts()
  }, [])

  // useEffect(() => {
  //   fetch(`http://localhost:3000/api/posts/${post_id}`)
  //     .then((res) => res.json())
  //     .then((data) => setSinglePostData(data))
  //     .then(console.log(singlePostData))
  // }, [])

  if (!singlePostData[0]) {
    return (
      <h2>
        Oops... It looks like you are not authorized to view this content.
      </h2>
    )
  } else {
    return (
      <div>
        <h1>This is a single GIF 🌆</h1>
        <h2>The post ID is {post_id}</h2>
        <p>{singlePostData[0].title}</p>
        <img src={singlePostData[0].image_url} alt="GIF" />
        <Link to={'/posts'}>
          <button onClick={() => deleteGif()}>Delete Post</button>
        </Link>
      </div>
    )
  }
}

export default OnePost
