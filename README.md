# Project Documentation

## 1. Git Repository Organization and Usage

### Repository Structure:
- **`src/`**: This directory contains the Angular application source code, including components, services, and models.
  - **`app/`**: Contains the main Angular application, with subdirectories for components, services, and routing.
    - **`components/`**: Houses individual feature components such as `chat.component.ts`, `login.component.ts`, and `user-management.component.ts`.
    - **`services/`**: Contains Angular services like `auth.service.ts`, `group.service.ts`, and `imageUpload.service.ts`, which are responsible for handling business logic and API calls.
    - **`models/`**: Data structures used on the client side (if you create this for consistency).
  - **`assets/`**: Static files such as images, fonts, and other resources.
  - **`environments/`**: Environment configurations for development and production.

- **`server/`**: Contains Node.js backend server code that handles API routes, real-time communication with Socket.io, and PeerJS video calling logic.
  - **`server.js`**: Main server file that configures Express, handles routes for uploads, and manages Socket.io connections.
  - **`peerServer.js`**: Manages the PeerJS WebRTC server for video calls.
  - **`uploads/`**: Directory for storing uploaded images for profiles and chat.
  
- **`e2e/`**: End-to-end testing folder using Protractor or Cypress for testing the Angular frontend.

- **`dist/`**: Directory containing the compiled and built files after running `ng build`.

### Git Workflow:
- **Branching Strategy**: We adopted a **feature-branch workflow**:
  - Each new feature (e.g., `chat`, `auth`, `user-management`) was developed on its own branch (e.g., `feature/chat`).
  - Regular **pull requests** were made to merge completed features into the `main` branch after code reviews.
  - We used meaningful commit messages for easy tracking (e.g., `feat: add chat functionality`, `fix: resolve user authentication issue`).
- **Version Control**: The `.gitignore` file excludes unnecessary files like `node_modules/`, `dist/`, and sensitive environment files.

---

## 2. Data Structures on Client and Server

### Client-Side (Angular):
- **User Data Structure**:
  - The user is represented as an object with properties such as `username`, `email`, and `roles`. This is used in both the authentication service and user management components.
  - Example (in `auth.service.ts`):
    ```typescript
    interface User {
      id: number;
      username: string;
      email: string;
      role: 'Super Admin' | 'Group Admin' | 'User';
    }
    ```
  - **Where it's used**: Users are handled in components like `login.component.ts` and `user-management.component.ts`. When a user logs in, their role determines which parts of the application they can access.

- **Group Data Structure**:
  - Groups are represented as objects with properties like `groupId`, `groupName`, and `members`. This is handled in the `group.service.ts` for CRUD operations.
  - Example (in `group.service.ts`):
    ```typescript
    interface Group {
      id: number;
      groupName: string;
      members: User[];
    }
    ```
  - **Where it's used**: Groups are created, managed, and deleted using the `group.service.ts` in components like `group-management.component.ts`.

### Server-Side (Node.js):
- **Users**:
  - Users are tracked in the server during real-time communication through Socket.io. They are stored in an in-memory structure that maps usernames to channels they have joined.
  - Example (in `server.js`):
    ```javascript
    const usersInChannels = {}; // Tracks users in different channels
    ```

- **Groups**:
  - Groups are managed on the server through API endpoints that allow CRUD operations. This can be represented in a database (MongoDB or similar) or kept in memory for simplicity.

---

## 3. Client-Server Responsibilities

### Client-Side Responsibilities:
- **Chat and Messaging** (`chat.component.ts`):
  - Sends and receives messages via Socket.io.
  - Manages real-time interactions and updates UI when new messages are received.
  - Initiates video calls using PeerJS.
  
- **User Management** (`user-management.component.ts`):
  - Allows administrators to create and delete users locally.
  - Sends API requests for group management via `group.service.ts`.

- **Profile Management** (`user-profile.component.ts`):
  - Handles profile image uploads and displays the user's profile.

### Server-Side Responsibilities:
- **API Endpoints** (`server.js`):
  - Handles file uploads for profile pictures and chat images via `POST /upload/profile` and `POST /upload/chat`.
  - Processes and stores images using the Multer package.
  
- **Real-Time Communication**:
  - **Socket.io** manages real-time messaging and notifications (e.g., when a user joins or leaves a channel).
  - **PeerJS** (`peerServer.js`) facilitates WebRTC-based video calls between users.

---

## 4. REST API: Routes, Parameters, Return Values, and Purpose

### Profile Image Upload:
- **Route**: `POST /upload/profile`
  - **Parameters**: 
    - `avatar`: File (profile image).
    - `username`: String (username of the user uploading the image).
  - **Return Value**:
    - JSON response with `{ message: 'Profile image uploaded successfully', filePath }`.
  - **Functionality**: Uploads a user’s profile image to the server, storing the image in the `uploads` directory and returning the file path.

### Chat Image Upload:
- **Route**: `POST /upload/chat`
  - **Parameters**:
    - `chatImage`: File (image sent via chat).
    - `message`: String (optional message accompanying the image).
    - `username`: String (username of the sender).
  - **Return Value**:
    - JSON response with `{ message: 'Chat image uploaded successfully', filePath }`.
  - **Functionality**: Uploads an image to be sent via chat, storing it on the server and returning the file path.

### Group Management (CRUD Operations):

- **Get Groups**:
  - **Route**: `GET /api/groups`
  - **Parameters**: None.
  - **Return Value**: Returns an array of groups in JSON format.
  - **Functionality**: Retrieves the list of groups from the server.

- **Create Group**:
  - **Route**: `POST /api/groups`
  - **Parameters**: Group object (`{ groupName, members[] }`).
  - **Return Value**: Returns the created group object in JSON format.
  - **Functionality**: Creates a new group and adds it to the server.

- **Delete Group**:
  - **Route**: `DELETE /api/groups/:groupId`
  - **Parameters**: `groupId`: The ID of the group to delete.
  - **Return Value**: Returns a success message if the group is successfully deleted.
  - **Functionality**: Deletes the specified group from the server.

---

## 5. Angular Architecture: Components, Services, and Models

### Components:

- **`login.component.ts`**:
  - Responsible for user login. It verifies credentials and redirects the user to different routes (`/dashboard`, `/chat`, etc.) based on their role (Super Admin, Group Admin, or User).
  - **Interaction**:
    - Communicates with the `auth.service.ts` to authenticate users.
    - Uses routing to redirect users after a successful login.

- **`chat.component.ts`**:
  - The main chat interface, where users can send and receive messages in real time. It also supports image uploads and PeerJS-based video calls.
  - **Interaction**:
    - Uses `Socket.io` to send and receive messages.
    - Interacts with the `imageUpload.service.ts` to upload images.
    - Uses PeerJS for video calling.

- **`user-management.component.ts`**:
  - Manages the creation and deletion of users. It allows admins to add new users and delete existing ones.
  - **Interaction**:
    - Uses local arrays to manage users and `auth.service.ts` to determine if the current user has admin privileges.

- **`user-profile.component.ts`**:
  - Allows users to update their profile picture by uploading an image.
  - **Interaction**:
    - Interacts with the `imageUpload.service.ts` to handle profile image uploads.

### Services:

- **`auth.service.ts`**:
  - Handles user authentication, login, and session management. It uses local storage to keep track of logged-in users.
  - **Interaction**: 
    - Provides methods to log in, log out, and check the user’s role (Super Admin, Group Admin, User).

- **`group.service.ts`**:
  - Provides methods to interact with the server for creating, retrieving, and deleting groups.
  - **Interaction**: 
    - Communicates with the backend API routes (`/api/groups`) to perform group-related operations.

- **`imageUpload.service.ts`**:
  - Handles image uploads for both profile pictures and chat messages.
  - **Interaction**:
    - Provides methods to upload profile images (`/upload/profile`) and chat images (`/upload/chat`).

### Models

- **User Model**:
  - Represents a user in both the client (Angular) and server (Node.js) with attributes like `username`, `email`, `role`, and `id`.
  - Example:
    ```typescript
    interface User {
      id: number;
      username: string;
      email: string;
      role: 'Super Admin' | 'Group Admin' | 'User';
    }
    ```

- **Group Model**:
  - Represents a group entity in the Angular application. Each group has a unique ID, a name, and a list of members.
  - Example:
    ```typescript
    interface Group {
      id: number;
      groupName: string;
      members: User[];
    }
    ```

---

## 6. Client-Server Interaction

### Client-Side (Angular):
- **`chat.component.ts`**:
  - Uses Socket.io to send chat messages and receive updates in real-time.
  - Initiates PeerJS video calls by interacting with the PeerJS server on the backend.
  
- **`login.component.ts`**:
  - Handles user authentication and stores session data in `localStorage`.
  - Redirects users to different pages based on their roles.

- **`user-profile.component.ts`**:
  - Uses `imageUpload.service.ts` to upload profile images to the server.

### Server-Side (Node.js):
- **`server.js`**:
  - Manages real-time communication using Socket.io, handling events such as `joinChannel` and `chatMessage`.
  - Processes file uploads using Multer and serves uploaded images via static hosting.
  
- **`peerServer.js`**:
  - Manages PeerJS connections for WebRTC video calls between users.

---

### Conclusion:
This documentation provides a detailed overview of the structure, data flow, and client-server responsibilities in this project. Each component and service is responsible for specific tasks, and the interaction between the Angular frontend and Node.js backend is facilitated through REST APIs, Socket.io, and PeerJS for real-time communication.
