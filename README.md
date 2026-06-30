# Work Management System 

— Frontend

A role-based employee attendance and work management system built with Vue 2 and Vuetify 2. Employees can mark attendance, apply for leave, log daily work, and view a calculated monthly paycheck. Admins can manage all employees, review and approve/reject leave requests, view attendance and work logs across the team, and set employee salaries.

## Tech Stack

- **Vue 2** — core framework
- **Vuetify 2** — UI component library
- **Vue Router 3** — client-side routing with nested layouts and navigation guards
- **Axios** — HTTP client, with an interceptor that automatically attaches the auth token to every request
- **Vue.observable()** — lightweight global state management (no Vuex)

## Prerequisites

- Node.js and npm installed
- The backend server running separately (see the backend README) — this app expects an API available at `http://localhost:3000`

## Setup

```bash
npm install
npm run serve
```

The app runs at `http://localhost:8080` by default.

## Environment

No `.env` file is required on the frontend. The backend API base URL is currently configured directly in `src/api/index.js`. If your backend runs on a different port, update the `baseURL` there.

## Project Structure

```
src/
├── api/            # Axios instance with auth interceptor
├── components/     # Reusable UI pieces, organized by feature
│   ├── common/     # Shared components (tables, page headers, buttons, dialogs)
│   ├── attendance/
│   ├── leave/
│   ├── worklog/
│   ├── paycheck/
│   └── admin/
├── layouts/        # Page shells (AuthLayout, EmployeeLayout, AdminLayout)
├── views/          # Route-level pages
│   ├── auth/
│   ├── employee/
│   └── admin/
├── router/         # Route definitions and auth/role navigation guards
└── store/          # Global state (store.js) and API-calling functions
```

## Authentication

Login issues a token which is stored in `localStorage` and automatically attached to every outgoing API request via an Axios interceptor. A navigation guard in the router blocks access to protected routes when no token is present, and redirects logged-in users away from the login page.

## Roles

- **Employee** — Dashboard, Attendance, Leave, Work Log, Monthly Summary, Profile
- **Admin** — Employee List/Detail (with per-employee Attendance, Leave, Work Log, and Paycheck tabs), Attendance Management, Leave Management, Work Log Management, and the ability to set/update employee salaries

## Key Features

- Real-time-feeling CRUD on attendance, leave, and work logs — no page reloads on create/update
- Leave approval workflow: employees see live status (pending/approved/rejected), admins approve or reject from a dedicated management view
- Calculated monthly paycheck per employee, combining attendance days, approved leave days, logged work units, and a configurable base salary, with tax deduction applied
- Admin can edit an employee's base salary directly from their detail view, and the paycheck recalculates immediately

## Notes

- This project does not use Vuex; global state is handled with a single reactive store (`src/store/store.js`) built on `Vue.observable()`.
- Run the backend first, or API calls from this app will fail.

— Backend

REST API powering the Work Management System frontend. Built with Express and Prisma ORM on top of PostgreSQL, with JWT-style token authentication and role-based middleware protection.

## Tech Stack

- **Node.js** with **ES Modules** (`import`/`export`, not `require`)
- **Express** — web framework
- **Prisma** — ORM connecting to PostgreSQL
- **PostgreSQL** — database
- **bcrypt** — password hashing

## Prerequisites

- Node.js and npm installed
- PostgreSQL installed and running, with a database created
- `psql` or a GUI client to inspect data if needed (Prisma Studio works too — see below)

## Setup

```bash
npm install
npx prisma migrate dev
node prisma/seed.js
node server.js
```

The API runs at `http://localhost:3000` by default.

## Environment Variables

Create a `.env` file in the project root:

```
DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name"
PORT=3000
```

`.env` is git-ignored — never commit real credentials.

## Database

Schema is defined in `prisma/schema.prisma`. After any schema change, run:

```bash
npx prisma migrate dev --name describe_your_change
```

To inspect data visually:

```bash
npx prisma studio
```

Seed data (sample admin, employees, attendance, leave, and work log records) is created by `prisma/seed.js`. It's written to be safely re-run (uses `upsert` for users/employees).

## Project Structure

```
controller/       # Business logic — one file per resource
routes/            # Express routers — map URLs to controller functions
middleware/        # Auth middleware, applied per-route in server.js
prisma/
├── schema.prisma  # Data models
└── seed.js        # Sample data
db.js              # Prisma client instance
server.js          # App entry point, route + middleware registration
```

## Authentication

Login (`POST /auth/login`) checks credentials against the database and returns a token. Every other route except `/auth/login` is protected by an auth middleware that requires a valid `Authorization` header — requests without one are rejected with `401`, regardless of whether a token exists elsewhere (e.g. typing a protected URL directly into a browser will not work, since no header is attached).

## API Overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/login` | Authenticate, returns user + token |
| GET | `/auth/me` | Returns current user from token |
| GET | `/attendance` | Logged-in user's attendance (`?userId=`) |
| POST | `/attendance` | Create attendance record |
| GET | `/attendance/all` | All employees' attendance (admin) |
| PATCH | `/attendance/:id` | Update an attendance record (admin) |
| GET | `/leaves` | Logged-in user's leave requests (`?userId=`) |
| POST | `/leaves` | Apply for leave |
| GET | `/leaves/all` | All leave requests (admin) |
| PATCH | `/leaves/:id` | Approve/reject a leave (admin) |
| GET | `/worklogs` | Logged-in user's work logs (`?userId=`) |
| POST | `/worklogs` | Submit a work log |
| GET | `/worklogs/all` | All work logs (admin) |
| GET | `/employees` | All employee profiles |
| PATCH | `/employees/:id` | Update an employee's salary (admin) |
| GET | `/paycheck` | Calculated paycheck (`?userId=&month=&year=`) |

## Paycheck Calculation

`GET /paycheck` derives a full paycheck on every request — nothing is pre-stored or cached. For the given `userId`, `month`, and `year`, it:

1. Counts attendance records marked `present` within that month
2. Sums approved leave days that fall within that month
3. Sums work log `units` logged within that month
4. Applies the formula:

```
earnedBaseSalary = (baseSalary / workingDaysInMonth) × (attendanceDays + approvedLeaveDays)
unitsBonus       = totalUnits × unitRate
grossPay         = earnedBaseSalary + unitsBonus
taxDeduction      = grossPay × 0.10
netPay           = grossPay - taxDeduction
```

Because this always reads live from the database, updating an employee's salary, approving a leave, or logging new work is reflected the very next time the paycheck endpoint is called — no manual recalculation step needed.

## Notes

- Date fields (`date`, `fromDate`, `toDate`) are stored as plain `String` (`YYYY-MM-DD`) in the schema, not `DateTime` — queries that filter by date range convert JavaScript `Date` objects to matching strings before querying.
- Run `npm install` and the migration/seed steps fresh if cloning this repo for the first time.