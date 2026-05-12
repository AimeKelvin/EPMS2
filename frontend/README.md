# EPMS Client

Minimal React + Vite + Tailwind CDN frontend for the EPMS payroll backend.

## Pages

The client is separated into simple table pages:

- Employees
- Departments
- Salaries
- Payroll

There is no dashboard and no statistics section.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Default API URL:

```env
VITE_API_URL=http://localhost:1000
```

## Build

```bash
npm run build
```

## Notes

- Authentication is not included.
- Styling is intentionally minimal and responsive.
- Tables scroll horizontally on small screens.
