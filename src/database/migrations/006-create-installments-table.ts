import { Knex } from "knex";
import { createTableIfNotExists } from "../utils";

const TABLE_NAME = "installments";

export async function up(knex: Knex) {
  return createTableIfNotExists(TABLE_NAME, knex, createTable);
}

function createTable(knex: Knex) {
  return knex.schema.withSchema("public").createTable(TABLE_NAME, (table) => {
    table.string("id").primary();

    table.decimal("amount").notNullable().checkPositive();
    table.date("date").notNullable();
    table.boolean("paid").notNullable().defaultTo(false);

    table.string("expense_id");
    table.foreign("expense_id").references("id").inTable("expenses");

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(TABLE_NAME);
}
