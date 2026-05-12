import express from "express";

import { getSalaries, addSalary,updateSalary, deleteSalary
} from "../controllers/salary.controller.js";

const router = express.Router();

router.get("/", getSalaries);
router.post("/", addSalary);
router.put("/:id", updateSalary);
router.delete("/:id", deleteSalary);

export default router;