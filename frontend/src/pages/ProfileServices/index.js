import React, { useEffect, useState } from 'react';
import Vidros from '../../assets/vidros.png';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiLogIn, FiTrash2} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function Services(){

    const [services, setServices] = useState([]);

    const history = useHistory();

    const VidraName = localStorage.getItem('VidraName');
    const VidraId = localStorage.getItem('VidraId');

    useEffect( () => {
        api.get('profileservice', {
            headers:{
                Authorization: VidraId,
            }
        }).then( response => {
            setServices(response.data);
        })
    }, [VidraId]);

    async function handleDeleteService(id, client_id){
        try{
            await api.delete(`serviceorder/${id}`, {
                headers:{
                    Authorization: client_id,
                }
            });

            setServices(services.filter( services => services.idservice !== id ));
        }
        catch(err){
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }

    return(
        <div className="ProfileServices-container">
            <header>
                <img src={Vidros} alt="Vidros" />
                <span>Bem vindo, {VidraName}</span><span>(Serviços)</span>

                <Link className="button" to="/client/new" >Cadastrar Cliente</Link>
                <Link className="button" to="/serviceorder/new" >Nova Ordem de Serviço</Link>

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#000000" />
                </button>
            </header>

            <Link className="back_link" to="/profilebudgets">
                <FiLogIn size={16} color="#000000" />
                Verificar Orçamentos
            </Link>

            <ul>
                {services.map(services => (
                    <li key={services.idservice}>
                        <div>
                            <strong>Emitido por:</strong>
                            <p>{services.requester}</p>
                            <strong>Cliente:</strong>
                            <p>{services.name}</p>
                            <strong>Contato:</strong>
                            <p>{services.phone}</p>
                            <strong>Endereço:</strong>
                            <p>{services.address},{services.number}</p>
                            <strong>Cidade:</strong>
                            <p>{services.city}</p>
                        </div>
                        <div>
                            <strong>Descrição:</strong>
                                <p>{services.description}</p>
                            <strong>Data prévia de instalação:</strong>
                                <p>{services.date}</p>
                        </div>
                        <button onClick={ () => handleDeleteService(services.idservice, services.client_id) } type="button">
                            <FiTrash2 size={18} color="#000000" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}