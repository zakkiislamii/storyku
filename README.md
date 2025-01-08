## Project Name

Storyku

---

## Table of Contents

- [Client](#Client)
- [Server](#Server)
- [Link Deploy Project](#Link_Deploy_Project)

---

### Client

---

1.  Table of Contents

    - Feature
    - Library
    - Project Structure

2.  Feature

    - Story List
    - Add Story and Chapter
    - Story Detail and Chapter
    - Edit Story and Chapter
    - Delete Story and Chapter

3.  Library

    - React - Library JavaScript untuk UI
    - Vite - Build tool yang cepat
    - React Router - Navigasi halaman
    - React Quill - Rich text editor
    - TailwindCSS - Framework CSS
    - Axios - HTTP client

4.  Folder Structure

         src/
         ├── assets/         # File gambar, font, dll
         ├── components/     # Komponen React yang bisa dipakai ulang
         ├── hooks/          # Custom React hooks
         ├── layout/         # Komponen layout utama
         ├── pages/          # Halaman-halaman aplikasi
         ├── services/       # Logika bisnis dan API calls
         ├── App.css         # Styling untuk App
         ├── App.jsx         # Komponen utama
         ├── index.css       # Styling global
         └── main.jsx        # Entry point aplikasi

---

### Server

---

1.  Table of Contents

    - Feature
    - Library
    - Project Structure

2.  Feature

    - Story List
    - Add Story and Chapter
    - Story Detail and Chapter
    - Edit Story and Chapter
    - Delete Story and Chapter

3.  Library

    a. Main Dependencies:

    - Express.js - Web framework
    - Prisma - ORM dan database toolkit
    - CORS - Cross-Origin Resource Sharing
    - Firebase - Backend services dan storage
    - Joi - Schema validation
    - Multer - File upload handling

    b. Development Dependencies:

    - Jest - Testing framework
    - ESLint - Code linting
    - Babel - JavaScript compiler
    - Nodemon - Development server dengan hot reload

4.  Folder Structure

         src/
         ├── prisma/          # Setup database
         ├── src/
         │   ├── controllers/ # Pengatur logika aplikasi
         │   ├── firebase/    # Setup Firebase
         │   ├── middlewares/ # Fungsi perantara Express
         │   ├── repositories/# Akses ke database
         │   ├── routers/     # Pengaturan rute API
         │   ├── tests/       # File testing
         │   ├── utils/       # Fungsi-fungsi pembantu
         │   ├── validators/  # Validasi request
         │   └── app.js       # File utama aplikasi

---

### LinkDeployProject

https://storyku-client.vercel.app