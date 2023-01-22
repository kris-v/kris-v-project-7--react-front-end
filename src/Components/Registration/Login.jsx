import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import '../../Styles/Auth.css'

let authenticatedStatus = false

export function Login(props) {
  let location = useLocation()
  let history = useHistory()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  let userToken = ''
  let userId = ''
  let userName = ''
  let responseMessage = ''

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const fetchUserCredentials = () => {
    fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: `${email}`,
        password: `${pass}`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === 'User not found' || userId === undefined) {
          setError(true)
          setErrorMessage(res.message)
          return null
        }
        if (res.message === 'Incorrect password') {
          setError(true)
          setErrorMessage(res.message)
          return null
        }
        console.log(res)
        console.log(res.user_id)
        userId = res.user_id
        userName = res.username
        userToken = res.token
        authenticatedStatus = true
        console.log({ authStatus: authenticatedStatus })
        responseMessage = res.message
        console.log({ userId: userId }, userToken)
        console.log(history)
        console.log(location)
      })
      .then(() => {
        localStorage.setItem('userId', `${userId}`)
        localStorage.setItem('userName', `${userName}`)
        localStorage.setItem('userToken', `${userToken}`)
      })
      .then(() => {
        if (userToken) {
          console.log(authenticatedStatus)
          console.log(responseMessage)
          history.push('/')
        }
      })
  }

  return (
    <div className="auth-form-container">
      <h4 className="error-message">{error ? errorMessage : ''}</h4>
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@example.com"
          id="email"
          name="email"
        ></input>
        <label htmlFor="password">password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="password"
          id="password"
          name="password"
        ></input>
        <button
          type="click"
          onClick={() => fetchUserCredentials()}
          disabled={email && pass ? false : true}
        >
          Log In
        </button>
      </form>
      <button
        className="link-btn"
        onClick={() => props.onFormSwitch('register')}
      >
        Don't have an account? Register here
      </button>
    </div>
  )
}

export const authentication = {
  authenticatedStatus: authenticatedStatus,
}
