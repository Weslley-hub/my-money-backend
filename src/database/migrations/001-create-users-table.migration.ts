import { Knex } from "knex";
import { createTableIfNotExists } from "../utils/createTableIfNotExists";

const TABLE_NAME = "users";

export async function up(knex: Knex) {
  return createTableIfNotExists(TABLE_NAME, knex, createTable);
}

function createTable(knex: Knex) {
  return knex.schema
    .withSchema("public")
    .createTable(TABLE_NAME, function (table) {
      table.string("id").primary();
      table.string("name").notNullable();
      table.string("email").notNullable().unique();
      table.string("password").notNullable();
      table.string("avatar").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(TABLE_NAME);
}
