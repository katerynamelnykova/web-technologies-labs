# Web Technologies Labs

This repository contains the lab assignments for the **Web Technologies** course. Each lab focuses on implementing various web technologies, ranging from WebSocket protocols to JWT authentication, CRUD operations, GraphQL, and API development.

## Labs Overview

### Lab 1: WebSocket Protocol and Chat Application
- **Objective**: Develop a real-time chat application using the WebSocket protocol and the Socket.IO library.
- **Technologies**: Socket.IO, WebSockets, Node.js
- **Example Application**: Real-time messaging between users, along with notifications when a user joins the chat.
  
![Chat Example](https://github.com/user-attachments/assets/b951c968-a86a-488f-ab42-ead6a3a7136f)


---

### Lab 2: JWT-based Authentication System
- **Objective**: Implement user authentication using JSON Web Tokens (JWT).
- **Technologies**: JWT, Golang
- **Features**: 
  1. Encrypted password storage during registration and updates.
  2. Authorization via JWT tokens included in the request headers.
  3. User role management, with actions based on roles (`user` and `admin`).

![JWT Example](https://github.com/user-attachments/assets/219bafb9-45e0-47c5-902d-ac7fa709ac03)


---

### Lab 3: Telegram Bot with ChatGPT Integration
- **Objective**: Create a Telegram bot with a menu system and ChatGPT integration for handling queries.
- **Technologies**: Python, Telegram API, Groq API, PythonAnywhere (for deployment)
- **Features**: 
  - Menu for displaying user information (name, group), contact details.
  - Integration with Groq to process user prompts.

![Telegram Bot Example](https://github.com/user-attachments/assets/4ce40d3b-d1d2-420e-8267-560c1afb873e)


---

### Lab 4: CRUD Application using Node.js and MongoDB
- **Objective**: Build a CRUD (Create, Read, Update, Delete) application that interacts with a MongoDB database.
- **Technologies**: Node.js, MongoDB, Express
- **Features**: 
  - Basic CRUD operations on a set of records stored in a database.
  - API routes for retrieving JSON data.

![CRUD Example](https://github.com/user-attachments/assets/d2456de2-a1b6-4a41-b031-2175239854d1)


---

### Lab 5: GraphQL Queries and Mutations
- **Objective**: Create a GraphQL schema, queries, and mutations to interact with the MongoDB database created in Lab 4.
- **Technologies**: GraphQL, Node.js, MongoDB
- **Features**: 
  - Perform database operations using GraphQL queries and mutations.
  - Investigate the results using Postman or another API testing tool.

![GraphQL Example](https://github.com/user-attachments/assets/a49cfabe-5753-4f84-b214-252b047c1b4d)

---

### Lab 6: FastAPI for Building Custom API
- **Objective**: Develop a RESTful API using FastAPI, enabling CRUD operations for managing a dataset.
- **Technologies**: FastAPI, Python
- **Features**: 
  - API creation for retrieving, adding, editing, and deleting data.
  - Efficient route handling for different operations.

![FastAPI Example](https://github.com/user-attachments/assets/da1c8f6c-82fb-4766-97f3-8fd8ca85b1c0)


---

## How to Run

### Prerequisites
- **Node.js** and **npm** installed for Node.js labs (Lab 1, 2, 4, and 5).
- **Python 3.10+** and **pip** for Python labs (Lab 3 and Lab 6).
- **MongoDB** for Lab 4 and Lab 5.

### Instructions

1. Clone the repository:
  ```
   git clone https://github.com/katerynamelnykova/web-technologies-labs.git
  ```
2. Navigate to the specific lab directory:
  ```
   cd web-technologies-labs/lab-x
  ```
3. Install dependencies:
  ```
   pnpm install
  ```
4. Run the application:

- For Node.js applications:

  ```
   pnpm start
  ```

- For FastAPI applications:

  ```
   uvicorn main:app --reload
  ```
