import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("pocos", (table) => {
        table.increments("id").primary()
        table.date("dataColeta").notNullable()
        table.integer("pocoNumero").notNullable() // 1, 2 ou 3
        table.decimal("hidrometro", 10, 2).notNullable()
        table.decimal("horimetro", 10, 2).notNullable()
        table.timestamps(true, true) // created_at e updated_at
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("pocos")
}

