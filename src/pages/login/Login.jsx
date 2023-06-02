import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === 'admin' && password === 'senha') {
      setIsLoggedIn(true);
      console.log('Login bem-sucedido!');
    } else {
      console.log('Credenciais inválidas. Tente novamente.');
    }
  };

  if (isLoggedIn) {
    return <div>Você está logado!</div>;
  } else {
    return (
      <div>
        <h2>Tela de Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Usuário:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }
};

export default Login;