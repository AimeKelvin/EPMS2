import { getSalaries, addSalary, deleteSalary } from "../controllers/salary.controller.js";
import Router from "express";

const router = Router();

router.get("/", getSalaries);
router.post("/", addSalary);
router.delete("/:id", deleteSalary);

export default router;
