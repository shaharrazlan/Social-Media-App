# **🌟 FooBar Social App**

Welcome to **FooBar Social**, a **full-stack social media platform** designed for seamless interaction and connectivity. Built with cutting-edge technologies and a modular architecture, this app empowers users to share, connect, and engage effortlessly.

---

## **✨ Features**
### 🧑‍🤝‍🧑 Social Media Essentials:
- **🔐 Authentication**: Secure user registration and login with JWT.
- **📝 Post Management**: Create, edit, delete, and interact with posts (likes and comments).
- **👤 Profile Management**: Customize profiles, including profile pictures and display names.
- **🤝 Friendships**: Send, accept, and decline friend requests with real-time updates.

### 💻 Interactive User Experience:
- **📃 Dynamic Feeds**: View personalized posts from friends.
- **📲 Responsive Design**: Optimized for all devices.
- **🎨 Vibrant UI**: Modern design with intuitive navigation.

---

## **🛠️ Technologies and Skills**
### **Frontend:**
- **Languages:** ![JS](https://img.shields.io/badge/-JavaScript-yellow) ![HTML](https://img.shields.io/badge/-HTML-orange) ![CSS](https://img.shields.io/badge/-CSS-blue)
- **Frameworks:** React, React Router, Context API
- **Styling:** CSS Modules
- **HTTP Requests:** Axios

### **Backend:**
- **Languages:** ![Node.js](https://img.shields.io/badge/-Node.js-green)
- **Frameworks:** Express.js
- **Database:** MongoDB (Mongoose)
- **Security:** JWT, bcrypt
- **API Standards:** RESTful APIs

---

## **📂 Architecture**
The project follows the **Model-View-Controller (MVC)** pattern:
1. **Model 🗂️**: MongoDB schemas for users, posts, and friendships.
2. **View 🎨**: React-based frontend with dynamic UI and reusable components.
3. **Controller 🎛️**: Logic for handling requests and responses between the model and view.

---

## **🌐 Server Side (Backend)**
**🔧 Key Features**:
- **Authentication**:
  - `POST /api/auth/register`: Register a new user.
  - `POST /api/auth/login`: Login and receive a JWT token.
- **Post Management**:
  - `POST /api/posts`: Create a new post.
  - `GET /api/posts/getposts`: Fetch posts dynamically.
- **Friendship Management**:
  - `POST /api/friends/friend-request`: Send friend requests.
  - `PUT /api/friends/accept-request/:id`: Accept requests.

**Tech Stack**:
- Node.js + Express for the application logic.
- MongoDB for flexible data storage.

---

## **💻 Client Side (Frontend)**
**✨ Features**:
- **Home Page 🏠**: Interactive feed with stories and posts.
- **Profile Page 👤**: User details, posts, and friend management.
- **Authentication Pages 🔐**: Login and Register forms with validation.

**Frontend Tech**:
- React for dynamic UI.
- Context API for state management.
- CSS Modules for consistent styling.

---

## **🚀 Installation**
### **Requirements:**
- Node.js
- MongoDB

### **Steps:**
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/social-app.git
   cd social-app
   ```

2. **Set Up Backend**:
   ```bash
   cd server
   npm install
   ```
   - Create a `.env` file:
     ```plaintext
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```
   - Start the server:
     ```bash
     npm start
     ```

3. **Set Up Frontend**:
   ```bash
   cd ../client
   npm install
   ```
   - Create a `.env` file:
     ```plaintext
     REACT_APP_BACKEND_URL=http://localhost:5000/api
     ```
   - Start the frontend:
     ```bash
     npm start
     ```

---

## **🗂️ Project Structure**
```
social-app/
├── client/              # React frontend
│   ├── components/      # Reusable UI components
│   ├── context/         # Context API state management
│   ├── pages/           # App pages (Login, Home, Profile)
├── server/              # Express backend
│   ├── controllers/     # API business logic
│   ├── models/          # Database schemas
│   ├── routes/          # API endpoints
```

---

## **📈 Future Enhancements**
- **Real-time Notifications 🛎️**: Using WebSocket or Socket.IO.
- **Dark Mode 🌙**: Add a toggle for light and dark themes.
- **Mobile App 📱**: Extend the functionality to React Native.

---

## **🎨 UI Preview**
### **Home Feed**
![Home Feed](link-to-your-image)
### **Profile Page**
![Profile Page](link-to-your-image)

