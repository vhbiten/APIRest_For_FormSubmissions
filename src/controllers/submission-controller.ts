import { Request, Response } from "express"


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

        throw new Error("Erro ao tentar submeter o formulário!")

        const {
            poco1_hidrometro,  poco1_horimetro,
            poco2_hidrometro, poco2_horimetro,
            poco3_hidrometro, poco3_horimetro
        } = request.body

        response.status(201).send(`###POCO 1### HD: ${poco1_hidrometro} e HR: ${poco1_horimetro}`)
    }
}

export { SubmissionController }