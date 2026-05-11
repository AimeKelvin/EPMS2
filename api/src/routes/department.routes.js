import {getDepartments, AddDepartment} from "../controllers/department.controller.js"
import Router from "express"

let router = Router()

router.get("/", getDepartments)
router.post("/", AddDepartment)

export default router