import styled from 'styled-components'

const ErrorWrapper = styled.div`
  background-image: linear-gradient(79deg, #7439db, #c66fbc 48%, #f7944d);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`

function Error() {
  return (
    <ErrorWrapper>
      <h1>This page does not exist 😥</h1>
    </ErrorWrapper>
  )
}

export default Error
