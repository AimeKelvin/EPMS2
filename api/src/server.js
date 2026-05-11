import express from 'express';  
import cors from 'cors';
import db from './config/db.js';
import salaryRoutes from "./routes/salary.routes.js"
import employeeRoutes from "./routes/employee.routes.js"
import departmentRoutes from "./routes/department.routes.js"

let app = express();

app.use(cors());
app.use(express.json());

app.use("/salaries", salaryRoutes)
app.use("/departments", departmentRoutes)
app.use("/employees", employeeRoutes)

app.listen(1000, () => {
    console.log('Server is running on port 1000');
});