const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const budgets = await connection('budget').select('*');

        return response.json( budgets );
    },

    async create(request, response){
        const { requester, description, date, client_id } = request.body;

        const [ id ] = await connection('budget')
            .insert({
                requester,
                description,
                date,
                client_id,
            });
        
            return response.json( {id} );
    },

    async delete(request, response){
        const { idbudget } = request.params; //parâmetro de URL
        const client_id = request.headers.authorization;

        const budget = await connection('budget')
            .select('client_id')
            .where('idbudget',idbudget)
            .first();
        if(budget.client_id != client_id){
            return response.status(401).json({ error: "Operation not permitted." });
        }
        await connection('budget').where('idbudget', idbudget).delete();

        return response.status(204).send();
    }
}