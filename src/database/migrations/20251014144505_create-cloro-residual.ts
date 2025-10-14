import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("cloro_residual", (table) => {
        table.increments("id").primary()
        table.date("dataColeta").notNullable()
        table.decimal("saidaTratamento", 10, 2).notNullable()
        table.decimal("cozinha", 10, 2).notNullable()
        table.decimal("bebedouro1", 10, 2).notNullable()
        table.decimal("bebedouro2", 10, 2).notNullable()
        table.decimal("bebedouro3", 10, 2).notNullable()
        table.timestamps(true, true) // created_at e updated_at
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("cloro_residual")
}

