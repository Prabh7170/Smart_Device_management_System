Smart Device Management System

A backend application built with Node.js, Express, and MongoDB that provides authentication and device management APIs.
Users can sign up, log in, and manage smart devices (like lights, fans, etc.) through secure APIs.

Features:-

User Authentication (Signup, Login with JWT)
Device Management (Add, Update, Delete, Get devices)
Role-based access (User-specific devices)
Secure API routes with JWT middleware
MongoDB integration for persistent storage# Smart_Device_management_System

Project Structure:-

AuthApp/
│── config/
│   └── database.js       # MongoDB connection
│── models/
│   ├── User.js           # User schema
│   └── Device.js         # Device schema
│── routes/
│   ├── user.js           # Auth routes
│   └── device.js         # Device routes
│── middleware/
│   └── auth.js           # JWT authentication middleware
│── server.js             # Entry point
│── .env                  # Environment variables
│── package.json
│── README.md


Setup Instructions:-
1.Clone the repo:
git clone https://github.com/Prabh7170/Smart_Device_management_System.git
cd Smart_Device_management_System

2.Install dependencies:
npm install

3.Create a .env file in the root:
PORT=4000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key

4.tart the server:
npm start

5.Test APIs in Postman


Some images attached below showing the working of code tested on postman:-

![image_alt](https://github.com/Prabh7170/Smart_Device_management_System/blob/158e6026949edd83f604620fd5f2c0442db566f2/Screenshot%20(163).png)

![image_alt](https://github.com/Prabh7170/Smart_Device_management_System/blob/9d659f9a7a82b06d52ec8682404efc655fd238e9/Screenshot%20(164).png)

![image_alt](https://github.com/Prabh7170/Smart_Device_management_System/blob/7c4b2fc7b08402f71be0334f93bc6e8d605b1e95/Screenshot%20(165).png)



