import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';
import socketio from 'socket.io-client';

export default function Dashboard() {
    const [spots, setSpots] = useState([]);
    const [requests, setRequests] = useState([]);
    const userid = localStorage.getItem('user');
    const socket = useMemo(() => socketio('http://localhost:3333', {
        query: { userid }
    }), [userid]);

    useEffect(() => {
        socket.on('booking_request', data => {
            setRequests([ ...requests, data]);
        })
    },[requests, socket]);

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
            <ul className="notifications">
                {
                    requests.map(request => (
                        <li key={request._id}>
                            <p>
                             <strong>{request.user.email}</strong> esta solicitando uma reserva em 
                             <strong>{request.spot.company}</strong> para a data: {request.date}
                            </p>
                            <button className="accept">ACEITAR</button>
                            <button className="reject">REJEITAR</button>
                        </li>
                    ))
                }
            </ul>
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