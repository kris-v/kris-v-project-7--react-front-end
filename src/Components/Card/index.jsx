import '../../Styles/Card.css'

function Card({ postId, title, userName }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>By: {userName}</p>
    </div>
  )
}

export default Card
