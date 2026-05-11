import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("threats", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("type").notNullable();
        table.string("dangerLevel").notNullable();
        table.string("description").notNullable();
        table.string("status").notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("threats");
}
