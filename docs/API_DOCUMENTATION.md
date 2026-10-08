# API Documentation

## Authentication
Uses Bearer JWT. Include the token in the `Authorization` header:
`Authorization: Bearer <token>`

### POST /api/auth/register
Register a new user.
- **Body:** `{ "email": "user@example.com", "password": "password123", "full_name": "John Doe" }`
- **Success:** `200 OK` `{ "success": true, "token": "jwt-token", "user": { "id": "uuid", "email": "...", "full_name": "..." } }`
- **Error:** `400 Bad Request` `{ "success": false, "message": "Email already in use" }`

### POST /api/auth/login
Login an existing user.
- **Body:** `{ "email": "user@example.com", "password": "password123" }`
- **Success:** `200 OK` `{ "success": true, "token": "jwt-token", "user": { "id": "uuid", "email": "...", "full_name": "..." } }`
- **Error:** `400 Bad Request` `{ "success": false, "message": "Invalid credentials" }`

### POST /api/auth/logout
Logout (client side should clear token).
- **Success:** `200 OK` `{ "success": true, "message": "Logged out" }`

### GET /api/auth/me
Get current authenticated user.
- **Authentication:** Required
- **Success:** `200 OK` `{ "success": true, "user": { "id": "uuid", "email": "...", "full_name": "..." } }`

## Projects
All routes require Authentication.

### GET /api/projects
Get all projects owned by the authenticated user.
- **Success:** `200 OK` `{ "success": true, "projects": [...] }`

### GET /api/projects/:id
Get a specific project.
- **Path Param:** `id` (Project UUID)
- **Success:** `200 OK` `{ "success": true, "project": {...} }`
- **Error:** `404 Not Found` or `403 Forbidden`

### POST /api/projects
Create a new project.
- **Body:** `{ "name": "Project Name", "description": "Optional" }`
- **Success:** `201 Created` `{ "success": true, "project": {...} }`

### PUT /api/projects/:id
Update a project.
- **Path Param:** `id`
- **Body:** `{ "name": "New Name", "status": "IN_PROGRESS" }`
- **Success:** `200 OK` `{ "success": true, "project": {...} }`

### DELETE /api/projects/:id
Delete a project.
- **Path Param:** `id`
- **Success:** `200 OK` `{ "success": true, "message": "Project deleted" }`

## Tasks
All routes require Authentication.

### GET /api/tasks
Get tasks. Can filter by project.
- **Query Params:** `project_id`
- **Success:** `200 OK` `{ "success": true, "tasks": [...] }`

### GET /api/tasks/:id
Get a specific task.
- **Path Param:** `id`
- **Success:** `200 OK` `{ "success": true, "task": {...} }`

### POST /api/tasks
Create a task.
- **Body:** `{ "project_id": "uuid", "name": "Task Name", "priority": "HIGH" }`
- **Success:** `201 Created` `{ "success": true, "task": {...} }`

### PUT /api/tasks/:id
Update a task.
- **Path Param:** `id`
- **Body:** `{ "status": "COMPLETED" }`
- **Success:** `200 OK` `{ "success": true, "task": {...} }`

### DELETE /api/tasks/:id
Delete a task.
- **Path Param:** `id`
- **Success:** `200 OK` `{ "success": true, "message": "Task deleted" }`

## Dashboard
### GET /api/dashboard
Get dashboard statistics for the authenticated user.
- **Authentication:** Required
- **Success:** `200 OK` `{ "success": true, "stats": { "totalProjects": 5, "totalTasks": 20, "completedTasks": 5 } }`
