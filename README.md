# A1FinalSF

# Project Documentation

## 1. Git Repository Organization and Usage

### Repository Structure:
- **`src/`**: Contains the Angular frontend source code.
- **`server/`**: Contains the Node.js server files.
- **`e2e/`**: Contains end-to-end tests for the Angular application.
- **`dist/`**: The output directory generated after building the project.

### Git Workflow:
- We followed a **feature branch workflow**, where each team member worked on separate branches for different features (e.g., `feature/login`, `feature/chat`).
- Regular **pull requests** were created to merge features into the `main` branch after review.
- Meaningful **commit messages** were used to keep the history clean.

## 2. Data Structures on Client and Server

### Client-Side (Angular):
- **Entities represented as models**:
  - **Users**: Managed within `login.component.ts` and stored in local storage after login.
  - **Groups and Channels**: Interactions managed through services such as `group.service.ts`.

### Server-Side (Node.js):
- **Entities in server.js**:
  - **Users** and **Channels**: Managed in the `server.js` file, tracking users in channels through Socket.io.
  - **Uploads**: Handled by the routes `/upload/chat` and `/upload/profile` using Multer for file storage.

## 3. Client-Server Responsibilities

### Client-Side Responsibilities:
- **Services** (`chat.component.ts`, `imageUpload.service.ts`) handle:
  - Fetching and sending chat messages and images to the server.
  - Managing video calls with PeerJS.
  
### Server-Side Responsibilities:
- **Socket.io** for real-time chat messaging (`server.js`).
- **REST API** to handle file uploads (`server.js`):
  - `POST /upload/profile` for profile image upload.
  - `POST /upload/chat` for chat image uploads.
- **PeerJS Server** (`peerServer.js`) to manage video calls.

## 4. List of Routes, Parameters, Return Values, and Purpose

### Client-Side (Angular Routes):
- **`/login`**: User login.
- **`/chat`**: Access chat interface after login.
- **`/profile`**: Manage user profiles, including image uploads.

### Server-Side (Node.js API Routes):
- **`POST /upload/profile`**: Upload a profile image.
  - **Params**: `avatar` (file), `username` (string).
  - **Response**: `{ message: 'Profile image uploaded successfully', filePath }`.
- **`POST /upload/chat`**: Upload a chat image.
  - **Params**: `chatImage` (file), `message` (string), `username` (string).
  - **Response**: `{ message: 'Chat image uploaded successfully', filePath }`.

## 5. Angular Architecture: Components, Services, Models, Routes

### Components:
- **`login.component.ts`**: Handles user authentication and redirection based on user roles.
- **`chat.component.ts`**: Displays chat messages, sends messages, and supports image and video chat.
- **`user-management.component.ts`**: Manages users (create, delete) in the system.
- **`user-profile.component.ts`**: Allows users to update their profile images.

### Services:
- **`auth.service.ts`**: Manages authentication and session handling.
- **`group.service.ts`**: Manages group-related API requests.
- **`imageUpload.service.ts`**: Handles image uploads for profile and chat.

### Routes:
- **`app-route.ts`**: Defines navigation paths for the application, such as `/login`, `/chat`, `/profile`.

## 6. Client-Server Interaction

### Client-Side (Angular):
- **`chat.component.ts`**: 
  - Sends messages via Socket.io to the server.
  - Handles video calls using PeerJS.
  - Uploads images via the `imageUpload.service.ts` to the server.
  
### Server-Side (Node.js):
- **`server.js`**:
  - Manages real-time chat using Socket.io and processes incoming messages and user join/leave notifications.
  - Processes file uploads via REST API endpoints.
- **`peerServer.js`**:
  - Handles WebRTC video calls using PeerJS.

---

### Conclusion:
This documentation provides an overview of the structure, data flow, and client-server responsibilities in this project. Each component and service is responsible for specific tasks, and the interaction between the Angular frontend and Node.js backend is facilitated through REST APIs and real-time communication via Socket.io and PeerJS.
