import { Router } from "express"

//ROUTES
import { homeRoutes } from "./navigation-routes"
import { submissionRoutes } from "./submission-routes"


const routes = Router()

routes.use("/home", homeRoutes)
routes.use("/home/pocosdecaptacao", submissionRoutes)


export { routes }