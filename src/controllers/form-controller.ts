import { Request, Response, NextFunction } from "express"
import { knex } from "@/database/knex"
import { z } from "zod"


class SubmissionController { 
/*
index - GET (lista vários registros)
show - GET (exibe um registro)
create - POST (criar um registro)
update - PUT (atualizar um registro)
remove - DELETE (deletar um registro)
*/

    show_menu(request: Request, response: Response) {
        return response.send("PÁGINA INICIAL - POÇOS // EFLUENTES  // CLORO RESIDUAL // GERENCIAR")
    }

    async show_pocos(request: Request, response: Response, next: NextFunction) {
        try {

            const { pocoNumero, dataColeta } = request.query
            
            const query = knex<PocoRepository>("pocos").select()

            // Se pocoNumero foi informado, filtra por ele
            if (pocoNumero) {
                query.where("pocoNumero", pocoNumero)
            }

            // Se dataColeta foi informada, filtra por ela
            if (dataColeta) {
                query.where("dataColeta", dataColeta)
            }

            const pocos = await query.orderBy("dataColeta")

            // Verifica se tem registro, caso não tenha retorna 404
            if (pocos.length === 0) {
                return response.status(404).json({ message: "Nenhum registro encontrado" })
            }

            return response.json(pocos)

        } catch (error) {
            
            next(error)
        }
    }
    
    async show_efluentes(request: Request, response: Response, next: NextFunction) {
        try {

            const { dataColeta } = request.query

            const query = knex<EfluenteRepository>("efluentes").select()

            // Se dataColeta foi informada, filtra por ela
            if (dataColeta) {
                query.where("dataColeta", dataColeta)
            }

            const efluentes = await query.orderBy("dataColeta")

            // Verifica se tem registro, caso não tenha retorna 404
            if (efluentes.length === 0) {
                return response.status(404).json({ message: "Nenhum registro encontrado" })
            }

            return response.json(efluentes)

        } catch (error) {
            
            next(error)
        }
    }

    async show_cloroResidual(request: Request, response: Response, next: NextFunction) {
        try {

            const { dataColeta } = request.query

            const query = knex<CloroResidualRepository>("cloro_residual").select()

            // Se dataColeta foi informada, filtra por ela
            if (dataColeta) {
                query.where("dataColeta", dataColeta)
            }

            const cloroResidual = await query.orderBy("dataColeta")

            // Verifica se tem registro, caso não tenha retorna 404
            if (cloroResidual.length === 0) {
                return response.status(404).json({ message: "Nenhum registro encontrado" })
            }

            return response.json(cloroResidual)

        } catch (error) {
            
            next(error)
        }
    }

    async create_pocos(request: Request, response: Response) {
        try {
            // Schema: todos os campos são opcionais, mas se um do par existir, o outro é obrigatório
            const bodySchema = z.object({
                dataColeta: z.string().min(1, "Data da coleta é obrigatória"),
                poco1_hidrometro: z.number().optional(),
                poco1_horimetro: z.number().optional(),
                poco2_hidrometro: z.number().optional(),
                poco2_horimetro: z.number().optional(),
                poco3_hidrometro: z.number().optional(),
                poco3_horimetro: z.number().optional()
            }).refine(data => {
                // Se um campo existe, o outro também deve existir!
                const poco1Complete = (data.poco1_hidrometro && data.poco1_horimetro) || (!data.poco1_hidrometro && !data.poco1_horimetro)
                const poco2Complete = (data.poco2_hidrometro && data.poco2_horimetro) || (!data.poco2_hidrometro && !data.poco2_horimetro)
                const poco3Complete = (data.poco3_hidrometro && data.poco3_horimetro) || (!data.poco3_hidrometro && !data.poco3_horimetro)
                
                // Pelo menos um poço deve ser enviado
                const atLeastOne = 
                    (data.poco1_hidrometro && data.poco1_horimetro) || 
                    (data.poco2_hidrometro && data.poco2_horimetro) || 
                    (data.poco3_hidrometro && data.poco3_horimetro)
                
                return poco1Complete && poco2Complete && poco3Complete && atLeastOne

            }, { message: "Você deve enviar os dados de pelo menos um poço!" })

            //"parse" verifica e valida o schema anterior.
            const { dataColeta, poco1_hidrometro, poco1_horimetro, poco2_hidrometro, poco2_horimetro, poco3_hidrometro, poco3_horimetro } = bodySchema.parse(request.body)

            // Salvar cada poço em uma linha separada no banco
            // Se poco1 foi enviado, salva poco1
            if (poco1_hidrometro && poco1_horimetro) {
                await knex("pocos").insert({
                    dataColeta: dataColeta,
                    pocoNumero: 1,
                    hidrometro: poco1_hidrometro,
                    horimetro: poco1_horimetro
                })
            }

            // Se poco2 foi enviado, salva poco2
            if (poco2_hidrometro && poco2_horimetro) {
                await knex("pocos").insert({
                    dataColeta: dataColeta,
                    pocoNumero: 2,
                    hidrometro: poco2_hidrometro,
                    horimetro: poco2_horimetro
                })
            }

            // Se poco3 foi enviado, salva poco3
            if (poco3_hidrometro && poco3_horimetro) {
                await knex("pocos").insert({
                    dataColeta: dataColeta,
                    pocoNumero: 3,
                    hidrometro: poco3_hidrometro,
                    horimetro: poco3_horimetro
                })
            }

            return response.status(201).json({ message: "Dados registrados com sucesso!" })

        } catch (error) {
            if (error instanceof z.ZodError) {
                throw error
            }
            
            console.error("Erro ao salvar dados dos poços:", error)
            return response.status(500).json({ 
                message: "Erro ao salvar os dados dos poços no banco de dados" 
            })
        }
    }

    async create_efluentes(request: Request, response: Response) {
        try {
            const bodySchema = z.object({
                dataColeta: z.string().min(1, "Data obrigatória"),
                
                vazao1: z.number(),
                vazao2: z.number(),
                vazao3: z.number(),
                ph: z.number(),
                temperatura: z.number(),
                condutividade: z.number(),
                SD30: z.number()
            })

            const { dataColeta, vazao1, vazao2, vazao3, ph, temperatura, condutividade, SD30} = bodySchema.parse(request.body)
            
            await knex("efluentes").insert({
                dataColeta: dataColeta,
                vazao1: vazao1,
                vazao2: vazao2,
                vazao3: vazao3,
                ph: ph,
                temperatura: temperatura,
                condutividade: condutividade,
                SD30: SD30
            })

            return response.status(201).json({ message: "Efluente registrado!" })

        } catch (error) {
            // Se for erro do Zod, deixa o middleware global tratar
            if (error instanceof z.ZodError) {
                throw error
            }
            
            // Erro de banco de dados ou outro erro
            console.error("Erro ao salvar dados de efluentes:", error)
            return response.status(500).json({ 
                message: "Erro ao salvar os dados de efluentes no banco de dados" 
            })
        }
    }

    async create_cloroResidual(request: Request, response: Response) {
        try {
            const bodySchema = z.object({
                dataColeta: z.string().min(1, "Data obrigatória"),
                
                saidaTratamento: z.number(),
                cozinha: z.number(),
                bebedouro1: z.number(),
                bebedouro2: z.number(),
                bebedouro3: z.number(),
            })

            const { dataColeta, saidaTratamento, cozinha, bebedouro1, bebedouro2, bebedouro3 } = bodySchema.parse(request.body)
            
            await knex("cloro_residual").insert({
                dataColeta: dataColeta,
                saidaTratamento: saidaTratamento,
                cozinha: cozinha,
                bebedouro1: bebedouro1,
                bebedouro2: bebedouro2,
                bebedouro3: bebedouro3
            })

            return response.status(201).json({ message: "Cloro residual registrado!" })

        } catch (error) {
            // Se for erro do Zod, deixa o middleware global tratar
            if (error instanceof z.ZodError) {
                throw error
            }
            
            // Erro de banco de dados ou outro erro
            console.error("Erro ao salvar dados de cloro residual:", error)
            return response.status(500).json({ 
                message: "Erro ao salvar os dados de cloro residual no banco de dados" 
            })
        }
    }
}

export { SubmissionController }