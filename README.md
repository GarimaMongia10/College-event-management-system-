# College Event Management System

## System Features

- Events CRUD (Admin-only): create, update, delete events.
- Users can view events and register/unregister for events.
- Admin Dashboard: manage events, view users, view reports, manage settings.
- Authentication: JWT-based login with role included in token.
- Role-based access control: Admin vs User.
- Persistent logging of unauthorized access attempts (`backend/logs/auth.log`).

## Architecture

- Backend: Node.js + Express + MongoDB (Mongoose)
- Frontend: React (Create React App)
- API base path: `/api`

Key backend modules:
- `routes/event.js` — event management and registration
- `routes/auth.js` — register/login with JWT
- `routes/users.js` — admin-only user listing
- `middleware/auth.js` — token verification and role middleware
- `utils/logger.js` — persistent auth logging

## API Security

- All protected endpoints require `Authorization: Bearer <token>` header.
- JWT payload includes `{ id, role }`.
- Role checks are enforced by `authMiddleware(allowedRoles)`.
- Non-admin attempts to access admin endpoints return `403 Forbidden` and are logged in `backend/logs/auth.log`.

Example protection:
- `POST /api/event` → Admin only
- `PUT /api/event/:id` → Admin only
- `DELETE /api/event/:id` → Admin only
- `GET /api/event` → Authenticated users
- `POST /api/event/:id/register` → Authenticated users

## User Flow

- Registration creates a `User` with default role `User`.
- Admins can be created manually (seed script) or via DB.
- After login, the frontend decodes role from JWT and stores it in `localStorage.role` for routing.

### Admin Flow

- Login as Admin
- Visit `/admin` to access the Admin Dashboard
- Create, edit, delete events; view users and reports
- Unauthorized users attempting `/admin` are redirected to the homepage

## UI Requirements

- Admin Page Components: Event Form (Add/Edit), Event List Table, Delete Button, Reports Section, Settings Section, Users list.
- User Page Components: View Events, Register for Events, Profile Page.

## Running Locally

1. Configure environment variables in `backend/.env`: `MONGO_URI`, `JWT_SECRET`, `PORT` (optional)
2. Start backend (from project root):

```powershell
cd backend
npm install
npm run dev
```

3. Start frontend:

```powershell
cd frontend
npm install
npm start
```

4. Seed sample data (optional):

```powershell
node backend/seed.js
```

## Notes & Next Steps

- For production, use secure JWT secret, HTTPS, and proper logging rotation.
- Consider using `winston` for structured logs and log rotation.
- Add user management UI (create/edit/delete users) if needed.

