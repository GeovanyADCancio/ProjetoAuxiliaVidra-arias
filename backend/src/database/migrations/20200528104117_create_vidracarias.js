
exports.up = function(knex) {//Método up cria a tabela
    return knex.schema.createTable('vidracarias', function(table){
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('cnpj').notNullable();
        table.string('email').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
        table.string('address').notNullable();
        table.string('number').notNullable();
        table.string('phone').notNullable();
    })
}
exports.down = function(knex) {//Método Down para problemas, no caso, exclui a tabela
    return knex.schema.dropTable('vidracarias');
};
