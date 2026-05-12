# EPMS Simple Version

This is a beginner-friendly Employee Payroll Management System.

It uses:

- React + Vite frontend
- Express backend
- MySQL database
- Basic `fetch()` requests
- Simple forms and simple tables

No complicated frontend architecture was used. Each page loads data, displays it using `map()` inside `<tbody>`, and sends data using `fetch()`.

## Login

Default login from `schema.sql`:

```txt
Email: admin@gmail.com
Password: 12345
```

## Setup

### 1. Database

Open MySQL and run:

```sql
source api/schema.sql;
```

Or copy everything inside `api/schema.sql` and run it in MySQL Workbench/phpMyAdmin.

### 2. Backend

```bash
cd api
npm install
cp .env.example .env
npm run dev
```

Backend runs on:

```txt
http://localhost:1000
```

### 3. Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

## Pages

- Employees
- Departments
- Salary
- Payroll
- Login

Payroll is only a report from Department and Salary. It does not insert payroll records.
