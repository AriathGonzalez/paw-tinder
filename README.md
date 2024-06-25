# Paw Tinder

![Node.js CI](https://github.com/AriathGonzalez/paw-tinder/actions/workflows/node.js.yml/badge.svg)

A Tinder clone built using the MERN stack (MongoDB, Express, React, Node.js). This app mimics the core functionalities of Tinder, including swiping left/right and matching with other users.

## Table of Contents

- [Pages](#pages)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Pages

- Todo Add Pages

### Home

### Onboarding

### Dashboard

## Features

- User authentication (signup/login)
- Swipe left to pass, swipe right to like
- Real-time notifications for matches
- Chat functionality between matched users
- User profile setup and editing
- Responsive design

## Technologies Used

- **MongoDB**: Database to store user information and matches
- **Express**: Backend framework for building the API
- **React**: Frontend library for building the user interface
- **Node.js**: Server-side JavaScript runtime
- **Redux**: State management for React
- **JWT**: JSON Web Tokens for authentication

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/AriathGonzalez/paw-tinder
   ```
2. Navigate to the project directory:
   ```sh
   cd paw-tinder
   ```
3. Install server dependencies:
   ```sh
   cd server
   npm install
   ```
4. Install client dependencies:
   ```sh
   cd ../client
   npm install
   ```

## Usage

1. Start the server:
   ```sh
   cd server
   npm run start
   ```
2. Start the client:
   ```sh
   cd ../client
   npm run start
   ```
3. Open your browser and go to `http://localhost:3000` to see the app in action.

## API Endpoints

### Authentication

- **POST** `/users/signup`: Register a new user
- **POST** `/users/login`: Login a user

### User

- **GET** `/users/user`: Get user profile
- **GET** `/users/gendered_users`: Get users filtered by gender
- **GET** `/users/matched_users`: Get users that are matched

- **PUT** `/users/`: Update user profile
- **PUT** `/users/add_match`: Add a match to user profile

### Messages

- **GET** `/messages/matchId`: Get all messages for a match
- **POST** `/messages`: Send a new message

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
