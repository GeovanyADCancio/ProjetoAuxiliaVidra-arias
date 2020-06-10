const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const vidracarias = await connection('vidracarias').select('*');

        return response.json(vidracarias);
    },

    async create(request, response){
        const { id, name, cnpj, email, city, uf, address, number, phone } = request.body;

        await connection('vidracarias').insert({
            id,
            name,
            cnpj,
            email,
            city,
            uf, 
            address,
            number,
            phone,
        })
        return response.json({ id });
    }
}