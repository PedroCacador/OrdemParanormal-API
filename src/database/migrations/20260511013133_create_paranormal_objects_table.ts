import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("paranormal_objects", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("classification").notNullable();
        table.string("effect").notNullable();
        table.string("dangerLevel").notNullable();
        table.string("status").notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("paranormal_objects");
}
