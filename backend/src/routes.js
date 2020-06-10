const express = require('express');

//Importar a lógicas das rotas, os controllers
const SessionController = require('./controllers/SessionController');
const VidracariaController = require('./controllers/VidracariaController');
const ClientsCrontroller = require('./controllers/ClientsController');
const ServiceController = require('./controllers/ServiceController');
const BugdetsController = require('./controllers/BudgetsController');
const ProfileServicesController = require('./controllers/ProfileServicesController');
const ProfileBudgetController = require('./controllers/ProfileBudgetController');

const routes = express.Router(); //instância de rotas, onde é possível adicionar middleware e método de rotas http(get, post,...)

//Ao acessar determinada rota a lógica correspondente será utilizada

//Session
routes.post('/session', SessionController.create);

//Vidraçarias
routes.post('/vidracarias', VidracariaController.create);
routes.get('/vidracarias', VidracariaController.index);

//Clientes
routes.post('/clients', ClientsCrontroller.create);
routes.get('/clients', ClientsCrontroller.index);

//Ordens de Serviço
routes.get('/serviceorder', ServiceController.index);
routes.post('/serviceorder', ServiceController.create);
routes.delete('/serviceorder/:id', ServiceController.delete);

//Orçamentos
routes.get('/budget', BugdetsController.index);
routes.post('/budget', BugdetsController.create);
routes.delete('/budget/:idbudget', BugdetsController.delete);

//profile
routes.post('/profileservice', ProfileServicesController.index);
routes.post('/profilebudget', ProfileBudgetController.index);

//Exportando minhas rotas
module.exports = routes;