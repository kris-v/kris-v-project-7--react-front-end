import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { StyledLink } from '../../Styles/Atoms'
import '../../Styles/Home.css'

const HomeWrapper = styled.div`
  background-image: linear-gradient(79deg, #7439db, #c66fbc 48%, #f7944d);
  display: flex;
  text-align: center;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  color: white;
  font-size: 3rem;
`

const StyledTitle = styled.h2`
  margin-bottom: 5rem;
  margin-top: 3rem;
`

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

function Home() {
  const [isDataLoading, setDataLoading] = useState(false)
  const jwt = localStorage.getItem('userToken')
  const userName = localStorage.getItem('userName')

  if (jwt) {
    return (
      <HomeWrapper>
        <StyledTitle>Hello {userName}</StyledTitle>
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
      <StyledLink to="/login">Log In</StyledLink>
    </HomeWrapper>
  )
}

export default Home
