import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("missions", (table) => {
        table.increments("id").primary();
        table.string("title").notNullable();
        table.string("description").notNullable();
        table.string("dangerLevel").notNullable();
        table.string("status").notNullable();
        table.json("teamIds").notNullable();
        table.json("threatIds").notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("missions");
}
