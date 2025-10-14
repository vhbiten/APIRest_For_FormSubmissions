import { Router } from "express"
import { SubmissionController } from "../controllers/submission-controller"
const homeRoutes = Router()
const submissionController = new SubmissionController()

homeRoutes.get("/", submissionController.show_menu)

homeRoutes.get("/pocoscaptacao", submissionController.show_pocos)

homeRoutes.get("/efluentes", submissionController.show_efluentes)

homeRoutes.get("/clororesidual", submissionController.show_cloroResidual)


export { homeRoutes }