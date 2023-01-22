import React, { useState, useEffect } from 'react'
import Card from '../../Components/Card'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { StyledLink, Loader } from '../../Styles/Atoms'
import HomeIllustration from '../../assets/icon-left-font-monochrome-black.png'
import '../../Styles/Posts.css'

const MainContainer = styled.div`
  background-image: linear-gradient(79deg, #7439db, #c66fbc 48%, #f7944d);
  min-height: 100vh;
  overflow: hidden;
`

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-content: flex-start;
  max-width: 800px;
  height: 100%;
  margin: 0 auto;
  margin-top: 2rem;
  padding-bottom: 3rem;
`

const StyledImage = styled.img`
  height: 160px;
`

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const UnauthorizedMessage = styled.div`
  font-style: normal;
  margin-bottom: 3rem;
`

const MessageWrapper = styled.div`
  background-image: linear-gradient(79deg, #7439db, #c66fbc 48%, #f7944d);
  color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 5rem;
  align-items: center;
  justify-content: flex-start;
`

const StyledTitle = styled.h2`
  margin-bottom: 5rem;
  margin-top: 3rem;
  margin: 3rem;
  font-size: 2rem;
  text-align: center;
  @media screen and (max-width: 600px) {
    font-size: 1.5rem;
  }
`

function PostsListView() {
  const [postsData, setPostsData] = useState([])
  const [isDataLoading, setDataLoading] = useState(false)
  const [error, setError] = useState(false)
  const jwt = localStorage.getItem('userToken')
  const userId = parseInt(localStorage.getItem('userId'))

  const convetDate = (date) => {
    const postDate = new Date(date.substring(0, 10))
    const postDateString = postDate.toDateString()
    return postDateString
  }

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
        console.log(error)
      } finally {
        setDataLoading(false)
      }
    }
    fetchPosts()
  }, [error, jwt])

  if (postsData.length === undefined) {
    return (
      <MessageWrapper>
        <UnauthorizedMessage>
          <StyledTitle>
            The content you are trying to access is restricted to registered
            users. Please log in to view posts.
          </StyledTitle>
        </UnauthorizedMessage>
        <StyledLink to="/login">
          <button>Click here to Log In</button>
        </StyledLink>
      </MessageWrapper>
    )
  } else {
    return (
      <MainContainer>
        <div className="upper-container">
          <div className="img-container">
            <StyledImage src={HomeIllustration} alt="Company logo" />
          </div>
          <Link className="create-post-btn" to={'/upload'}>
            <button>Create a post</button>
          </Link>
        </div>
        {isDataLoading ? (
          <LoaderWrapper>
            <Loader></Loader>
          </LoaderWrapper>
        ) : (
          <CardsContainer>
            {postsData.length === 0 ? (
              <div className="message-wrapper">
                <h4 className="no-posts-message">
                  There are currently no published posts
                </h4>
              </div>
            ) : null}
            {postsData.map((post) => (
              <StyledLink
                to={`/posts/${post.post_id}`}
                key={`${post.post_id}`}
                onClick={() => addIdToUsersReadArray(userId)}
              >
                <Card
                  title={post.title}
                  seen={
                    post.user_id === userId || post.users_read.includes(userId)
                      ? null
                      : 'New'
                  }
                  userName={post.username}
                  postId={post.post_id}
                  createdDate={convetDate(post.created_at).substring(4, 15)}
                  onClick={() => console.log(post.post_id)}
                />
              </StyledLink>
            ))}
          </CardsContainer>
        )}
      </MainContainer>
    )
  }
}

export default PostsListView
