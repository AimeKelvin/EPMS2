# EPMS API

Simple Express + MySQL API.

## Run

```bash
npm install
cp .env.example .env
npm run dev
```

## Routes

```txt
POST   /auth/login
GET    /auth/me
POST   /auth/logout

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
```
