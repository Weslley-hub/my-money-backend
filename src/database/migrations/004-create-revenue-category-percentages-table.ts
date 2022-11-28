import { Knex } from "knex";
import { createTableIfNotExists } from "../utils";

const TABLE_NAME = "revenue_category_percentages";

export async function up(knex: Knex) {
  return createTableIfNotExists(TABLE_NAME, knex, createTable);
}

function createTable(knex: Knex) {
  return knex.schema.withSchema("public").createTable(TABLE_NAME, (table) => {
    table.string("id").primary();
    table.string("revenue_id").notNullable();
    table
      .foreign("revenue_id")
      .references("id")
      .inTable("revenues")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table.string("expense_category_id").notNullable();
    table
      .foreign("expense_category_id")
      .references("id")
      .inTable("expense_categories")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table.decimal("percentage").notNullable().checkPositive();

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(TABLE_NAME);
}
