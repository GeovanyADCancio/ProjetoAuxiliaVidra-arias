import React, {useState} from 'react';
import RegisterDone from '../../assets/cadastrocliente.png';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import api from '../../services/api';

export default function ClientRegister(){

    const vidracaria_id = localStorage.getItem('VidraId');

    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [phone, setPhone] = useState('');

    async function handleClientRegister(e){
        e.preventDefault();

        const data = {
            name,
            email,
            city,
            uf,
            address,
            number,
            phone,
            vidracaria_id
        };

        try{

            await api.post('clients', data);

            alert("Cliente Cadastrado com Sucesso.");

            history.push('/profileservices');

        }catch(err){
            alert('Não foi possível cadastrar o cliente, tente novamnete.');
        }
    }

    return(
        <div className="ClientRegister-container">
            <section>
                <h1>CADASTRO</h1>
                <p>Cadastro de Clientes</p>

                <img src={RegisterDone} alt="Register Done" />

                <Link className='back_link' to='/profileservices'>
                    <FiArrowLeft size={16} color="#000000" />
                    Já cadastrou
                </Link>
            </section>

            <form onSubmit={handleClientRegister}>
                <input 
                    placeholder="Nome(sem acento)"
                    value={name}
                    onChange={ e => setName(e.target.value)} 
                />
                <input 
                    type="email"
                    placeholder="E-mail" 
                    value={email}
                    onChange={ e => setEmail(e.target.value)}
                />
                <div className="input-group">
                    <input 
                        placeholder="Cidade"
                        value={city}
                        onChange={ e => setCity(e.target.value)}
                    />
                    <input 
                        placeholder="UF" 
                        value={uf}
                        onChange={ e => setUf(e.target.value)}
                        style={ { width:90} }
                    />
                </div>
                <div className="input-group">
                    <input 
                        placeholder="Rua/Avenida" 
                        value={address}
                        onChange={ e => setAddress(e.target.value)}
                    />
                    <input 
                        placeholder="Núm." 
                        value={number}
                        onChange={ e => setNumber(e.target.value)}
                        style={{ width:90}} 
                    />
                </div>
                <input 
                    placeholder="Telefone"
                    value={phone}
                    onChange={ e => setPhone(e.target.value)} 
                />

                <button className="button" type="submit">CADASTRAR</button>
            </form>
        </div>
    );
}