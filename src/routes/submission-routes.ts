import { Router } from "express"
import { SubmissionController } from "../controllers/form-controller"

const submissionRoutes = Router()
const submissionController = new SubmissionController()

submissionRoutes.post("/pocos", submissionController.create_pocos)
submissionRoutes.post("/efluentes", submissionController.create_efluentes)
submissionRoutes.post("/cloro-residual", submissionController.create_cloroResidual)

export { submissionRoutes }