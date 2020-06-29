const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        
        const {client} = request.body;

        const clients = await connection('clients')
            .select('*')
            .where('name', client)
            .first();

        return response.json(clients.idclient);
    },

    async create(request, response){
        const { name, email, city, uf, address, number, phone, vidracaria_id } = request.body;

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