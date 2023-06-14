import React, { useState } from 'react';

import { auth } from '../../firebase/firebaseConnection'

import { toast } from 'react-toastify'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import './login.css'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  function handleLogin(e){
    e.preventDefault();

    if(email === '' || password === ''){
      toast.warning("Preencha Todos os campos!")
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      navigate("/paciente", { replace: true })
      toast.success("Login com sucesso!!")
    })
    .catch((error) => {
      toast.error("Login ou senha inválidos")
    })
  }

  return (
    <div className='container'>
      <h2>Login</h2>
      <form onSubmit={handleLogin} className='form'>
        <div>
          <label htmlFor="username">Email:</label>
          <input
            type="text"
            id="username"
            placeholder='Digite seu Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            placeholder='Senha'
            autoComplete='on'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );

};
