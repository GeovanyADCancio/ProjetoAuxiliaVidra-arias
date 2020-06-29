import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import vidros from '../../assets/vidros.png';

import api from '../../services/api';

import './styles.css';

export default function Logon(){

    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('session', { id } );


            localStorage.setItem('VidraId', id );
            localStorage.setItem('VidraName', response.data.name);

            history.push('/profileservices');

        }catch(err){
            alert('Falha no login, tente novamente.');
        }
    }

    return(
        <div className="logon-container">
            <img src={vidros} alt='Vidros' />

            <section className='form'>
                <form onSubmit={handleLogin}>
                    
                    <h1>Faça seu Login</h1>

                    <input 
                        type="password"
                        placeholder='Seu Id'
                        value={id}
                        onChange= { e => setId(e.target.value)}    
                    />
                    <button className = 'button' type='submit'>ENTRAR</button>

                    <Link className='back_link' to="/register">
                        <FiLogIn size={16} color='#000000' />
                        Não tenho cadastro
                    </Link>
                </form>
                
            </section>
        </div>
    );
}