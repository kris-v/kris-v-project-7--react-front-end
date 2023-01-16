import React, { useState, useEffect } from 'react'
import { Redirect, useHistory, useLocation } from 'react-router-dom'
import '../../Styles/Auth.css'

let authenticatedStatus = false

export function Login(props) {
  let location = useLocation()
  let history = useHistory()
  // const { from } = state || { from: { pathname: '/' } }
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  // const [userId, setUserId] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState(false)

  let userToken = ''
  let userId = ''
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
        console.log(res)
        console.log(res.user_id)
        userId = res.user_id
        userToken = res.token
        authenticatedStatus = true
        console.log({ authStatus: authenticatedStatus })
        responseMessage = res.message
        setIsAuthenticated(true)
        // setUserId(res.user_id)
        console.log({ userId: userId }, userToken)
        console.log(history)
        console.log(location)
      })
      .then(() => {
        localStorage.setItem('userId', `${userId}`)
        localStorage.setItem('userToken', `${userToken}`)
      })
      .then(() => {
        if (userToken) {
          // setIsAuthenticated(true)
          console.log(authenticatedStatus)
          console.log(responseMessage)
          history.push('account')
          // console.log(state)
          // return <Redirect to={state.from.pathname} />
        }
      })
  }

  // {
  //   if (res.message === 'Login successful') {
  //     console.log(res)
  //     setUserId(res.user_id)
  //     localStorage.setItem('userId', `${userId}`)
  //     console.log({ userId: userId })
  //     window.location.assign('http://localhost:3002/api/posts')
  //   } else {
  //     console.log(res.message)
  //   }
  //   // userId = res.user_id
  // }

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        ></input>
        <label htmlFor="password">password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
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
