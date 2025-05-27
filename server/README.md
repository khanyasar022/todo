# Backend Server (tRPC, Prisma, PostgreSQL)

This directory contains the backend server for the Todo application.

## Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn
- PostgreSQL server running

## Setup

1.  **Install Dependencies:**
    Navigate to the `server` directory and run:
    ```bash
    npm install
    # or
    # yarn install
    ```

2.  **Set up Environment Variables:**
    Create a `.env` file in the `server` directory by copying the example below. Update the `DATABASE_URL` with your PostgreSQL connection string if it's different.

    ```env
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
    PORT=5000
    ```

    **Example `.env` content:**
    ```env
    DATABASE_URL="postgresql://postgres:postgres@localhost:5432/todo_db"
    PORT=5000
    ```

    Ensure that the specified database (e.g., `todo_db`) exists in your PostgreSQL server. If not, you'll need to create it.

3.  **Run Database Migrations:**
    This command will apply any pending database schema changes and generate the Prisma Client.
    ```bash
    npx prisma migrate dev --name init
    ```
    If you are setting up for the first time, this will create the `Todo` table in your database.

    You might also need to generate the Prisma client separately if you encounter issues:
    ```bash
    npx prisma generate
    ```

## Running in Development Mode

To start the development server, run the following command from the `server` directory:

```bash
npm run dev
```

The server will typically start on `http://localhost:5000` (or the port specified in your `.env` file).

## Available Scripts

-   `npm run dev`: Starts the server in development mode with `ts-node`.
-   `npm run build`: Compiles the TypeScript code to JavaScript (outputs to `dist` directory).
-   `npm run start`: Starts the production server (requires a prior `npm run build`).
-   `npm run prisma:generate`: Generates Prisma Client.
-   `npm run prisma:migrate`: Runs database migrations. 