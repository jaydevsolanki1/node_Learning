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

## ✅ Validation Module Added

### Overview

This module demonstrates how to validate user input in a Node.js and Express.js application before processing data.

### Features Implemented

- Name Validation
- Email Validation
- Password Validation
- Mobile Number Validation
- Age Validation
- Gender Validation
- Required Field Checking
- Custom Validation Logic

### Packages Covered

#### validator

A standalone npm package used for validating:

- Email Addresses
- Mobile Numbers
- URLs
- Password Rules
- Empty Fields
- String Data

#### express-validator

An Express middleware package that provides validation chains and request validation directly inside routes.

### Learning Outcomes

- Form Validation
- Request Body Validation
- Error Handling
- Input Sanitization
- Middleware-Based Validation
- Server-Side Data Verification

### Technologies Used

- Node.js
- Express.js
- EJS
- Bootstrap
- Validator

### Status

✅ Completed Successfully

# 📚 Topic: File Upload (Multer)

## What I Learned

- Learned Multer middleware setup
- Implemented single file upload
- Implemented multiple file upload
- Implemented image upload validation
- Implemented document upload validation
- Learned file size restrictions
- Learned req.file and req.files
- Learned upload.single(), upload.array(), and upload.fields()
- Practiced storing uploaded file paths in MongoDB
- Understood multipart/form-data handling

## Key Concepts

- Multer
- diskStorage()
- fileFilter()
- upload.single()
- upload.array()
- upload.fields()
- req.file
- req.files
- File Validation
- File Size Limits

## Real Project Use Cases

- User Profile Image Upload
- Resume Upload
- Contact Form Attachments
- Gallery Management
- Blog Featured Images
- Admin Dashboard File Management

## Git Commit

git commit -m "Learned Multer file uploads with validation and multiple file handling"

## Status

✅ Topic Completed

# 📚 Topic: Validator Package

## What I Learned

- Learned input validation
- Learned data sanitization
- Implemented email validation
- Implemented password validation
- Implemented form validation
- Improved application security

## Key Concepts

- validator.isEmail()
- validator.isStrongPassword()
- validator.escape()
- validator.trim()

## Real Project Use Cases

- Registration Forms
- Login Forms
- Contact Forms
- User Profile Updates
- Authentication Systems

## Git Commit

git commit -m "Learned validator package and input validation techniques"

## Status

✅ Topic Completed

# 📚 Topic: File Upload (Multer)

## What I Learned

- Learned Multer middleware setup
- Implemented single file upload
- Implemented multiple file upload
- Implemented image upload validation
- Implemented document upload validation
- Learned file size restrictions
- Learned req.file and req.files
- Learned upload.single(), upload.array(), and upload.fields()
- Practiced storing uploaded file paths in MongoDB
- Understood multipart/form-data handling

## Key Concepts

- Multer
- diskStorage()
- fileFilter()
- upload.single()
- upload.array()
- upload.fields()
- req.file
- req.files
- File Validation
- File Size Limits

## Real Project Use Cases

- User Profile Image Upload
- Resume Upload
- Contact Form Attachments
- Gallery Management
- Blog Featured Images
- Admin Dashboard File Management

## Git Commit

git commit -m "Learned Multer file uploads with validation and multiple file handling"

## Status

✅ Topic Completed

## Author

Jaydev Solanki
