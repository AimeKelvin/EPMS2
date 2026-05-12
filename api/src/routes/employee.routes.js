import { getEmployees, addEmployee, deleteEmployee } from "../controllers/employee.controller.js";
import Router from "express";

const router = Router();

router.get("/", getEmployees);
router.post("/", addEmployee);
router.delete("/:id", deleteEmployee);

export default router;
