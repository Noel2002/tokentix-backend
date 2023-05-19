# tokentix-backend
This application is a web-based ticket sales platform built using Node.js and Express. Its primary purpose is to provide a seamless ticket buying experience for customers, while also providing a range of management tools for event organizers and administrators.

## Features

The Ticket Sales Application includes the following features:

- User account management (signup, login, and verification)
- Email notifications (acccount verification)

## Getting Started

To get started with the Ticket Sales Application, you'll need to follow these steps:

1. Clone the repository to your local machine
2. Install the required dependencies using `npm install`
3. Set up a local development environment using `npm run dev`
4. Create a new user account by visiting `http://localhost:8000/signup`
5. Verify your account by entering the OTP sent to your email address
6. Log in to the application using your new account

Note that ticket purchases are handled by a separate server, which is responsible for processing payments.
## Dependencies

The Ticket Sales Application relies on the following dependencies:

- Node.js
- Express
- Nodemailer
- Bcrypt
- Dotenv
- json-web-token

## Configuration

To configure the application for your environment, you should create a `.env` file in the root directory of the project, and set the following environment variables:

- `DB_URL`: the URL of your database, in the format `mongodb://<user>:<password>@<host>:<port>/<database>`

- `GMAIL_EMAIL`: your email address (used for sending verification emails)
- `GMAIL_PASS`: your email password (used for sending verification emails)
- `JWT_SECRET`
- `PORT`
- `SALT_ROUNDS`
- `CLIENT_ID`
- `CLIENT_SECRET`
- `REFRESH_TOKEN`
