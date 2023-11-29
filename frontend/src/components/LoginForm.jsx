import React from 'react'

function LoginForm() {
  return (
    <div className="container">
      <h2>Login</h2>
      <form>
        <input type="email" placeholder='my-email@email.com'/>
        <input type="password" placeholder='*********'/>
        <button>Login</button>
      </form>
    </div>
  )
}

export default LoginForm