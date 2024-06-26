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

### Home

![home](https://github.com/AriathGonzalez/paw-tinder/assets/84883360/34059c5a-6a03-406d-b708-df0c643f1e75)

![home2](https://github.com/AriathGonzalez/paw-tinder/assets/84883360/0e3ac1bf-3c17-4dcb-a768-e1b807396939)

![home3](https://github.com/AriathGonzalez/paw-tinder/assets/84883360/2f6c3130-8a7e-4cff-9045-200da0dbfba8)

### Onboarding

![onboarding](https://github.com/AriathGonzalez/paw-tinder/assets/84883360/134a5ef1-3c88-47d8-be20-f15a16ff2efa)

### Dashboard

![dashboard](https://github.com/AriathGonzalez/paw-tinder/assets/84883360/4a28bd62-89a1-4a6b-9426-3079e6fbcf2e)

![dashboard2](https://github.com/AriathGonzalez/paw-tinder/assets/84883360/55a7764f-5232-4cf2-8c28-1d0cacbe75e7)

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

- **GET** `/messages/`: Get all messages for a match
- **POST** `/messages/message`: Send a new message

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
