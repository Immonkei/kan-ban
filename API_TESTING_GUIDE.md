# Kanban API - Testing Guide

Complete guide for testing the GraphQL Kanban Task Manager API.

---

## Table of Contents

1. [Setup](#setup)
2. [Authentication Flow](#authentication-flow)
3. [Testing Tools](#testing-tools)
4. [API Operations](#api-operations)
5. [Sample Queries & Mutations](#sample-queries--mutations)
6. [Testing Scenarios](#testing-scenarios)
7. [Error Handling](#error-handling)
8. [Notes](#notes)

---

## Setup

### Prerequisites

- Node.js (latest LTS)
- npm or yarn
- PostgreSQL

### Installation

```bash
# Clone repository
git clone <repo-url>
cd kan-ban/backend

# Install dependencies
npm install
```

### Environment

Create a `.env` file at the project root:

```env
PORT=4000
DATABASE_URL="postgresql://user:password@localhost:5432/kan-ban?schema=public"
JWT_SECRET=your-secure-secret-with-at-least-32-characters
```

### Database setup

```bash
npm run db:generate
npm run db:migrate
```

If a seed file is configured, use:

```bash
npx prisma db seed
```

### Run the server

```bash
npm run dev
```

The GraphQL endpoint is available at:

```text
http://localhost:4000/graphql
```

---

## Authentication Flow

### Register

```graphql
mutation Register {
  register(input: {
    name: "John Doe"
    email: "user@example.com"
    password: "SecurePassword123!"
  }) {
    accessToken
    refreshToken
    user {
      id
      email
      name
      role
    }
  }
}
```

### Login

```graphql
mutation Login {
  login(input: {
    email: "user@example.com"
    password: "SecurePassword123!"
  }) {
    accessToken
    refreshToken
    user {
      id
      email
      name
      role
    }
  }
}
```

### Set authorization header

Add to request headers:

```http
Authorization: Bearer <accessToken>
```

### Refresh access token

```graphql
mutation RefreshToken {
  refreshToken(token: "<refreshToken>") {
    accessToken
  }
}
```

### Logout

```graphql
mutation Logout {
  logout {
    success
    message
  }
}
```

---

## Testing Tools

### Apollo GraphQL Explorer

1. Open: `http://localhost:4000/graphql`
2. Add the `Authorization` header:
   ```json
   {
     "Authorization": "Bearer YOUR_ACCESS_TOKEN"
   }
   ```
3. Execute queries and mutations.

### cURL

```bash
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{"query":"{ me { id email name role } }"}'
```

### Postman

1. Create new POST request
2. URL: `http://localhost:4000/graphql`
3. Add headers:
   - `Content-Type: application/json`
   - `Authorization: Bearer YOUR_ACCESS_TOKEN`
4. Use raw JSON body with your GraphQL query.

### GraphQL client example

```javascript
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
```

---

## API Operations

### Authentication

- `register(input)` - Create a new user
- `login(input)` - Authenticate a user
- `logout` - Invalidate the current refresh token(s)
- `refreshToken(token)` - Request a new access token

### User operations

- `me` - Get authenticated user information
- `users` - List users (RBAC-protected)
- `user(id)` - Get a user by ID
- `updateUser(id, input)` - Update user fields
- `deleteUser(id)` - Delete a user

### Board operations

- `boards` - List accessible boards
- `board(id)` - Get board details
- `createBoard(input)` - Create a board
- `updateBoard(id, input)` - Update a board
- `deleteBoard(id)` - Delete a board

### Task operations

- `tasks(filter)` - List tasks with filtering, pagination, and sorting
- `task(id)` - Get task details
- `createTask(input)` - Create a task
- `updateTask(id, input)` - Update a task
- `deleteTask(id)` - Delete a task
- `updateTaskStatus(id, status)` - Change task status
- `assignTask(taskId, userId)` - Assign a task to a user

---

## Sample Queries & Mutations

### Current user

```graphql
query Me {
  me {
    id
    name
    email
    role
  }
}
```

### List users

```graphql
query Users {
  users {
    id
    name
    email
    role
  }
}
```

### List boards

```graphql
query Boards {
  boards {
    id
    name
    owner {
      id
      email
    }
    tasks {
      id
      title
    }
  }
}
```

### List tasks

```graphql
query Tasks {
  tasks(filter: { page: 1, limit: 10 }) {
    data {
      id
      title
      status
      priority
      dueDate
    }
    total
    page
    limit
    totalPages
  }
}
```

### Create board

```graphql
mutation CreateBoard {
  createBoard(input: { name: "New Board" }) {
    id
    name
  }
}
```

### Create task

```graphql
mutation CreateTask {
  createTask(input: {
    boardId: 1
    title: "New Task"
    description: "Task details"
    status: TODO
    priority: MEDIUM
    dueDate: "2026-08-01"
  }) {
    id
    title
    status
    priority
  }
}
```

### Update task status

```graphql
mutation UpdateTaskStatus {
  updateTaskStatus(id: 1, status: IN_PROGRESS) {
    id
    status
  }
}
```

### Assign task

```graphql
mutation AssignTask {
  assignTask(taskId: 1, userId: 2) {
    id
    assignee {
      id
      email
    }
  }
}
```

---

## Testing Scenarios

- Validate registration and login flows
- Confirm protected queries work with `Authorization` header
- Ensure RBAC restrictions are enforced
- Validate board ownership and access rules
- Validate task CRUD operations and list filtering
- Confirm refresh token renewal works
- Confirm logout invalidates refresh tokens

---

## Error Handling

- GraphQL errors are returned in the `errors` array
- Validation failures come from Zod schemas
- Auth failures return relevant application error codes

Example error response:

```json
{
  "errors": [
    {
      "message": "Invalid email or password",
      "extensions": {
        "code": "BAD_REQUEST"
      }
    }
  ]
}
```

---

## Notes

- The backend uses PostgreSQL, not SQLite.
- Authentication uses JWT tokens in `Authorization: Bearer <token>`.
- The login and register mutations require the `input` argument.
- A seed script exists for demo users:
  - `admin@test.com` / `Password123`
  - `manager1@test.com`–`manager3@test.com` / `Password123`
  - `user1@test.com`–`user16@test.com` / `Password123`
- Run tests with:

```bash
npm test -- --runInBand
```


```graphql
mutation CreateBoard {
  createBoard(input: { name: "My Board" }) {
    id
    name
    owner {
      id
      name
    }
    createdAt
  }
}
```

### 4. Get Board with Tasks

```graphql
query GetBoard($id: String!) {
  board(id: $id) {
    id
    name
    owner {
      id
      name
      email
    }
    tasks {
      id
      title
      status
      priority
      assignee {
        id
        name
        email
      }
    }
  }
}
```

Variables:
```json
{ "id": "1" }
```

### 5. Create Task

```graphql
mutation CreateTask {
  createTask(input: {
    title: "Setup authentication"
    description: "Implement JWT authentication"
    boardId: "1"
    priority: "HIGH"
    dueDate: "2026-07-10"
  }) {
    id
    title
    status
    priority
    board {
      id
      name
    }
  }
}
```

### 6. Update Task

```graphql
mutation UpdateTask {
  updateTask(id: "1", input: {
    title: "Setup authentication - Updated"
    description: "Implement JWT with refresh tokens"
    priority: "CRITICAL"
  }) {
    id
    title
    description
    priority
  }
}
```

### 7. Update Task Status

```graphql
mutation UpdateTaskStatus {
  updateTaskStatus(id: "1", status: "IN_PROGRESS") {
    id
    title
    status
  }
}
```

### 8. Assign Task

```graphql
mutation AssignTask {
  assignTask(taskId: "1", userId: "2") {
    id
    title
    assignee {
      id
      name
      email
    }
  }
}
```

### 9. List Tasks with Filtering

```graphql
query ListTasks {
  tasks(filter: {
    status: "PENDING"
    priority: "HIGH"
    search: "authentication"
    sortBy: "CREATED_AT"
    order: "DESC"
    page: 1
    limit: 10
  }) {
    data {
      id
      title
      status
      priority
      assignee {
        name
      }
    }
    total
  }
}
```

### 10. Delete Task (ADMIN Only)

```graphql
mutation DeleteTask {
  deleteTask(id: "1")
}
```

---

## Testing Scenarios

### Scenario 1: Full User Journey

#### 1. Register User
```graphql
mutation {
  register(input: {
    email: "alice@example.com"
    password: "AlicePassword123!"
    name: "Alice Smith"
  }) {
    accessToken
    refreshToken
    user { id email role }
  }
}
```

#### 2. Create Board
```graphql
mutation {
  createBoard(input: { name: "Alice's Project" }) {
    id
    name
  }
}
```

#### 3. Create Task
```graphql
mutation {
  createTask(input: {
    title: "First Task"
    boardId: "1"
    priority: "HIGH"
  }) {
    id
    title
  }
}
```

#### 4. Update Task Status
```graphql
mutation {
  updateTaskStatus(id: "1", status: "IN_PROGRESS") {
    id
    status
  }
}
```

---

### Scenario 2: Authentication & Authorization

#### Test Token Refresh
```graphql
mutation {
  refreshToken(token: "YOUR_REFRESH_TOKEN") {
    accessToken
  }
}
```

#### Test Unauthorized Access (without token)
- Try query without `Authorization` header
- Expected: `Unauthorized` error

#### Test Permission Denied (USER trying ADMIN action)
```graphql
mutation {
  deleteUser(id: "1")
}
```
Expected: `Forbidden` error

---

### Scenario 3: Data Validation

#### Invalid Email Format
```graphql
mutation {
  register(input: {
    email: "invalid-email"
    password: "Password123!"
    name: "Test"
  }) {
    accessToken
  }
}
```
Expected: `Validation error - Invalid email`

#### Short Password
```graphql
mutation {
  register(input: {
    email: "test@example.com"
    password: "short"
    name: "Test"
  }) {
    accessToken
  }
}
```
Expected: `Validation error - Password too short`

#### Missing Required Field
```graphql
mutation {
  createTask(input: {
    description: "Missing title"
    boardId: "1"
  }) {
    id
  }
}
```
Expected: `Validation error - Title is required`

---

### Scenario 4: Permission Checks

#### USER trying to update another's task
```graphql
mutation {
  updateTask(id: "2", input: { title: "Hacked" }) {
    id
  }
}
```
Expected: `Forbidden error` (if task not assigned to current user)

#### Non-owner trying to delete board
```graphql
mutation {
  deleteBoard(id: "1")
}
```
Expected: `Forbidden error` (if not board owner or ADMIN)

---

### Scenario 5: Pagination & Filtering

#### Paginated Task List
```graphql
query {
  tasks(filter: {
    page: 1
    limit: 5
  }) {
    data { id title }
    total
  }
}
```

#### Filtered Tasks
```graphql
query {
  tasks(filter: {
    status: "IN_PROGRESS"
    priority: "HIGH"
    search: "urgent"
    sortBy: "CREATED_AT"
    order: "DESC"
  }) {
    data { id title priority }
    total
  }
}
```

---

## Error Handling

### Expected Error Responses

#### 1. Authentication Error
```json
{
  "errors": [
    {
      "message": "Unauthorized",
      "extensions": {
        "code": "UNAUTHENTICATED",
        "statusCode": 401
      }
    }
  ]
}
```

#### 2. Validation Error
```json
{
  "errors": [
    {
      "message": "Invalid email format",
      "extensions": {
        "code": "BAD_REQUEST",
        "statusCode": 400,
        "details": "Email must be a valid email address"
      }
    }
  ]
}
```

#### 3. Permission Error
```json
{
  "errors": [
    {
      "message": "You do not have permission",
      "extensions": {
        "code": "FORBIDDEN",
        "statusCode": 403
      }
    }
  ]
}
```

#### 4. Not Found Error
```json
{
  "errors": [
    {
      "message": "Task not found",
      "extensions": {
        "code": "NOT_FOUND",
        "statusCode": 404
      }
    }
  ]
}
```

---

## Performance Testing

### 1. DataLoader Batch Optimization

The API uses DataLoader to batch database queries. To verify:

```graphql
query {
  boards {
    id
    name
    owner { id name }        # Batched query
    tasks {                  # Batched query
      id
      title
      assignee { id name }   # Batched query
    }
  }
}
```

Expected: Single batch query per relation type, not N+1 queries.

### 2. Load Testing with Apache Bench

```bash
# Register user first to get token
# Then test with load:
ab -n 100 -c 10 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -p request.json \
  -T application/json \
  http://localhost:4000/graphql
```

### 3. Monitor Query Performance

Check network tab in browser DevTools:
- Each query should respond in < 200ms
- DataLoader batches reduce N+1 queries to ~4 queries max

---

## Running Unit Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test tests/auth.service.test.ts

# Run with verbose output
npm test -- --verbose
```

Expected output:
```
✔ authService (262ms)
  ✔ registers a new user and returns access and refresh tokens
  ✔ rejects duplicate email registration
  ✔ refreshes access token using valid refresh token
  ✔ rejects invalid or expired refresh tokens
  ✔ invalidates all refresh tokens on logout

✔ taskService.updateTask (124ms)
  ✔ wraps invalid update input in BadRequestError
  ✔ allows a USER to update a task assigned to them
  ✔ rejects a USER updating a task not assigned to them

✅ All 8 tests passing
```

---

## Quick Start Commands

```bash
# Development
npm run dev

# Build
npm run build

# Production start
npm start

# Run tests
npm test

# Database operations
npm run db:migrate      # Run migrations
npm run db:studio       # Open Prisma Studio
npm run db:generate     # Generate Prisma client

# Health check
curl http://localhost:4000/health
```

---

## Troubleshooting

### Issue: "JWT_SECRET must be at least 32 characters"
**Solution**: Update `.env` file with a longer secret:
```env
JWT_SECRET=my_super_secret_key_that_is_at_least_32_chars
```

### Issue: "Database locked" error
**Solution**: Kill any other dev processes and restart:
```bash
npm run build && npm start
```

### Issue: "Token expired"
**Solution**: Use the refresh token to get a new access token:
```graphql
mutation {
  refreshToken(token: "YOUR_REFRESH_TOKEN") {
    accessToken
  }
}
```

### Issue: "Cannot find module" after npm install
**Solution**: Regenerate Prisma client:
```bash
npm run db:generate
```

---

## Additional Resources

- **GraphQL Docs**: https://graphql.org/learn/
- **Apollo Server**: https://www.apollographql.com/docs/apollo-server/
- **Prisma Docs**: https://www.prisma.io/docs/
- **JWT**: https://jwt.io/

---

**Version**: 1.0.0  
**Last Updated**: 2026-07-05  
**API Status**: Production Ready ✅
