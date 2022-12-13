import { Knex } from "knex";
import { createTableIfNotExists } from "../utils";

const TABLE_NAME = "expense_categories";

export async function up(knex: Knex) {
  return createTableIfNotExists(TABLE_NAME, knex, createTable);
}

function createTable(knex: Knex) {
  return knex.schema.withSchema("public").createTable(TABLE_NAME, (table) => {
    table.string("id").primary();
    table.string("name").notNullable();
    table.string("icon").notNullable();

    table.string("user_id").notNullable();
    table.foreign("user_id").references("id").inTable("users");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(TABLE_NAME);
}
