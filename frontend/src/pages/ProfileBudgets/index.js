import React, {useEffect, useState} from 'react';
import Vidros from '../../assets/vidros.png';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiLogIn, FiTrash2} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function Budgets(){

    const [budgets, setBudgets] = useState([]);

    const history = useHistory();

    const VidraName = localStorage.getItem('VidraName');
    const VidraId = localStorage.getItem('VidraId');

    useEffect( () => {
        api.get('profilebudget', {
            headers:{
                Authorization: VidraId,
            }
        }).then( response => {
            setBudgets(response.data);
        })
    }, [VidraId]);

    async function handleDeleteBudget(id, client_id){
        try{
            await api.delete(`budget/${id}`, {
                headers:{
                    Authorization: client_id,
                }
            });

            setBudgets(budgets.filter( services => services.idbudget !== id ));
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
        <div className="ProfileBudgets-container">
            <header>
                <img src={Vidros} alt="Vidros" />
                <span>Bem vindo, {VidraName} </span><span>(Orçamentos)</span>

                <Link className="button" to="/client/new" >Cadastrar Cliente</Link>
                <Link className="button" to="/budget/new" >Novo Pedido de Orçamento</Link>

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#000000" />
                </button>
            </header>

            <Link className="back_link" to="/profileservices">
                <FiLogIn size={16} color="#000000" />
                Verificar Serviços
            </Link>

            <ul>
                {budgets.map( budgets => (
                    <li>
                        <div>
                            <strong>Emitido por:</strong>
                            <p>{budgets.requester}</p>
                            <strong>Cliente:</strong>
                            <p>{budgets.name}</p>
                            <strong>Contato:</strong>
                            <p>{budgets.phone}</p>
                            <strong>Endereço:</strong>
                            <p>{budgets.address},{budgets.number}</p>
                            <strong>Cidade:</strong>
                            <p>{budgets.city}</p>
                        </div>
                        <div>
                            <strong>Descrição:</strong>
                            <p>{budgets.description}</p>
                            <strong>Data prévia de orçamento:</strong>
                            <p>{budgets.date}</p>
                        </div>
                        <button onClick= { () => handleDeleteBudget(budgets.idbudget, budgets.client_id) } type="button">
                            <FiTrash2 size={18} color="#000000" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}