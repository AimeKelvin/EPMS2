import { getPayroll } from "../controllers/payroll.controller.js";
import Router from "express";

const router = Router();

router.get("/", getPayroll);

export default router;
