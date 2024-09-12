# iTechnosol_Practical
Repo For iTechnosol_Practical 


# Express, TypeScript, and Mongoose REST API

## Project Overview

This project is a RESTful API built using **Express** with **TypeScript** and **Mongoose** for database operations. The API allows you to create, read, update, and delete (CRUD) resources, which are stored in a MongoDB database.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Environment Variables](#environment-variables)
6. [Usage](#usage)
8. [Project Structure](#project-structure)
9. [Testing](#testing)

## Features

- Full CRUD operations for managing resources
- MongoDB database integration with Mongoose
- Modular code structure with TypeScript
- Error handling and validation
- RESTful API design
- Type-safe code with TypeScript

## Tech Stack

- **Node.js**: Runtime environment
- **Express.js**: Web framework for building APIs
- **TypeScript**: Typed JavaScript
- **Mongoose**: MongoDB ODM (Object Data Modeling)
- **MongoDB**: Database

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js v20 (or any version you're using)
- MongoDB installed locally or an accessible MongoDB instance
- Docker (optional) for running MongoDB in a container

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/DarpanVadher/iTechnosol_Practical.git
   cd your-repo-name

2. Install dependencies:
    ```bash
    npm install

3. Compile TypeScript to JavaScript:
    ```bash
    npm run build

## Environment Variables

- Create a .env file in the root of the project and add the following environment variables:  
    ```bash
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/your-database

 - PORT: The port on which the server runs
 - MONGO_URI: The MongoDB connection string

## Usage

1. To start the development server:
    ```bash
    npm run dev
    ```
    This will start the server with hot-reloading using ts-node.

2. To build and run the project in production mode:
    ```bash
    npm run build
    npm start
    ```
## Project Structure

 ```bash
    src/
    │
    ├── controllers/        # Controllers for handling requests
    ├── models/             # Mongoose models (schemas)
    ├── routes/             # Express route handlers
    ├── middlewares/        # Middleware for validation and error handling
    ├── services/           # Business logic and data access
    ├── utils/              # Utility functions
    ├── app.ts              # Express app setup
    └── server.ts           # Server entry point
```

## Testing
 - To run the tests, use
    ```bash
    npm test