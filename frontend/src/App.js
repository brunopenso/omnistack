import React, { useState } from 'react';
import './App.css';
import logo from './assets/logo.svg';
import api from './services/api';

function App() {

  const [email, setEmail] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    console.log(email);
  }

  return (
    <div className="container">
      <img src={logo} alt="Air CnC"/>
      <div className="content">
        <p>Ofereça <strong>Spots</strong> para programadores e encontre <strong>talentos</strong></p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email *</label>
          <input 
            id="email" 
            type="email" 
            placeholder="Seu melhor e-mail"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />

          <button className="btn" type="submit">Entrar</button>
        </form>

      </div>
    </div>
  );
}

export default App;
