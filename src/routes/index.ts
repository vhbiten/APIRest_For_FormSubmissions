import { Router } from "express"

//ROUTES
import { navigationRoutes } from "./navigation-routes"
import { submissionRoutes } from "./submission-routes"


const routes = Router()

routes.use("/home", navigationRoutes)
routes.use("/api", submissionRoutes)


export { routes }