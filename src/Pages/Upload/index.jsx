import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { StyledLink } from '../../Styles/Atoms'
import styled from 'styled-components'
import HomeIllustration from '../../assets/icon-left-font-monochrome-black.png'
import '../../Styles/Upload.css'

const MainContainer = styled.div`
  background-image: linear-gradient(79deg, #7439db, #c66fbc 48%, #f7944d);
  min-height: 100vh;
  overflow: hidden;
`

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const TextareaWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledImage = styled.img`
  height: 160px;
`

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

function Upload() {
  const jwt = localStorage.getItem('userToken')
  const userId = localStorage.getItem('userId')
  const userName = localStorage.getItem('userName')
  const [postContent, setPostContent] = useState('')
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
        username: userName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Post has been published successfully!') {
          console.log(data.message)
          history.push('posts')
        } else {
          setErrorMessage(data.message)
          console.log(errorMessage)
        }
      })
  }

  return (
    <MainContainer>
      <div className="upper-container">
        <div className="img-container">
          <StyledImage src={HomeIllustration} alt="Company logo" />
        </div>
      </div>
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <TextareaWrapper>
            <textarea
              value={postContent}
              onChange={(e) => {
                setPostContent(e.target.value)
              }}
            ></textarea>
          </TextareaWrapper>
        </form>
        <ButtonsWrapper>
          <StyledLink to={'/posts'}>
            <button>Back</button>
          </StyledLink>
          <button
            className="form-btn"
            type="submit"
            onClick={() => sendPostData()}
            disabled={postContent ? false : true}
          >
            Share
          </button>
        </ButtonsWrapper>
      </FormWrapper>
    </MainContainer>
  )
}

export default Upload
