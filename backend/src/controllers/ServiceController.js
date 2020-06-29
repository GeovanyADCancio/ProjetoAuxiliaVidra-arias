const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const services = await connection('serviceorder').select('*');

        return response.json( services );
    },
    async create(request,response){
        const {requester, description, date, client_id} = request.body;

        const [idservice] = await connection('serviceorder').insert({
            requester,
            description,
            date,
            client_id,
        });
        return response.json({ idservice });
    },

    async delete(request, response){
        const { id } = request.params;
        const client_id = request.headers.authorization;

        console.log(request.params);
        const serviceorder = await connection('serviceorder')
            .where('idservice', id)
            .select('client_id')
            .first();
        if(serviceorder.client_id != client_id){
            return response.status(401).json({ error: 'Operation not permitted.' });
        } 
        await connection('serviceorder').where('idservice', id).delete();

        return response.status(204).send();
    }
}