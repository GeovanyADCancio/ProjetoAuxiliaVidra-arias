const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const { id } = request.body;

        const vidracarias = await connection('vidracarias')
            .where('id', id)
            .select('name')
            .first(); //utiliza o primeiro registro da consulta
        if(!vidracarias){
            return response.status(400).json( { error : "Vidraçaria não encontrada com este ID"});
        }
        console.log(vidracarias);
        return response.json(vidracarias);
    }
}