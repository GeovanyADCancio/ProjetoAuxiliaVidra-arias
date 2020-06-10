const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const clients = await connection('clients').select('*');

        return response.json(clients);
    },

    async create(request, response){
        const { name, email, city, uf, address, number, phone } = request.body;
        const vidracaria_id = request.headers.authorization;

        const [ idclient ] = await connection('clients').insert({
            name,
            email,
            city,
            uf, 
            address,
            number,
            phone,
            vidracaria_id,
        });

        return response.json({ idclient });
    }
}