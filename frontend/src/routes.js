import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Importar as Páginas
import Logon from './pages/Logon';
import Register from './pages/Register';
import Services from './pages/ProfileServices';
import Budgets from './pages/ProfileBudgets';
import ClientRegister from './pages/ClientRegister';
import NewService from './pages/NewService';
import NewBudget from './pages/NewBudget';


export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component = {Logon} />
                <Route path='/register' component = {Register} />
                <Route path='/profileservices' component = {Services} />
                <Route path='/profilebudgets' component = {Budgets} />
                <Route path='/client/new' component = {ClientRegister} />
                <Route path='/serviceorder/new' component = {NewService} />
                <Route path='/budget/new' component = {NewBudget} />
            </Switch>
        </BrowserRouter>
    );
}