import { Router } from "express"
import { SubmissionController } from "../controllers/submission-controller"

const submissionRoutes = Router()
const submissionController = new SubmissionController()

submissionRoutes.post("/", submissionController.pocos)

export { submissionRoutes }