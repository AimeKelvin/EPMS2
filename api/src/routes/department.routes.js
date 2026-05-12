import { getDepartments, addDepartment, deleteDepartment } from "../controllers/department.controller.js";
import Router from "express";

const router = Router();

router.get("/", getDepartments);
router.post("/", addDepartment);
router.delete("/:code", deleteDepartment);

export default router;
