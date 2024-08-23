# SarahaApp Backend

Welcome to the **SarahaApp Backend**, a server-side application built with Node.js and Express.js. This application allows users to send and receive anonymous messages. It includes features such as user authentication, messaging, and user profile management.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Set Up Environment Variables](#set-up-environment-variables)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Messaging](#messaging)
- [Contributing](#contributing)
- [Licensing](#licensing)
- [Contact](#contact)

## Project Overview

The SarahaApp Backend provides core functionalities needed for a messaging platform where users can send and receive anonymous messages. It leverages modern technologies such as **Node.js**, **Express.js**, and **MongoDB** for a scalable and efficient backend solution.

## Features

- **User Authentication:** Secure user signup and signin using JWT.
- **Anonymous Messaging:** Send and receive anonymous messages.
- **User Profile Management:** Manage user profile details.
- **Email Notifications:** Use Nodemailer for sending notifications.

## Prerequisites

- **Node.js** (v18.12.0 or higher)
- **MongoDB** (Running on the default port)
- **npm** (for dependency management)

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/faroukm2002/Sara7aApp.git
cd Sara7aApp
npm install

```

## Set Up Environment Variables

Create a `.env` file in the root directory with the following content:

```plaintext
# Application Mode
MODE=development

# MongoDB Configuration
DB_CONNECTION=mongodb://127.0.0.1:27017/sarahapp

# Server Configuration
PORT=3000

# Security Configuration
SALTROUND_KEY=
JWT_KEY=your_jwt_key

# Email Configuration
nodeMailerEmail=your_email@example.com
nodeMailerPassword=your_email_password
```


## Running the Server

To start the server, run the following command:

```bash
npm start
```





### API Endpoints

**Authentication Endpoints:**

- **POST** `/signup`
  - **Description:** Register a new user.
  - **Request Body:**
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```
  - **Response:**
    - **200 OK:** User successfully registered.
    - **400 Bad Request:** Validation errors.
    - **500 Internal Server Error:** Server issues.

- **POST** `/signin`
  - **Description:** Login for existing users.
  - **Request Body:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - **Response:**
    - **200 OK:** User successfully logged in. Returns a JWT token.
    - **401 Unauthorized:** Invalid credentials.
    - **500 Internal Server Error:** Server issues.

**Messaging Endpoints:**

- **POST** `/message/send`
  - **Description:** Send an anonymous message.
  - **Request Body:**
    ```json
    {
      "recipientId": "string",
      "message": "string"
    }
    ```
  - **Response:**
    - **200 OK:** Message sent successfully.
    - **400 Bad Request:** Invalid request data.
    - **500 Internal Server Error:** Server issues.

- **GET** `/message/inbox`
  - **Description:** Retrieve all received messages for a user.
  - **Headers:**
    - **Authorization:** Bearer `<JWT>`
  - **Response:**
    - **200 OK:** Returns a list of received messages.
    - **401 Unauthorized:** Invalid or missing token.
    - **500 Internal Server Error:** Server issues.

### Summary of Possible Issues:

1. **Ensure Proper Formatting:** Check that all command blocks and code sections are properly formatted in your documentation.
2. **Environment Configuration:** Make sure the `.env` file is correctly set up and accessible, and that `npm start` correctly points to the entry script in your `package.json`.
3. **Authorization Header:** Confirm that the `Authorization` header in the `/message/inbox` endpoint is correctly processed by your backend logic.




## Contributing

Contributions are welcome! Please fork the repository and open a pull request with your features or fixes.

## Licensing

This project is licensed under the ISC License. See the LICENSE file for details.

## Contact

For any questions or feedback, feel free to reach out:

- **Email:** [faroukm238@gmail.com](mailto:faroukm238@gmail.com)
- **LinkedIn:** [Farouk Mohamed](https://www.linkedin.com/in/farouk-mohamed-87315b298/)
