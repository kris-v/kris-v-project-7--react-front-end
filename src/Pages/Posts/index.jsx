import React, { useState, useEffect } from 'react'
import Card from '../../Components/Card'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { StyledLink } from '../../Styles/Atoms'
import HomeIllustration from '../../assets/icon-left-font-monochrome-black.png'
import colors from '../../Styles/colors'

const MainContainer = styled.div`
  background-image: linear-gradient(79deg, #7439db, #c66fbc 48%, #f7944d);
  min-height: 100vh;
`

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
`

const StyledImage = styled.img`
  height: 30vh;
`

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
      <MainContainer>
        <h2>Here all the posts! 😎</h2>
        <StyledImage src={HomeIllustration} alt="Company logo" />
        <Link to={'/upload'}>
          <button>Create a post</button>
        </Link>
        <CardsContainer>
          {postsData.map((post) => (
            <StyledLink
              to={`/posts/${post.post_id}`}
              key={`${post.post_id}`}
              onClick={() => addIdToUsersReadArray(userId)}
            >
              {/* {post.users_read.includes(userId) ? null : <span>New</span>} */}
              <Card
                title={post.title}
                seen={post.users_read.includes(userId) ? null : 'New'}
                userName={post.username}
                postId={post.post_id}
                createdDate={post.created_at.substring(0, 10)}
                onClick={() => console.log(post.post_id)}
              />
            </StyledLink>
          ))}
        </CardsContainer>
      </MainContainer>
    )
  }
}

export default PostsListView
