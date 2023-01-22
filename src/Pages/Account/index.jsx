import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import '../../Styles/Account.css'

const MainContainer = styled.div`
  background-image: linear-gradient(79deg, #7439db, #c66fbc 48%, #f7944d);
  min-height: 100vh;
  overflow: hidden;
`

const StyledTitle = styled.h2`
  margin-bottom: 5rem;
  margin-top: 3rem;
  margin: 3rem;
  font-size: 2.5rem;
  color: white;
  text-align: center;
  @media screen and (max-width: 600px) {
    font-size: 1.5rem;
  }
`

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

function Account() {
  const userId = localStorage.getItem('userId')
  const history = useHistory()

  const deleteAccount = () => {
    fetch(`http://localhost:3000/api/users/${userId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .then(() => localStorage.clear())
      .then(() => history.push('/'))
  }

  return (
    <MainContainer>
      <StyledTitle>Account</StyledTitle>
      <ButtonsWrapper>
        <button className="account-btn" onClick={() => deleteAccount()}>
          Delete account
        </button>
        <Link to={'/'}>
          <button className="account-btn" onClick={() => localStorage.clear()}>
            Sign out
          </button>
        </Link>
      </ButtonsWrapper>
    </MainContainer>
  )
}

export default Account
