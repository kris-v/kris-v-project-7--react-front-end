import '../../Styles/Card.css'

function Card({ postId, title, image }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{postId}</p>
      <img src={image} alt="GIF illustration" />
    </div>
  )
}

export default Card
