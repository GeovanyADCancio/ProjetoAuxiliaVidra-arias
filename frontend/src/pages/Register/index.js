import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import ImgWorker from '../../assets/worker.png';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function Register() {

    const [id, setID] = useState('');
    const [cnpj, setCNPJ] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [phone, setPhone] = useState('');

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data = {
            id,
            cnpj,
            name,
            email,
            city,
            uf,
            address,
            number,
            phone
        };
        try{
            const response = await api.post('vidracarias', data );

            alert(`Seu ID de acesso é: ${response.data.id}`);

            history.push('/');
        }catch(err){
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return(
        <div className='register-container'>
            <section>
                <h1>CADASTRO</h1>
                <p>Cadastro de vidraçarias</p>

                <img src={ImgWorker} alt='Vidraçaria' />

                <Link className='back_link' to='/'>
                    <FiArrowLeft size={16} color="#000000" />
                    Já tenho cadastro
                </Link>
            </section>
            <form onSubmit={handleRegister}>
                <input 
                    placeholder="Nome(sem acento)"
                    value={name}
                    onChange={ e => setName(e.target.value)}
                />
                <input 
                    placeholder="CNPJ"
                    value={cnpj} 
                    onChange={ e => setCNPJ(e.target.value)}
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
                <input 
                    placeholder="Crie seu ID(Ex.: rocio1234)"
                    value={id}
                    onChange={ e => setID(e.target.value)}
                />
                <p>Não esquecer, pois será utilizado para acessar o sistema!</p>

                <button className="button" type="submit">CADASTRAR</button>
                
            </form>
        </div>
    );
}