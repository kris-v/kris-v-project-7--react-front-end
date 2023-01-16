import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Account() {
  const userId = localStorage.getItem('userId')
  // const { user_id } = useParams

  const deleteAccount = () => {
    fetch(`http://localhost:3000/api/users/${userId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .then(() => localStorage.clear())
  }

  return (
    <div>
      <h1>Account</h1>
      <Link to={'/'}>
        <button onClick={() => deleteAccount()}>Delete account</button>
      </Link>
      <Link to={'/'}>
        <button onClick={() => localStorage.clear()}>Sign out</button>
      </Link>
    </div>
  )
}

export default Account
