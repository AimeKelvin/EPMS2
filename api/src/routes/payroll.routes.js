import express from "express";
import { getPayroll } from "../controllers/payroll.controller.js";

const router = express.Router();

router.get("/", getPayroll);

export default router;
