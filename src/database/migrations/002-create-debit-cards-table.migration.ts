import { Knex } from "knex";

export async function up(knex: Knex) {
  return knex.schema
    .withSchema("public")
    .createTable("debit_cards", function (table) {
      table.string("id").primary();
      table.string("name").notNullable();
      table.integer("number").notNullable().unique();
      table.string("flag").notNullable();
      table.string("type").notNullable();
      table.string("user_id").notNullable();
      table.foreign("user_id").references("users.id");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("cards");
}
