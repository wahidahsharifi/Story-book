# 📖 Story Books

A full-stack CRUD web app where users can write, manage, and share personal stories. Built while following a [guided tutorial](https://youtu.be/SBvmnHTQIPY?si=vDZOtaYRW36ikZxj) by [Traversy Media](https://www.traversymedia.com/) to deepen my understanding of **Node.js**, **Express**, **MongoDB**, and several new libraries.

## 🚀 What It Does

- **User Authentication**  
  Secure login using **Google OAuth 2.0** powered by **Passport.js**.

- **Create, Read, Update, Delete (CRUD) Stories**  
  Users can:
  - Write stories using **CKEditor** with rich text support.
  - Choose to publish stories **publicly** or keep them **private**.
  - Edit or delete their own stories.

- **Public Stories Feed**  
  A public page showing all public stories from every user.

- **User Dashboards**  
  Each user has a dashboard displaying their personal public and private stories.

- **Story Authors & User Pages**  
  Each story displays the author's name. Clicking it loads a page with all stories written by that user.

## 📚 What I Learned

This project wasn’t just about code — it was about structuring an app like a pro. Here’s what I leveled up on:

- **New Packages & Tools**
  - 📦 `express-handlebars` for templating.
  - 🔐 `passport.js` for authentication.
  - 📅 `moment.js` for date formatting.
  - 📝 `method-override` for using PUT and DELETE in forms.
  - ✨ `dotenv` for environment variables.

- **Google OAuth Authentication**  
  Mastered integrating **Google login** through **Passport.js** and securing app routes.

- **App Structure & Separation of Concerns**  
  Learned how to keep things clean and organized:
  - Routes in their own folders.
  - Config files separated.
  - Models structured.
  - Middlewares properly placed.

- **Working with CKEditor**  
  Implemented a WYSIWYG editor for better story writing experience.

- **Folder Structure Best Practices**  
  Connected the pieces while making sure things stay tidy and scalable.

## 🛠️ Technologies used
`Node.js` `Express` `MongoDB & Mongoose` `Passport.js` `Express-Handlebars` `CKEditor` `Moment.js` `Method-Override` `dotenv`

## 📸 Screenshots
![Login page screenshot](https://github.com/user-attachments/assets/82cfeb09-0671-4538-8cb8-8f4141b0fe4b)

![dashboard screenshot](https://github.com/user-attachments/assets/c4cfd1a6-4b8d-4a5e-acaa-aa0f8f4e9999)

![story edit page](https://github.com/user-attachments/assets/d0efa2d2-d34a-436f-89ef-2c097cb1b2ba)

![stories feed page](https://github.com/user-attachments/assets/68303780-2cc3-4164-be30-a0b644950b7c)


## 📌 Final Words

This was a solid learning experience — not just building features, but understanding how everything ties together in a full-stack app. From handling authentication to properly separating project files, this project sharpened my web development skills in a practical, hands-on way.
