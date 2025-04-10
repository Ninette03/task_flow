# TaskFlow

This is a full-stack task management application built with **React**, **Node.js/Express**, **PostgreSQL**, and **Docker** for local development.

---

## Features

- User authentication via Google (Firebase)
- Task creation, update, fetching and deletion
- Task completion tracking by marking tasks as completed
- Responsive UI built with Material UI
- Persistent PostgreSQL database
- Dockerized for easy local setup

---

## Technologies Used

- **Frontend**: React (Create React App), TypeScript, Redux Toolkit, Material UI, React Router
- **Backend**: Node.js, Express, PostgreSQL
- **Auth**: Firebase Google Authentication
- **DevOps**: Docker, Docker Compose

---

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Environment Variables

Create a `.env` file in the root of your project with:

```env
PORT=5000
DB_URL=postgres://postgres:postgres@db:5432/taskapp

Method	Endpoint	Description

POST	/api/auth/google	User login

Tasks

Method	Endpoint	    Description	Access

GET	    /api/tasks	    Get tasks (all for users only)
GET     /api/admin      Get tasks (all for admin)
POST	/api/tasks	    Create new task	All users
PUT	    /api/tasks/:id	Update task	Admin only
DELETE	/api/tasks/:id	Delete task	Admin only
PATCH	/api/tasks/:id/complete	Mark task complete	(user)

Frontend Structure
Copy
src/
├── app/                  # Redux store setup
├── features/             # Redux slices
│   ├── auth/             # Authentication logic
│   └── tasks/            # Task management logic
├── components/           # Reusable components
├── pages/                # Route-based pages
│   ├── AdminDashboard/   # Admin views
│   └── Dashboard/    # User views
├── services/             # API service calls
└── hooks/                # Custom React hooks

How to Contribute

Write unit tests for new features

Document new API endpoints

Keep commits atomic and well-described

License
MIT

Copy

Key sections included:
1. **Project Setup** - Detailed installation instructions
2. **API Documentation** - Clear endpoint tables with examples
3. **Contribution Guidelines** - Standardized process for contributors
4. **Frontend Structure** - Quick overview of the code organization
5. **Environment Setup** - Configuration instructions

The README provides everything needed to:
- Set up the development environment
- Understand the API structure
- Contribute to the project
- Deploy the application