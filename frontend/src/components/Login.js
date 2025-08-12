import React, { useState } from 'react';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login functionality is not implemented yet.");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="username" placeholder="Username" onChange={e => setCredentials({ ...credentials, username: e.target.value })} />
      <input name="password" type="password" placeholder="Password" onChange={e => setCredentials({ ...credentials, password: e.target.value })} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
