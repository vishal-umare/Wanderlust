# 🌍 Wanderlust

Wanderlust is a full-stack web application for discovering and managing property listings with image uploads, authentication, and location-based mapping.

---

## 🚀 Features

* 🏠 Create, edit, and delete listings
* 📸 Image upload and storage (Cloudinary)
* 🗺️ Interactive maps for listing locations (Mapbox)
* 🔐 User authentication (Passport.js)
* ✅ Data validation (Joi)
* 💬 Flash messages for user feedback
* 📱 Responsive UI

---

## 🛠️ Tech Stack

* **Languages:** HTML, CSS, JavaScript
* **Technologies:** Node.js, Express.js, EJS, MongoDB, Mongoose
* **Tools & Services:** Cloudinary, Mapbox, Passport.js, Joi, Connect-Flash

---

## 📈 Development Progress

This project was originally developed as part of my **Backend Learnings** repository with consistent commits and iterative improvements.

👉 To explore the full development journey and commit history:
Check the `wanderlust` folder inside the **backend-learnings** repository.

---
## 📸 Preview

![Wanderlust Preview](./assests/Screenshot%202026-04-13%20181045.png)

## 📁 Project Structure

```
wanderlust/
├── models/
├── routes/
├── controllers/
├── middleware/
├── views/
├── public/
├── utils/
├── cloudConfig.js
├── app.js
└── package.json
```

---

## ⚙️ Setup

```bash
git clone https://github.com/your-username/wanderlust.git
cd wanderlust
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
MAPBOX_TOKEN=your_mapbox_access_token
```

Run the app:

```bash
npm start
```

---

## 👨‍💻 Author

**Vishal Umare**

---

⭐ Star the repo if you like it!
