import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { StyledLink } from '../../Styles/Atoms'
import RedLogo from '../../assets/icon.svg'
import colors from '../../Styles/colors'
import '../../Styles/Header.css'

const HomeLogo = styled.img`
  height: 80px;
`

const NavContainer = styled.nav`
  padding: 10px;
  display: flex;
  justify-content: left;
  align-items: center;
  position: sticky;
  top: 0%;
  background-color: white;
  border-bottom: 1px solid ${colors.backgroundDark};
`

function Header() {
  const jwt = localStorage.getItem('userToken')
  return (
    <NavContainer>
      <Link to="/">
        <HomeLogo src={RedLogo} />
      </Link>
      <StyledLink to="/">Home</StyledLink>
      {jwt ? <StyledLink to="/posts">Posts</StyledLink> : null}
      <StyledLink to="/account">Account</StyledLink>
    </NavContainer>
  )
}

export default Header
