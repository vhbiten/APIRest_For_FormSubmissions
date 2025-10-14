import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("efluentes", (table) => {
        table.increments("id").primary()
        table.date("dataColeta").notNullable()
        table.decimal("vazao1", 10, 2).notNullable()
        table.decimal("vazao2", 10, 2).notNullable()
        table.decimal("vazao3", 10, 2).notNullable()
        table.decimal("ph", 10, 2).notNullable()
        table.decimal("temperatura", 10, 2).notNullable()
        table.decimal("condutividade", 10, 2).notNullable()
        table.decimal("SD30", 10, 2).notNullable()
        table.timestamps(true, true) // created_at e updated_at
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("efluentes")
}

