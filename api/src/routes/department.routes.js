import express from "express";
import { getDepartments, addDepartment, deleteDepartment } from "../controllers/department.controller.js";

const router = express.Router();

router.get("/", getDepartments);
router.post("/", addDepartment);
router.delete("/:code", deleteDepartment);

export default router;
