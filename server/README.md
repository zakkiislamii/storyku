# Backend

## Project Name

Storyku

---

## Table of Contents

- [Feature](#feature)
- [Library](#library)
- [Project Structure](#project-structure)
- [Cara Menggunakan](#cara-menggunakan)

---

### Feature

- Story List
- Add Story
- Story Detail
- Edit Story
- Delete Story

---

### Library

1. Main Dependencies:
   - Express.js - Web framework
   - Prisma - ORM dan database toolkit
   - CORS - Cross-Origin Resource Sharing
   - Firebase - Backend services dan storage
   - Joi - Schema validation
   - Multer - File upload handling

2. Development Dependencies:
   - Jest - Testing framework
   - ESLint - Code linting
   - Babel - JavaScript compiler
   - Nodemon - Development server dengan hot reload

---

### Project Structure

```
- config
- controllers
- middleware
- models
- routes
```

---

### Cara Menggunakan

1. Clone repository ini:
   ```bash
   git clone https://gitlab.com/storyku/back-end-storyku
   ```
2. Masuk ke folder proyek:
   ```bash
   cd back-end-storyku
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Buat database di mysql atau lainnya dan jalankan query yang berada di database.sh.
5. Samakan config .env dengan databasemu.
6. Jalankan server:
   ```bash
   node app.js
   ```
