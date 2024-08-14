# MERN Stack Project

## Overview

LocalShare is a blogging website where users can create and share blogs about their personal experiences. This project, called LocalShare, allows users to document and share their stories with others. 
This is a MERN stack project that includes a full-stack application built with MongoDB, Express.js, React, and Node.js. It features user authentication, post creation, and bookmarking functionality.

## Features

- **User Authentication**: Register and log in to access perrsonalized features.
- **Post Creation**: Create, view, and manage posts.
- **Bookmarking**: Add, remove, and view bookmarked posts.
- **Commenting**: Leave comments on posts.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Password Hashing**: bcrypt

## Installation
1. Clone the repository
```bash
git clone https://github.com/yourusername/your-repo-name.git
cd LocalShare
```

2. Set Up the Frontend
```bash
cd fronted
npm install
npm run dev
```

3. Set Up the Backend
```
cd backend
```

Open the .env file, then paste the connection link of your mongoDB Database into MONGODB_URI

4. Run the backend
```bash
npm start
```

## Usage

### Register or Log In

Use the authentication endpoints to register or log in:

- **POST /register**: Register a new user
- **POST /login**: Log in an existing user

### Manage Posts

Create, view, and manage posts:

- **POST /posts**: Create a new post
- **GET /posts**: Retrieve all posts

### Bookmark Posts

Save posts for later reference:

- **POST /bookmarks**: Add a bookmark
- **DELETE /bookmarks/:id**: Remove a bookmark

### Comment on Posts

Leave comments on posts:

- **POST /comments**: Add a comment to a post
- **GET /comments/:postid**: Retrieve comments for a post

## API Endpoints

### Authentication

- **POST /register** - Register a new user
- **POST /login** - Log in an existing user

### Posts

- **POST /posts** - Create a new post
- **GET /posts** - Get all posts

### Bookmarks

- **POST /bookmarks** - Add a bookmark
- **DELETE /bookmarks/:id** - Remove a bookmark

### Comments

- **POST /comments** - Add a comment
- **GET /comments/:postid** - Get comments for a post

## Contributing

Feel free to open issues or submit pull requests if you encounter any bugs or have suggestions for improvements. Contributions are welcome!
