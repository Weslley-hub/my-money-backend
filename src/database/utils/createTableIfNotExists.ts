import { Knex } from "knex";

export async function createTableIfNotExists(
  tableName: string,
  knex: Knex,
  callback: (knex: Knex) => void
) {
  const exists = await knex.schema.withSchema("public").hasTable(tableName);

  if (exists) {
    return;
  }

  return callback(knex);
}
