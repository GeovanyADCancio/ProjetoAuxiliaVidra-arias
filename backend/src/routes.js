const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

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
routes.post('/session', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
    })
}),SessionController.create);

//Vidraçarias
routes.post('/vidracarias', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        cnpj: Joi.string().required(),
        email: Joi.string().email().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
        address: Joi.string().required(),
        number: Joi.string().required(),
        phone: Joi.string().required().min(10).max(11),
        id: Joi.string().required(),
    })
}), VidracariaController.create);
routes.get('/vidracarias', VidracariaController.index);

//Clientes
routes.post('/clients', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email(),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
        address: Joi.string().required(),
        number: Joi.string().required(),
        phone: Joi.string().required().min(10).max(11),
        vidracaria_id: Joi.string().required(),
    })
}) , ClientsCrontroller.create);
routes.post('/clientsfind', celebrate({
    [Segments.BODY]: Joi.object().keys({
        client: Joi.string().required(),
    })
}) , ClientsCrontroller.index);

//Ordens de Serviço
routes.get('/serviceorder', ServiceController.index);

routes.post('/serviceorder', celebrate({
    [Segments.BODY]: Joi.object().keys({
        requester: Joi.string().required(),
        description: Joi.string().required(),
        date: Joi.string().required(),
        client_id: Joi.number().required(),
    })
}) ,ServiceController.create);

routes.delete('/serviceorder/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}) ,ServiceController.delete);

//Orçamentos
routes.get('/budget', BugdetsController.index);

routes.post('/budget', celebrate({
    [Segments.BODY]: Joi.object().keys({
        requester: Joi.string().required(),
        description: Joi.string().required(),
        date: Joi.string().required(),
        client_id: Joi.number().required(),
    })
}) ,BugdetsController.create);
routes.delete('/budget/:idbudget', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        idbudget: Joi.number().required(),
    })
}) ,BugdetsController.delete);

//profile
routes.get('/profileservice', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}) ,ProfileServicesController.index);
routes.get('/profilebudget', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}) ,ProfileBudgetController.index);

//Exportando minhas rotas
module.exports = routes;