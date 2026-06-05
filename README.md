🚀 Node.js Learning Project Update

Completed and practiced core backend development concepts using Node.js, Express.js, MongoDB, and EJS.

✅ Features & Concepts Covered:

- CRUD Operations with MongoDB
- Express Routing System
- Request & Response Methods
- Form Handling using POST & GET
- Dynamic Rendering with EJS
- MVC Architecture Basics
- Layout & Partial Structure
- About Page Demo
- Form Demo & Submission Handling
- Middleware Basics
- Data Passing from Backend to Frontend
- Organized Views Folder Structure

📚 This project is part of my backend learning journey focused on building clean and scalable Node.js applications.

// ============================================================================
// CONTACT MANAGEMENT SYSTEM
// ============================================================================
//
// Project Features:
// ✔ Create Contact
// ✔ Read Contact
// ✔ Update Contact
// ✔ Delete Contact
// ✔ MongoDB Integration
// ✔ Mongoose Validation
// ✔ MVC Architecture
// ✔ Custom 404 Error Page
// ✔ Custom 500 Error Page
// ✔ Invalid MongoDB ID Handling
// ✔ Contact Not Found Handling
// ✔ Reusable Error Helpers
// ✔ Reusable Contact Validation Helper
//
// Author : Jaydev Solanki
// Technology : Node.js, Express.js, MongoDB, Mongoose, EJS, Bootstrap
//
// ============================================================================

<!-- check my code update or not -->

# Contact Management System

## Features

- Create Contact
- Show Contact
- Update Contact
- Delete Contact
- Custom 404 Error Page
- Custom 500 Error Page
- Invalid Contact ID Handling
- Contact Not Found Handling
- MVC Folder Structure
- MongoDB Database Integration

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS
- Bootstrap 5

## Error Handling

### 1. Invalid Contact ID

Example:

/show_contact/abc

Result:

Invalid Contact ID

### 2. Contact Not Found

Example:

/show_contact/685123456789123456789012

Result:

Contact Not Found

### 3. Internal Server Error

Example:

Database Connection Error

Result:

500 Error Page

## Pagination Feature

This project implements server-side pagination using `mongoose-paginate-v2`.

### Why Pagination?

Pagination improves performance and user experience by loading only a limited number of records at a time instead of fetching the entire dataset.

### Features

- Dynamic page navigation
- Previous and Next buttons
- Active page highlighting
- Configurable records per page
- Server-side data fetching
- Optimized MongoDB queries

### How It Works

1. The user clicks a page number.
2. The page number is sent through query parameters.

```url
/?page=2&limit=5
```

3. The controller receives the page and limit values.

```js
const { page = 1, limit = 5 } = req.query;
```

4. Mongoose Paginate fetches only the required records.

```js
const result = await Contact.paginate(
  {},
  {
    page: parseInt(page),
    limit: parseInt(limit),
  },
);
```

5. Pagination data is passed to the EJS view.

```js
totalPages;
page;
hasPrevPage;
hasNextPage;
prevPage;
nextPage;
```

6. EJS dynamically generates page buttons and highlights the current page.

### Benefits

- Faster page loading
- Reduced database load
- Better scalability
- Improved user experience
- Cleaner data presentation

### Technology Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- mongoose-paginate-v2
- EJS
- Bootstrap

## Middleware Module Completed ✅

- Logger Middleware
- Authentication Middleware
- Application-Level Middleware
- Error Handling Middleware
- Third-Party Middleware

Learned middleware flow, route protection, request tracking, centralized error handling, and production-ready middleware packages such as Morgan, CORS, and Helmet.

## Author

Jaydev Solanki
