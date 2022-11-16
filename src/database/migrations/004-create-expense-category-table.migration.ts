import { Knex } from "knex";

export async function up(knex: Knex) {
  return knex.schema
    .withSchema("public")
    .createTable("registerable_categories", function (table) {
      table.string("id").primary();
      table.string("name").notNullable();
      table.string("icon").notNullable();
      table.string("users_id").notNullable();
      table.foreign("users_id").references("id").inTable("users");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("user_categories");
}