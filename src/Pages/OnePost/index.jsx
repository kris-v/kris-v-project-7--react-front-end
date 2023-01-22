import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { StyledLink } from '../../Styles/Atoms'
import styled from 'styled-components'
import colors from '../../Styles/colors'
import '../../Styles/OnePost.css'

const MainWrapper = styled.div`
  background-image: linear-gradient(79deg, #7439db, #c66fbc 48%, #f7944d);
  min-height: 100vh;
  padding-top: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
`

const CardWrapper = styled.div`
  display: flex;
  background-color: blue;
  flex-direction: column;
  justify-content: space-around;
  padding: 1.4rem;
  margin: 1.2rem;
  background-color: ${colors.backgroundLight};
  border-radius: 30px;
  width: 80%;
  max-width: 700px;
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

function OnePost() {
  const [singlePostData, setSinglePostData] = useState([])
  const { post_id } = useParams()
  const jwt = localStorage.getItem('userToken')
  const userId = parseInt(localStorage.getItem('userId'))

  const deleteGif = () => {
    fetch(`http://localhost:3000/api/posts/${post_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt,
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
  }

  useEffect(() => {
    let usersRead = []
    async function fetchPosts() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/posts/${post_id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + jwt,
            },
          }
        )
        const data = await response.json()
        setSinglePostData(data)
        // console.log(singlePostData)
        usersRead = data[0].users_read
        if (!usersRead.includes(userId)) {
          usersRead.push(userId)
          console.log(usersRead)
          fetch(`http://localhost:3000/api/posts/${post_id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + jwt,
            },
            body: JSON.stringify({
              users_read: usersRead,
            }),
          })
            .then((res) => res.json())
            .then((data) => console.log(data))
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchPosts()
  }, [jwt, post_id, userId])

  if (!singlePostData[0]) {
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
      <MainWrapper>
        <h3>From {singlePostData[0].username}</h3>
        <CardWrapper>
          <p className="content-box">{singlePostData[0].title}</p>
        </CardWrapper>
        <ButtonsWrapper>
          <StyledLink to={'/posts'}>
            <button>Back</button>
          </StyledLink>
          {userId === singlePostData[0].user_id && (
            <StyledLink to={'/posts'}>
              <button onClick={() => deleteGif()}>Delete Post</button>
            </StyledLink>
          )}
        </ButtonsWrapper>
      </MainWrapper>
    )
  }
}

export default OnePost
