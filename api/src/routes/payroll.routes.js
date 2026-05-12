import express from "express";

import {
  getPayroll,
  filterPayrollByMonth
} from "../controllers/payroll.controller.js";

const router = express.Router();

router.get("/", getPayroll);

router.get("/:month", filterPayrollByMonth);

export default router;