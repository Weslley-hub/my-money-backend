import { Knex } from "knex";

export async function up(knex: Knex) {
  return knex.schema
    .withSchema("public")
    .createTable("user_categories", function (table) {
      table.string("id").primary();
      table.string("categories_id").notNullable();
      table
        .foreign("categories_id")
        .references("id")
        .inTable("predefined_categories");
      table.string("users_id").notNullable();
      table.foreign("users_id").references("id").inTable("users");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("user_categories");
}