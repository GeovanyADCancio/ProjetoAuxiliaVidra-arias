const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const idvidros = request.headers.authorization;

        //Trazendo os clientes desta vidraçaria logada com join p aprender
        const list = await connection('vidracarias')
            .join('clients', 'vidracaria_id', '=' , 'id')
            .join('serviceorder','client_id','=','idclient')
            .select(
                'clients.*',
                'serviceorder.*',
            )
            .where('clients.vidracaria_id',idvidros);
        
        return response.json(list);
    },

}