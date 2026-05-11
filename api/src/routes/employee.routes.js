import {getEmployees, addEmployee} from "../controllers/employee.controller"
import Router from "express"

let router = Router()

router.get("/",getEmployees )
router.post("/",addEmployee )

export default router