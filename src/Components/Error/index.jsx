import styled from 'styled-components'

const ErrorWrapper = styled.div`
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
