import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("teams", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("specialization").notNullable();
        table.string("status").notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("teams");
}
