import { Request, Response } from "express"
import { AppError } from "../utils/app-error"
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
         response.send("PÁGINA INICIAL - POÇOS // EFLUENTES  // CLORO RESIDUAL // GERENCIAR")
    }

    show_FormPocos(request: Request, response: Response) {
        response.send("FORMULÁRIO DOS POÇOS DE CAPTAÇÃO")
    }
    
    show_FormEfluentes(request: Request, response: Response) {
        response.send("FORMULÁRIO DOS EFLUENTES")
    }

    show_FormCloroResidual(request: Request, response: Response) {
        response.send("FORMULÁRIO DE CLORO RESIDUAL LIVRE")
    }

    create_FormPocos(request: Request, response: Response) {
        // Schema: todos os campos são opcionais, mas se um do par existir, o outro é obrigatório
        const bodySchema = z.object({
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
        const { poco1_hidrometro, poco1_horimetro, poco2_hidrometro, poco2_horimetro, poco3_hidrometro, poco3_horimetro } = bodySchema.parse(request.body)

        // Monta resposta
        let result = ""
        if (poco1_hidrometro) result += `POCO 1: HD=${poco1_hidrometro} HR=${poco1_horimetro} `
        if (poco2_hidrometro) result += `POCO 2: HD=${poco2_hidrometro} HR=${poco2_horimetro} `
        if (poco3_hidrometro) result += `POCO 3: HD=${poco3_hidrometro} HR=${poco3_horimetro}`

        response.status(201).send(result.trim())
    }
}

export { SubmissionController }