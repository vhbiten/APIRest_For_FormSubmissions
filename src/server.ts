import express from "express"
import { Request, Response } from "express"
import { routes } from "./routes/index"
import { AppError } from "./utils/AppError"

const PORT = 3333

const app = express()

app.use(express.json()) //trabalhar com arquivos JSON

app.use(routes) //importação das rotas que estão no arquivo index

app.use((error:any, request: Request, response: Response, _: any) => {
    if (error instanceof AppError) {
        response.status(error.statusCode).json({message: error.message})
    } else {
        response.status(500).json({message: error.message})
    }
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))