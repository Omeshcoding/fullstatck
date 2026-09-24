# Full Stack Open — 

A collection of exercises, applications, and full-stack projects completed while working through the **Full Stack Open** curriculum from the University of Helsinki.

The work covers modern JavaScript and React development, REST APIs, Node.js, Express, MongoDB, authentication, testing, state management, routing, custom hooks, and application architecture.

The repository demonstrates my progression from building interactive React applications to developing and connecting complete frontend and backend systems.

---

## 🧑‍💻 What I Practiced

Throughout Parts 0–7, I worked with:

* JavaScript (ES6+)
* React
* JSX
* React Hooks
* Component-based architecture
* State management
* REST APIs
* Node.js
* Express
* MongoDB
* Mongoose
* HTTP & asynchronous programming
* CRUD operations
* Authentication and authorization
* JWT
* Automated testing
* Integration testing
* End-to-end testing
* Redux
* React Router
* Custom Hooks
* Web application architecture
* Git & GitHub
* npm

---

# 📚 Course Progress

## Part 0 — Fundamentals of Web Apps

Focused on understanding how modern web applications work.

### Topics

* HTTP request/response cycle
* Browser and server communication
* REST architecture
* Single Page Applications
* Traditional web applications
* Sequence diagrams
* AJAX
* JSON
* DOM and browser-based communication

### Demonstrated

Understanding how a frontend communicates with a backend and how data moves through a web application.

---

## Part 1 — Introduction to React

Built my first React applications and learned the fundamentals of component-based UI development.

### Projects / Exercises

* Course Information
* Unicafe
* Anecdotes

### Topics

* React components
* JSX
* Props
* Component state
* Event handlers
* Conditional rendering
* Array rendering
* Forms
* Controlled components
* State management
* JavaScript array methods

### Key Learning

Learned how to break a user interface into reusable components and manage application state through React.

---

## Part 2 — Communicating with Server

Moved from standalone React applications to applications that communicate with external APIs and backend services.

### Projects / Exercises

* Phonebook
* Countries
* Data fetching and API-driven React applications

### Topics

* REST APIs
* Axios
* HTTP requests
* `useEffect`
* Asynchronous JavaScript
* Forms
* CRUD operations
* JSON data
* Error handling
* API integration

### Phonebook

Built a phonebook application that allows users to:

* Add contacts
* Search contacts
* Update contacts
* Delete contacts
* Retrieve data from a backend API

### Countries

Built an application that consumes country information from an external REST API and displays relevant country information based on user interaction.

### Key Learning

Learned how frontend applications consume APIs and synchronize UI state with remote data.

---

# Part 3 — Programming a Server with NodeJS and Express

Started building backend services using Node.js and Express.

### Main Project

**Phonebook Backend**

Built a REST API for the phonebook application.

### Topics

* Node.js
* Express
* REST architecture
* Middleware
* HTTP methods
* Request parameters
* Request bodies
* Routing
* JSON responses
* Error handling
* MongoDB
* Mongoose
* Environment variables
* Deployment

### API Operations

Implemented endpoints for operations such as:

```text
GET    /api/persons
GET    /api/persons/:id
POST   /api/persons
PUT    /api/persons/:id
DELETE /api/persons/:id
```

### Key Learning

Learned how to design and implement a RESTful backend and connect it to a database.

---

# Part 4 — Testing Express Servers, User Administration

Focused on backend architecture, testing, authentication, and database relationships.

## Main Project

### Blog List Backend

Built a backend service for managing blog posts and users.

### Topics

* Node.js
* Express
* MongoDB
* Mongoose
* REST APIs
* JWT authentication
* User authentication
* Authorization
* Password hashing
* Middleware
* Database relationships
* Populate / references
* Unit testing
* Integration testing
* Supertest
* Jest

### Features

* User registration
* User authentication
* Blog creation
* Blog retrieval
* Blog deletion
* Blog updating
* User-blog relationships
* Protected API endpoints
* Authorization checks
* Automated backend tests

### Key Learning

Learned how authentication and authorization fit into a real backend application and how to verify backend functionality through automated tests.

---

# Part 5 — Testing React Apps

Connected the React frontend to the backend and focused on testing complete application behavior.

## Main Project

### Blog List Application

Built a frontend for the Blog List backend.

### Topics

* React
* Axios
* React component architecture
* State management
* Authentication
* JWT
* Protected functionality
* Component testing
* Integration testing
* Cypress
* End-to-end testing

### Features

* User login
* User logout
* Blog listing
* Creating blogs
* Liking blogs
* Deleting blogs
* User-specific functionality
* Authentication-aware UI
* Backend API integration

### Testing

Implemented tests for important application behavior, including:

* Component rendering
* User interactions
* Login functionality
* Blog creation
* Blog liking
* Blog deletion
* End-to-end user flows

### Key Learning

Learned how to test applications from both the component level and the perspective of an actual user interacting with the application.

---

# Part 6 — Advanced State Management

Focused on managing application state with Redux and building more structured React applications.

### Topics

* Redux
* Redux Toolkit
* Store architecture
* Reducers
* Actions
* Dispatch
* Selectors
* React-Redux
* Asynchronous actions
* Application state architecture

### Key Learning

Learned when and how centralized state management can be used to manage complex application state and coordinate data between components.

---

# Part 7 — React Router, Custom Hooks and More

Focused on improving React application architecture and creating reusable functionality.

### Topics

* React Router
* Client-side routing
* Navigation
* Route parameters
* Nested routes
* Custom Hooks
* Reusable logic
* Application architecture
* Web application configuration

### Key Learning

Learned how to structure larger React applications by separating routing, reusable logic, components, and application state.

---

# 🛠️ Technology Stack

| Category           | Technologies             |
| ------------------ | ------------------------ |
| Language           | JavaScript               |
| Frontend           | React                    |
| Backend            | Node.js, Express         |
| Database           | MongoDB                  |
| ODM                | Mongoose                 |
| State Management   | Redux / Redux Toolkit    |
| HTTP Client        | Axios                    |
| Authentication     | JWT                      |
| Testing            | Jest, Supertest, Cypress |
| Routing            | React Router             |
| Version Control    | Git, GitHub              |
| Package Management | npm                      |

---

# 📈 Development Progression

The projects in this repository represent a progression through the different layers of full-stack development:

```text
JavaScript
   ↓
React Fundamentals
   ↓
React + REST APIs
   ↓
Node.js + Express
   ↓
MongoDB + Mongoose
   ↓
Authentication + Authorization
   ↓
Backend Testing
   ↓
Frontend Testing
   ↓
Redux / State Management
   ↓
Routing + Custom Hooks
   ↓
Full-Stack Application Architecture
```

---

# 🎯 What This Repository Demonstrates

This repository demonstrates practical experience with:

### Frontend Development

* Building reusable React components
* Managing component and application state
* Handling forms and user interactions
* Consuming REST APIs
* Client-side routing
* Creating reusable hooks
* Building authentication-aware interfaces

### Backend Development

* Designing REST APIs
* Building Express servers
* Implementing CRUD operations
* Working with MongoDB
* Modeling data with Mongoose
* Implementing authentication and authorization
* Structuring backend applications

### Testing

* Unit testing
* Integration testing
* API testing
* Component testing
* End-to-end testing

### Engineering Practices

* Git-based development
* Modular application architecture
* Separation of concerns
* Environment configuration
* API-driven development
* Debugging and error handling

---

# 📂 Repository Structure

The repository is organized according to the different parts of the Full Stack Open curriculum.

```text
fullstackopen/
│
├── part0/
│   └── fundamentals-of-web-apps/
│
├── part1/
│   ├── course-information/
│   ├── unicafe/
│   └── anecdotes/
│
├── part2/
│   ├── phonebook/
│   └── countries/
│
├── part3/
│   └── phonebook-backend/
│
├── part4/
│   └── bloglist-backend/
│
├── part5/
│   └── bloglist-frontend/
│
├── part6/
│   └── redux/
│
└── part7/
    ├── routing/
    ├── custom-hooks/
    └── advanced-react/
```

---

# 📌 About Full Stack Open

Full Stack Open is a University of Helsinki course focused on modern JavaScript-based web development.

The course emphasizes learning by building applications and covers the technologies and practices used in contemporary full-stack web development.

More information about the course:

**https://fullstackopen.com/en/**

---

## 👨‍💻 About

This repository is part of my ongoing full-stack development journey.

Rather than only studying individual technologies in isolation, I used the course projects to practice building applications across the complete development stack — from React interfaces and API communication to backend services, databases, authentication, testing, and application architecture.
