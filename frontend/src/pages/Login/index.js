import React, { useState } from 'react';
import api from '../../services/api';

export default function Login() {


  const [email, setEmail] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    //api.post('/sessions', {email: email});
    //use reduced form, since attribute are the same of the query parameter
    const response = await api.post('/sessions', {email});
    const { _id } = response.data;

    localStorage.setItem('user', _id);
  }

    return (
        <>
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
        </>
    );
}