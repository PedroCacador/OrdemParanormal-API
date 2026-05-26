import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("agents", (table) => {
        table.string("email").notNullable().unique();
        table.string("password").notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("agents", (table) => {
        table.dropColumn("email");
        table.dropColumn("password");
    });
}
