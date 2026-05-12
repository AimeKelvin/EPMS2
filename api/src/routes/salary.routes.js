import express from "express";
import { getSalaries, addSalary, deleteSalary } from "../controllers/salary.controller.js";

const router = express.Router();

router.get("/", getSalaries);
router.post("/", addSalary);
router.delete("/:id", deleteSalary);

export default router;
