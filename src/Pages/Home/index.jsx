import React from 'react'
import styled from 'styled-components'
import { StyledLink } from '../../Styles/Atoms'
import '../../Styles/Home.css'
import HomeIllustration from '../../assets/icon-left-font-monochrome-black.png'

const HomeWrapper = styled.div`
  background-image: linear-gradient(79deg, #7439db, #c66fbc 48%, #f7944d);
  display: flex;
  text-align: center;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  color: white;
  font-size: 2rem;
`

const StyledImage = styled.img`
  height: 160px;
`

const StyledTitle = styled.h2`
  margin-bottom: 5rem;
  margin-top: 3rem;
  margin: 3rem;
  font-size: 2.5rem;
  @media screen and (max-width: 600px) {
    font-size: 1.5rem;
  }
`

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

function Home() {
  const jwt = localStorage.getItem('userToken')
  const userName = localStorage.getItem('userName')

  if (jwt) {
    return (
      <HomeWrapper>
        <StyledImage src={HomeIllustration} alt="Company logo" />
        <StyledTitle className="home-title">Hello {userName}.</StyledTitle>
        <ButtonsWrapper>
          <StyledLink to="/posts">
            <button className="home-btn">View posts</button>
          </StyledLink>
          <StyledLink to="/upload">
            <button className="home-btn">Create a post</button>
          </StyledLink>
        </ButtonsWrapper>
      </HomeWrapper>
    )
  }
  return (
    <HomeWrapper>
      <img className="logoImg" src={HomeIllustration} alt="Company logo" />
      <StyledTitle>
        Welcome to Groupomania, where the most exciting experiences are shared.
      </StyledTitle>
      <StyledLink to="/login">
        <button>Log In</button>
      </StyledLink>
    </HomeWrapper>
  )
}

export default Home
