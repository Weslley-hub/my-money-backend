import { Knex } from "knex";

export async function up(knex: Knex) {
  return knex.schema
    .withSchema("public")
    .createTable("predefined_categories", function (table) {
      table.string("id").primary();
      table.string("name").notNullable();
      table.string("icon").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("user_categories");
}