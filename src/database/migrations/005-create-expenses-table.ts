import { Knex } from "knex";
import { createTableIfNotExists } from "../utils";

const TABLE_NAME = "expenses";

export async function up(knex: Knex) {
  return createTableIfNotExists(TABLE_NAME, knex, createTable);
}

function createTable(knex: Knex) {
  return knex.schema.withSchema("public").createTable(TABLE_NAME, (table) => {
    table.string("id").primary();

    table.decimal("amount").notNullable().checkPositive();
    table.date("date").notNullable();
    table.string("description").notNullable();
    table.boolean("paid").notNullable().defaultTo(false);

    table.string("payment_type").notNullable();

    table.string("debit_card_id").nullable();
    table.foreign("debit_card_id").references("id").inTable("debit_cards");

    table.string("credit_card_id").nullable();
    table.foreign("credit_card_id").references("id").inTable("credit_cards");

    table.string("user_id").notNullable();
    table.foreign("user_id").references("id").inTable("users");

    table.string("expense_category_id");
    table
      .foreign("expense_category_id")
      .references("id")
      .inTable("expense_categories");

    table.string("revenue_id");
    table.foreign("revenue_id").references("id").inTable("revenues");
    table.integer("number_of_installments");

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(TABLE_NAME);
}
