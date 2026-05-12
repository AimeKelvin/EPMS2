# EPMS API

Express + MySQL API for employee payroll management.

## Run

```bash
npm install
npm run dev
```

Server URL:

```txt
http://localhost:1000
```

## Database

Import `schema.sql` into MySQL. It creates `EPMS2` and sample records.

```bash
mysql -u root -p < schema.sql
```

## Routes

```txt
GET    /employees
POST   /employees
DELETE /employees/:id

GET    /departments
POST   /departments
DELETE /departments/:code

GET    /salaries
POST   /salaries
DELETE /salaries/:id

GET    /payroll
GET    /payroll/summary
```
