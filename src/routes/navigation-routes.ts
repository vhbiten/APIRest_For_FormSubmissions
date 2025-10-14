import { Router } from "express"
import { SubmissionController } from "../controllers/form-controller"
const navigationRoutes = Router()
const submissionController = new SubmissionController()

navigationRoutes.get("/table/pocos", submissionController.show_pocos)

navigationRoutes.get("/table/efluentes", submissionController.show_efluentes)

navigationRoutes.get("/table/cloro-residual", submissionController.show_cloroResidual)


export { navigationRoutes }