import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

function Account() {
  const userId = localStorage.getItem('userId')
  const history = useHistory()
  // const { user_id } = useParams

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
    <div>
      <h1>Account</h1>
      <button onClick={() => deleteAccount()}>Delete account</button>
      <Link to={'/'}>
        <button onClick={() => localStorage.clear()}>Sign out</button>
      </Link>
    </div>
  )
}

export default Account
