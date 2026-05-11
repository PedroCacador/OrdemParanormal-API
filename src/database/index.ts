import knex from "knex";
import config from "../../knexfile";

const database = knex(config);

export default database;
