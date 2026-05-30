# Tasksy - Real-Time Chat Application

## Description
Tasksy is a modern real-time chat application designed to provide seamless communication between users through private and group conversations. The platform enables instant messaging, user authentication, real-time updates, and a responsive user experience. It is built using modern web technologies to ensure scalability, security, and performance.

## Features

- User Registration and Login
- JWT-Based Authentication & Authorization
- One-to-One Chat
- Group Chat Management
- Real-Time Messaging using Socket.IO
- Online/Offline User Status
- Typing Indicators
- Message Notifications
- User Profile Management
- Responsive UI for Desktop and Mobile Devices
- Secure API Integration
- Scalable Architecture

## Tech Stack

### Frontend
- React.js
- TypeScript
- Bootstrap
- Redux Toolkit
- Axios

### Backend
- Node.js
- Express.js
- Javascript

### Database
- MongoDB
- Mongoose

### Real-Time Communication
- Socket.IO

### Authentication
- JWT (JSON Web Token)
- bcrypt

### Version Control
- Git
- GitHub

## System Architecture

Frontend (React.js)
        |
        |
        v
Backend (Node.js + Express.js)
        |
        |
        v
MongoDB Database

Socket.IO is used to establish real-time communication between connected users.

## Installation
### Clone Repository

```bash
git clone https://github.com/javedakhtar21/Chat-App.git
```

### Navigate to Project

```bash
Frontend: cd ChatFrontend
Backend: cd ChatBackend
```

### Install Frontend Dependencies

```bash
cd ChatFrontend
npm install
```

### Install Backend Dependencies

```bash
cd ChatBackend 
npm install
```

---
## Environment Variables

Create a `.env` file inside the ChatBackend directory and add the following variables:

```env
MAIN_PORT=3000
ENV=development
MONGO_URI=mongodb://localhost:27017/talksy
JWT_SECRET=your-secret
GMAIL= Your gmail which will be used to send email
GMAIL_PASS= Your gmail app password
JWT_FORGET_PASSWORD_SECRET= secret-for-jwt-forgery-passwords
API_BASE_URL= Your Backend/API URL
Frontend_URL= Your frontend URL
```

Create a `.env` file inside the ChatFrontend directory and add the following variables:

```env
VITE_API_URL='http://localhost:3000/api/v1'
VITE_API_SOCKET_URL='http://localhost:3000'
---
```

## Running the Application

### Start Backend Server

```bash
cd ChatBackend
npm run dev
```

### Start Frontend Application

```bash
cd ChatFrontend
npm run dev
```

The application will be available at:

```text
Frontend: Your frontend URL

Backend: Your backend URL
```

---

## Folder Structure as example, This could be different.

```text
chat-app/
│
├── ChatFrontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── redux/
│   │   └── utils/
│   │
│   └── package.json
│
├── ChatBackend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── socket/
│   ├── config/
│   └── package.json
│
├── README.md
└── .gitignore
```

---

## Screenshots

### Login Page
<img width="1886" height="875" alt="image" src="https://github.com/user-attachments/assets/4282ba81-0b55-443d-b8f2-47262fea93fc" />


### Chat Dashboard
<img width="1905" height="914" alt="image" src="https://github.com/user-attachments/assets/d078c1af-01bd-4d34-b36a-52292b32689d" />


### User Profile
<img width="1908" height="905" alt="image" src="https://github.com/user-attachments/assets/7f62c8f7-bf02-43d7-bbb2-75570e4e6de5" />


### Forget Password
<img width="1910" height="831" alt="image" src="https://github.com/user-attachments/assets/c8e08ef0-47ad-4e89-b53c-3ac0f518f093" />

### Reset Password
<img width="1905" height="904" alt="image" src="https://github.com/user-attachments/assets/76fdab1d-6752-4ccc-9ba6-e287f8675f48" />


---

## API Endpoints: Not real

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
```

### Users

```http
GET /api/users
GET /api/users/:id
```

### Chats

```http
GET /api/chats
POST /api/chats
```

### Messages

```http
GET /api/messages/:chatId
POST /api/messages
```

---

## Future Enhancements

- Voice Calling
- Video Calling
- File and Media Sharing
- Message Reactions
- Read Receipts
- End-to-End Encryption
- Push Notifications
- AI Chat Assistant
- Multi-Language Support

---

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push your branch.
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License.

---

## Author

### Javed Akhtar

MERN Stack Developer

LinkedIn:
https://www.linkedin.com/in/javedakhtar21

Email:
You cant access

GitHub:
https://github.com/javedakhtar21/
---

## Acknowledgements

Special thanks to the open-source community and contributors whose tools and libraries made this project possible.
