import type { Knex } from "knex";
import { AgentLevel } from "../../model/agentModel";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("agents", (table) => {
        table.string("level").notNullable().defaultTo(AgentLevel.recruit).alter();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("agents", (table) => {
        table.string("level").notNullable().alter();
    });
}
