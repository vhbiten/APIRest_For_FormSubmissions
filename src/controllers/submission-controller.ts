import { Request, Response } from "express"
import { AppError } from "../utils/AppError"


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
        const {
            poco1_hidrometro, poco1_horimetro,
            poco2_hidrometro, poco2_horimetro,
            poco3_hidrometro, poco3_horimetro
        } = request.body

        // Validação: cada par de campos deve estar completo ou vazio
        if ((poco1_hidrometro && !poco1_horimetro) || (!poco1_hidrometro && poco1_horimetro)) {
            throw new AppError("POÇO 1: Preencha ambos os campos", 400)
        }
        if ((poco2_hidrometro && !poco2_horimetro) || (!poco2_hidrometro && poco2_horimetro)) {
            throw new AppError("POÇO 2: Preencha ambos os campos", 400)
        }
        if ((poco3_hidrometro && !poco3_horimetro) || (!poco3_hidrometro && poco3_horimetro)) {
            throw new AppError("POÇO 3: Preencha ambos os campos", 400)
        }

        // Pelo menos um poço deve ser enviado
        if (!poco1_hidrometro && !poco2_hidrometro && !poco3_hidrometro) {
            throw new AppError("Envie os registros de pelo menos um poço", 400)
        }

        // Monta resposta
        let result = ""
        if (poco1_hidrometro) result += `POCO 1: HD=${poco1_hidrometro} HR=${poco1_horimetro}`
        if (poco2_hidrometro) result += `POCO 2: HD=${poco2_hidrometro} HR=${poco2_horimetro}`
        if (poco3_hidrometro) result += `POCO 3: HD=${poco3_hidrometro} HR=${poco3_horimetro}`

        response.status(201).send(result)
    }
}

export { SubmissionController }