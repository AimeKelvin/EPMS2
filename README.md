# EPMS Payroll Project

Minimal Employee Payroll Management System with:

- Express + MySQL backend
- React + Vite frontend
- Tailwind-based UI through CDN
- No authentication included, so auth can be added later
- Payroll controller that joins employees, departments and salary packages

## Project Structure

```txt
EPMS/
  api/      Backend API
  client/   React frontend
```

## Backend Setup

```bash
cd api
npm install
npm run dev
```

The backend runs on:

```txt
http://localhost:1000
```

### Database Setup

Open MySQL and run:

```sql
SOURCE api/schema.sql;
```

Or import `api/schema.sql` using phpMyAdmin / MySQL Workbench.

Default database name:

```txt
EPMS2
```

You can override database values with environment variables:

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=EPMS2
PORT=1000
CLIENT_URL=http://localhost:5173
```

## Backend Routes

### Employees

```txt
GET    /employees
POST   /employees
DELETE /employees/:id
```

### Departments

```txt
GET    /departments
POST   /departments
DELETE /departments/:code
```

### Salaries

```txt
GET    /salaries
POST   /salaries
DELETE /salaries/:id
```

### Payroll

```txt
GET /payroll
GET /payroll/summary
```

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

The frontend runs on:

```txt
http://localhost:5173
```

Optional frontend environment variable:

```bash
VITE_API_URL=http://localhost:1000
```

## What Was Added

- Payroll controller
- Payroll API routes
- Employee table with add/delete
- Department table with add/delete
- Salary table with add/delete
- Payroll joined table
- Payroll summary cards
- Minimal React/Vite frontend
- Tailwind UI styling
- Fixed broken backend imports and table names
- Fixed database schema mismatch

## Auth Note

There is no authentication in this version by design. Add your auth middleware later to the API routes and protect frontend pages when ready.
