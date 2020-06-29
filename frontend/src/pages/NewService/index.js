import React, {useState} from 'react';
import RegisterDone from '../../assets/cadastrocliente.png';
import { FiArrowLeft } from 'react-icons/fi';
import { Link,useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';


export default function NewService(){

    const [requester, setRequester] = useState('');
    const [description, setDesccription] = useState('');
    const [date, setDate] = useState('');
    const [client, setClient] = useState('');

    const history = useHistory();

    async function handleNewServiceRegister(e){
        e.preventDefault();

        try{
            const response = await api.post('clientsfind', {client});

            const data = {
                requester,
                description,
                date,
                client_id: response.data,
            };
            
            await api.post('serviceorder', data );

            alert('Novo pedido de orçamento feito com sucesso.');

            history.push('/profileservices');
        }catch(err){
            alert("Falha ao realizar novo pedido de orçamento.");
        }

    }


    return(
        <div className="NewService-container">
            <section>
                <h1>Nova Ordem de Serviço</h1>
                <p>Cadastro de nova ordem de serviço</p>

                <img src={RegisterDone} alt="Register Done" />

                <Link className='back_link' to='/profileservices'>
                    <FiArrowLeft size={16} color="#000000" />
                    Já cadastrou
                </Link>
            </section>

            <form onSubmit={handleNewServiceRegister}>
            <input 
                    placeholder="Nome do solicitante"
                    value={requester}
                    onChange={ e => setRequester(e.target.value)}
                />
                <input 
                    placeholder="Nome do cliente"
                    value={client}
                    onChange={ e => setClient(e.target.value)}
                     
                />
                <textarea 
                    placeholder="Descrição" 
                    value={description}
                    onChange={ e => setDesccription(e.target.value)}
                />
                <input 
                    placeholder="Data prévia de instalação"
                    value={date}
                    onChange={ e => setDate(e.target.value)} 
                />
                
                <button className="button" type="submit">CADASTRAR</button>
            </form>
        </div>
    );
}