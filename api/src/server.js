import express from "express";
import cors from "cors";
import salaryRoutes from "./routes/salary.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import departmentRoutes from "./routes/department.routes.js";
import payrollRoutes from "./routes/payroll.routes.js";
import session from "express-session";
import authRoutes from "./routes/auth.routes.js";



const app = express();
const PORT = process.env.PORT || 1000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use(
  session({
    secret: "simple_secret_key_change_later",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.get("/", (req, res) => {
  res.json({ message: "EPMS API is running" });
});

app.use("/salaries", salaryRoutes);
app.use("/departments", departmentRoutes);
app.use("/employees", employeeRoutes);
app.use("/payroll", payrollRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
