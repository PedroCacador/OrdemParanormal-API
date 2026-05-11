import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("agents", (table) => {
        table.integer("teamId").unsigned().alter();
        table.foreign("teamId").references("id").inTable("teams").onDelete("RESTRICT");
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("agents", (table) => {
        table.dropForeign(["teamId"]);
    });
}
