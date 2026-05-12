import express from "express";
import cors from "cors";
import salaryRoutes from "./routes/salary.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import departmentRoutes from "./routes/department.routes.js";
import payrollRoutes from "./routes/payroll.routes.js";

const app = express();
const PORT = process.env.PORT || 1000;

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "EPMS API is running" });
});

app.use("/salaries", salaryRoutes);
app.use("/departments", departmentRoutes);
app.use("/employees", employeeRoutes);
app.use("/payroll", payrollRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
