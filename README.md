# Full-Stack Todo Application

This project is a simple Todo application built with a modern full-stack JavaScript/TypeScript setup. It features separate frontend and backend services, allowing for clear separation of concerns and independent development.

## Project Structure

-   `/frontend`: Contains the Next.js (Pages Router) frontend application.
-   `/server`: Contains the Node.js, Express, and tRPC backend application.

Each directory has its own `README.md` with specific setup and run instructions.

## Technology Stack

### 1. Backend (`/server`)

-   **Runtime Environment:** [Node.js](https://nodejs.org/)
-   **Framework:** [Express.js](https://expressjs.com/) - Minimalist web framework for Node.js.
-   **API Layer:** [tRPC](https://trpc.io/) - Allows for building end-to-end typesafe APIs without schemas or code generation for the API contract itself. Procedures are defined on the server and can be called directly from the client with full type safety.
-   **Database ORM:** [Prisma](https://www.prisma.io/) - Next-generation ORM for Node.js and TypeScript. Used for database interactions with PostgreSQL.
-   **Database:** [PostgreSQL](https://www.postgresql.org/) - Powerful, open-source object-relational database system.
-   **Schema Validation:** [Zod](https://zod.dev/) - TypeScript-first schema declaration and validation library. Used with tRPC for input validation.
-   **Language:** [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript that compiles to plain JavaScript.

### 2. Frontend (`/frontend`)

-   **Framework:** [Next.js (Pages Router)](https://nextjs.org/) - React framework for production, providing server-side rendering, static site generation, and more.
-   **UI Library:** [React](https://reactjs.org/) - JavaScript library for building user interfaces.
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom user interfaces.
-   **tRPC Client:** [`@trpc/client`](https://trpc.io/docs/client/vanilla) & [`@trpc/react-query`](https://trpc.io/docs/client/react-query) - Used to make type-safe API calls to the tRPC backend.
-   **Data Fetching/Caching:** [TanStack Query (React Query)](https://tanstack.com/query/latest) - Powerful asynchronous state management for data fetching, caching, synchronization, and updates. Integrated with tRPC.

### 3. General

-   **Package Management:** npm (Node Package Manager)
-   **Version Control:** Git

## Core Features Implemented

-   Add a Todo
-   List Todos
-   Update a Todo (mark as completed/uncompleted)
-   Edit a Todo (title and description via a separate page)
-   Delete a Todo
-   Dark mode UI support

## Getting Started

Please refer to the `README.md` files within the `/frontend` and `/server` directories for specific instructions on how to set up and run each part of the application. 