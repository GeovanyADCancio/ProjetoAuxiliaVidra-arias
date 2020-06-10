
exports.up = function(knex) {
  return knex.schema.createTable('clients', function(table){
      table.increments('idclient').primary();

      table.string('name').notNullable();
      table.string('email');
      table.string('city').notNullable();
      table.string('uf',2).notNullable();
      table.string('address').notNullable();
      table.string('number').notNullable();
      table.string('phone').notNullable();

      table.string('vidracaria_id').notNullable();
      table.foreign('vidracaria_id').references('id').inTable('vidracarias');

  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('clients');
};
