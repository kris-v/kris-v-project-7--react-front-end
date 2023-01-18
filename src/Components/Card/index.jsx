import '../../Styles/Card.css'

function Card({ postId, title, userName, createdDate }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>
        Posted by {userName} on {createdDate}
      </p>
    </div>
  )
}

export default Card
