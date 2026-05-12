import express from "express";
import { getEmployees, addEmployee, deleteEmployee } from "../controllers/employee.controller.js";

const router = express.Router();

router.get("/", getEmployees);
router.post("/", addEmployee);
router.delete("/:id", deleteEmployee);

export default router;
