# Send a Mail

**Send a Mail** is a project that allowed me to deepen my knowledge in web app development, applying best practices and improving my technical skills. This project was created to allow users to send and receive a password reset email, including features such as registration, login and logout.

## Technologies used

The project was developed using the **MERN** stack, which includes:

- **MongoDB**: A NoSQL database to store users and their login information.
- **Express**: A web framework for Node.js, used to create the server and handle HTTP requests.
- **React**: A JavaScript library to build the frontend user interface.
- **Node.js**: A JavaScript runtime to execute the server-side code.
- **react-hot-toast**: A library to display notification messages in the frontend, used to show feedback on events such as registration, login and password reset.

## Features

- **Registration and Login**: Users can register, login and receive error or success messages via notifications.
- **Password Reset**: Users can reset their password, which will be updated in the database.
- **Real-time Notifications**: The project uses `react-hot-toast` to display success or error messages to the frontend during operations (registration, login, password reset).
- **Email Sending Prototype**: Even though the main focus was on user management, a logic was implemented to send a reset email.
