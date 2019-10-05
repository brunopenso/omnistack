import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

export default function Dashboard() {
    const [spots, setSpots] = useState([]);
    //if the last parameter arrays is empty it tells that the function will be executed only one time
    useEffect( () => {
        async function loadSpots() {
            const userid = localStorage.getItem('user');
            const response = await api.get("/dashboard", {
                headers: {userid}
            });

            setSpots(response.data);
        }

        loadSpots();
    },[]);

    return (
        <>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{
                            backgroundImage: `url(${spot.thumbnail_url})`
                        }}/>
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'Gratuido'}</span>
                    </li>
                ))}
            </ul>
            <Link to="/new">
                <button className='btn'>Cadastrar novo spot</button>
            </Link>
        </>
    );
}