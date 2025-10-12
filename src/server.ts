import express from "express"
import { Request, Response } from "express"
import { routes } from "./routes/index"
import { AppError } from "./utils/app-error"
import { ZodError } from "zod"


const PORT = 3333

const app = express()

app.use(express.json()) //trabalhar com arquivos JSON

app.use(routes) //importação das rotas que estão no arquivo index

app.use((error:any, request: Request, response: Response, _: any) => {
    if (error instanceof AppError) {
        response.status(error.statusCode).json({message: error.message})
    }

    if (error instanceof ZodError) {
        response.status(400).json({message: "Validation Error", issues: error.format()})

    return response
    }

    response.status(500).json({message: error.message})
    
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))