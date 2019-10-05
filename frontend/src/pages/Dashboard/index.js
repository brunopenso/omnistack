import React, { useState, useEffect } from 'react';
import api from '../../services/api';

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
                        <header />
                        <strong>{spot.company}</strong>
                        <span>{spot.price}</span>
                    </li>
                ))}
            </ul>
        </>
    );
}