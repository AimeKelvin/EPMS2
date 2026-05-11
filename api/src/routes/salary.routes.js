import {getSalaries, AddSalary} from "../controllers/salary.controller.js"
import Router from "express"

let router = Router()

router.get("/", getSalaries)
router.post("/", AddSalary)

export default router