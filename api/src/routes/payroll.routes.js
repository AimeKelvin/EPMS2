import { getPayroll, getPayrollSummary } from "../controllers/payroll.controller.js";
import Router from "express";

const router = Router();

router.get("/", getPayroll);
router.get("/summary", getPayrollSummary);

export default router;
