import express from "express";
import cors from "cors";
import session from "express-session";

import authRoutes from "./routes/auth.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import departmentRoutes from "./routes/department.routes.js";
import salaryRoutes from "./routes/salary.routes.js";
import payrollRoutes from "./routes/payroll.routes.js";

const app = express();
const PORT = process.env.PORT || 1000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "simple_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }
  })
);

app.get("/", (req, res) => {
  res.json({ message: "EPMS simple API is running" });
});

app.use("/auth", authRoutes);
app.use("/employees", employeeRoutes);
app.use("/departments", departmentRoutes);
app.use("/salaries", salaryRoutes);
app.use("/payroll", payrollRoutes);

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
