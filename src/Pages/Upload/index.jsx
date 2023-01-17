import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

function Upload() {
  const jwt = localStorage.getItem('userToken')
  const userId = localStorage.getItem('userId')
  const [postContent, setPostContent] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  let history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const sendPostData = () => {
    fetch('http://localhost:3000/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt,
      },
      body: JSON.stringify({
        title: `${postContent}`,
        users_read: [0],
        user_id: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Post has been published successfully!') {
          console.log(data.message)
          history.push('posts')
        } else {
          setError(true)
          setErrorMessage(data.message)
        }
      })
  }

  return (
    <div>
      <h2>Upload GIF</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postContent">Share something cool</label>
        <input
          type="text"
          name="postContent"
          id="postContent"
          onChange={(e) => {
            setPostContent(e.target.value)
          }}
        ></input>
        <label htmlFor="postAuthor">Posted by</label>
        <button
          type="submit"
          onClick={() => sendPostData()}
          disabled={postContent ? false : true}
        >
          Share
        </button>
      </form>
    </div>
  )
}

export default Upload
