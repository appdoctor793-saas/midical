import React, { useState } from 'react';

const Signup = () => {
  const [userInfo, setUserInfo] = useState({ username: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Signup functionality is not implemented yet.");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input name="username" placeholder="Username" onChange={e => setUserInfo({ ...userInfo, username: e.target.value })} />
      <input name="password" type="password" placeholder="Password" onChange={e => setUserInfo({ ...userInfo, password: e.target.value })} />
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
