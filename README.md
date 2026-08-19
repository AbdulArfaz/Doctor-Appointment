
# Doctor Appointment Booking System (DABS) 

A comprehensive full-stack multi-role web application designed to streamline administration, user interactions, and backend services.

## Features

- Admin & Doctor Panel: Manage appointments, doctors, and system settings securely.
- Frontend Client: User-friendly interface for clients and patients.
- Backend API: Robust Node.js server handling authentication, databases, and file management.

## Tech Stack & Libraries

- Frontend & Admin Panels:
  - React, Vite, React Router

- Backend & Security: 
  - Node.js, Express
  - JWT (JSON Web Tokens): Secure dual-token architecture using Access Tokens  and Refresh Tokens.
  - Bcrypt: For secure password hashing.
  - Multer: For handling multipart/form-data and file/image uploads.
  - Cloudinary: For cloud-based image storage and management.

- Database:
  - MongoDB & Mongoose

## Project Structure

```text
DABS/
├── Admin/         # Admin and Doctor dashboard application
├── backend/       # Node.js server and API
└── frontend/      # Client-facing web application