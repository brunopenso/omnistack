import React, {useState, useMemo} from 'react';
import camera from '../../assets/camera.svg';
import api from '../../services/api';

import './styles.css';

export default function New( { history }) {
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail):null;
    },[thumbnail]);

    async function handleSubmit(event) {
        event.preventDefault();

        const userid = localStorage.getItem('user');
        const data = new FormData();
        data.append('company',company);
        data.append('techs',techs);
        data.append('price',price);
        data.append('thumbnail',thumbnail);
        
        const response = await api.post('/spots', data, {
            headers: {userid}
        });

        console.log(response);

        history.push('/dashboard');
    }
    return (
        <form onSubmit={handleSubmit}>
            <label 
                id="thumbnail" 
                style={{ backgroundImage: `url(${preview})`}}
                className={preview ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="selecionar imagem"/>
            </label>

            <label htmlFor="company">Empresa *</label>
            <input
                id="company"
                placeholder="nome da sua empresa"
                value={company}
                onChange={event => setCompany(event.target.value)}
            />

            <label htmlFor="techs">Tecnologias *<span>separados por virgula</span></label>
            <input
                id="techs"
                placeholder="Quais tecnologias usam"
                value={techs}
                onChange={event => setTechs(event.target.value)}
            />

            <label htmlFor="price">Valor *<span>em branco para GRATUITO</span></label>
            <input
                id="price"
                placeholder="preço em R$"
                value={price}
                onChange={event => setPrice(event.target.value)}
            />

            <button className="btn" type="submit">Gravar</button>
        </form>
    );
}