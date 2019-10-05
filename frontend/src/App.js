import React from 'react';
import './App.css';
import logo from './assets/logo.svg';
function App() {
  return (
    <div className="container">
      <img src={logo} alt="Air CnC"/>
      <div className="content">
        <p>Ofereça <strong>Spots</strong> para programadores e encontre <strong>talentos</strong></p>

        <form>
          <label htmlFor="email">Email *</label>
          <input 
            id="email" 
            type="email" 
            placeholder="Seu melhor e-mail"/>
          <button className="btn" type="submit">Entrar</button>
        </form>

      </div>
    </div>
  );
}

export default App;
