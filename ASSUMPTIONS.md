# Assumptions 

This document details all the assumptions made during the development of this todo list for this assignment. 

## ▷ Application Scope & Requirements
- This app was designed for a  **single user only**. 
- No authentication needed. 
- Only **one single device** is intended to run this app - no cross-device syncing. 
- If the database volume is deleted, all todo data will be lost. This is the intended behavior for this exercise. 

## ▷ Database and Infrastructure
- The server will automatically create the `todos` table if it does not already exist. Thus, no manual SQL setup is needed. 
- It is assumed that both **Docker and Docker Compose** are installed on the machine running this app. 
- No other external managed database is used. Only the local Postgres container via Docker Compose.

## ▷ Features and Functionality
- Basic **CRUD (Create, Read, Update, Delete)** functionalities are implemented for todo items.
- No advanced user roles, permissions, or privilege levels are included.
- For this exercise, no advanced input validation or sanitization was implemented beyond basic server-side handling.

## ▷ Frontend
- A simple frontend stack was used with **HTML, CSS3, jQuery, Bootstrap**, and **Font Awesome** for styling and interactivity. 
- No frontend frameworks (e.g., React or Angular) were used since they were not required for this exercise. 

## ▷ Security & Production Considerations 
- This app was intended to demonstrate the todo list functionality Docker deployment. It is **not intended for production use**. 


# Conclusion: 

This document ensures that the application aligns with the requirements described in the assignment prompt. The focus was on **simplicity, ease of testing on Docker, and following clean development best practices**.