import { Router } from "express"

//ROUTES
import { homeRoutes } from "./navigation-routes"
import { submissionRoutes } from "./submission-routes"


const routes = Router()

routes.use("/home", homeRoutes)
routes.use("/api", submissionRoutes)


export { routes }