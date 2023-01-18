import '../../Styles/Card.css'
import styled from 'styled-components'
import colors from '../../Styles/colors'

const CardLabel = styled.span`
  color: ${colors.primary};
  font-size: 1.3rem;
  font-weight: normal;
  padding-left: 0.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0.9rem;
  margin: 1.2rem;
  background-color: ${colors.backgroundLight};
  border-radius: 30px;
  width: 300px;
  height: 150px;
  transition: 200ms;
  &:hover {
    cursor: pointer;
    box-shadow: 2px 2px 10px #e2e3e9;
  }
`
const CardNotification = styled.span`
  color: white;
  background-color: #7439db;
  text-align: right;
  width: fit-content;
  padding: 0.3rem;
  border-radius: 10px;
`

const PostInfo = styled.span`
  font-style: italic;
`

function Card({ title, userName, createdDate, seen }) {
  return (
    <CardWrapper>
      {seen && <CardNotification>{seen}</CardNotification>}
      <CardLabel>{title}</CardLabel>
      <PostInfo>
        Posted by {userName} on {createdDate}
      </PostInfo>
    </CardWrapper>
  )
}

export default Card
