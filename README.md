# RandomQuote

RandomQuote is a full-stack quote application built to demonstrate the integration between a RESTful API, a modern web frontend, and Redis caching.

The application provides quote management and random quote retrieval, with Redis used as a caching layer to improve the efficiency of frequently requested random quotes.

## Overview

RandomQuote consists of two main applications:

- **Backend** — RESTful API responsible for quote management, business logic, database operations, and Redis caching.
- **Frontend** — Web application that consumes the REST API and provides the user interface for interacting with quotes.

## Features

### Quote Management

Users can:

- Create quotes
- View quotes
- Update quotes
- Delete quotes

### Random Quote

The application provides a random quote feature that:

- Retrieves a random quote from the API
- Uses Redis as a caching layer
- Reduces repeated database queries for cached data

### Redis Caching

Redis is integrated into the backend to demonstrate caching concepts, including:

- Storing frequently requested data in Redis
- Retrieving cached data using Redis
- Reducing unnecessary database queries
- Improving response efficiency for frequently accessed data

## Tech Stack

### Backend

- Node.js
- Express.js
- PostgreSQL
- Redis
- Sequelize

### Frontend

- Vue 3
- Vite
- Vue Router
- Axios
- Vuetify

### API Documentation

- Postman

## Project Structure

```text
taskflow-app/
├── backend/
│   ├── config/
│   ├── controller/
│   ├── migrations/
│   ├── models/
│   ├── router/
│   ├── seeders/
│   └── server.js
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       ├── router/
│       └── services/
│
├── .gitignore
├── README.md
└── ...
```

## Database

RandomQuote uses PostgreSQL as the primary database with Sequelize ORM for database interaction.

The main entity is:

- Quotes

Database structure and changes are managed using Sequelize migrations.

Sequelize seeders are used to populate the database with initial quote data, allowing the application to have sample quotes available after setup.

PostgreSQL serves as the persistent data store, while Redis is used as a caching layer for frequently requested data.

## API Documentation

The RandomQuote REST API is documented using Postman.

The documentation is organized into the following resource:

- **Quotes** — Quote management and random quote retrieval.

Each request includes documentation covering the endpoint, request method, request parameters or body, authentication requirements where applicable, and example responses.

### Postman Collection

The collection is available online through Postman:

**[View TaskFlow API Collect] (https://www.postman.com/supply-architect-78675178-s-team/workspace/wildan-workspace/collection/37849025-275f9a3c-b859-400c-98af-9b217c7e2266?action=share&source=copy-link&creator=37849025)**

A JSON export of the collection is also included in the repository:

```text
postman/
└── RandomQuote API.postman_collection.json
```

## Installation

### Backend

```bash
cd backend
npm install
```

Configure the required environment variables in `.env`, then run the database migrations and seeders if applicable:

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

Start the backend:

```bash
npm run dev
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
```

Configure the API URL in `.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

Start the frontend:

```bash
npm run dev
```

## Environment Variables

Environment files containing sensitive or local configuration are not included in the repository.

### Backend

```env
#DATABASE
DB_HOST =
DB_USER =
DB_PASSWORD =
DB_NAME =
DB_DIALECT =

#PRODUCTION
DB_URL=
DB_DIALECT_PROD=

#REDIS
RD_HOST =
RD_PORT =
RD_URL=

#PORT
PORT =

NODE_ENV=
```

### Frontend

```env
VITE_API_URL=
```

## Notes

RandomQuote is a portfolio and learning project focused on demonstrating practical REST API development and Redis caching.

The project emphasizes:

- RESTful API development
- Database design and operations
- CRUD operations
- Redis integration
- Caching concepts
- Backend and frontend integration
- API documentation
