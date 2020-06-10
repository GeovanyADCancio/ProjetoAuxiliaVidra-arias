
exports.up = function(knex) {
    return knex.schema.createTable('serviceorder', function(table){
        table.increments('idservice').primary();
        table.string('requester').notNullable();
        table.string('description').notNullable();
        table.date('date').notNullable();
        
        table.string('client_id').notNullable();
        table.foreign('client_id').references('idclient').inTable('clients');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('serviceorder');
};
