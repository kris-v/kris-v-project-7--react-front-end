import React, { useState } from 'react'
import '../../Styles/Auth.css'

export const Register = (props) => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (e) => {
    createUser()
    e.preventDefault()
    console.log(email, pass, name)
  }

  const createUser = () => {
    fetch('http://localhost:3000/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: `${email}`,
        password: `${pass}`,
        username: `${name}`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message !== 'Username or email already exists') {
          setEmail('')
          setPass('')
          setName('')
          props.onFormSwitch('login')
          console.log(res)
        } else {
          setError(true)
          setErrorMessage(res.message)
          console.log(res)
          return null
        }
      })
  }

  return (
    <div className="auth-form-container">
      <h4 className="error-message">{error ? errorMessage : ''}</h4>
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Username</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          id="name"
          placeholder="Your name"
        ></input>
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
        <button type="submit" disabled={email && pass && name ? false : true}>
          Sign Up
        </button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch('login')}>
        Already have an account? Log in here
      </button>
    </div>
  )
}
