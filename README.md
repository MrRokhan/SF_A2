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

## 2. Data Structures on Client and Server

### Client-Side (Angular):
- **Users**: Represented as an object with fields such as `username`, `password`, and `roles` in `login.component.ts` and stored locally using `localStorage`.
  - Example (in `auth.service.ts`):
    ```typescript
    interface User {
      id: number;
      username: string;
      email: string;
      role: 'Super Admin' | 'Group Admin' | 'User';
    }
    ```
- **Groups and Channels**: Represented by a collection of entities, managed through Angular services like `group.service.ts`, and fetched from the server via REST APIs.
  - Example (in `group.service.ts`):
    ```typescript
    createGroup(group: any): Observable<any> {
      return this.http.post<any>(this.apiUrl, group);
    }
    ```

### Server-Side (Node.js):
- **Users and Channels**: Managed using a simple in-memory structure within the `server.js` file. Socket.io tracks users joining and leaving channels dynamically.
  - Example:
    ```javascript
    const usersInChannels = {}; // Tracks users in each channel
    ```

- **File Uploads**: Managed via Multer middleware, which processes image uploads for profiles and chat messages.
  - Example (in `server.js`):
    ```javascript
    const storage = multer.diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
      }
    });
    ```

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

## 4. List of Routes, Parameters, Return Values, and Purpose

### Client-Side (Angular Routes):
- **`/login`**: Route for user login. Checks user credentials and redirects based on role.
- **`/chat`**: Main chat interface, where users can send messages and make video calls.
- **`/profile`**: User profile page, allowing profile image upload and display.

### Server-Side (API Routes):
- **`POST /upload/profile`**: Upload a profile image.
  - **Parameters**: `avatar` (file), `username` (string).
  - **Returns**: `{ message: 'Profile image uploaded successfully', filePath }`
  
- **`POST /upload/chat`**: Upload an image for chat.
  - **Parameters**: `chatImage` (file), `message` (string), `username` (string).
  - **Returns**: `{ message: 'Chat image uploaded successfully', filePath }`

- **Socket.io Events**:
  - **`joinChannel`**: Adds a user to a chat channel.
  - **`chatMessage`**: Sends a chat message to all users in the channel.

## 5. Angular Architecture: Components, Services, Models, Routes

### Components:
- **`login.component.ts`**: Manages user login, redirects based on user roles (Super Admin, Group Admin, User).
- **`chat.component.ts`**: Displays chat messages, handles real-time messaging and video calls.
- **`user-management.component.ts`**: Allows administrators to manage users (create, delete).
- **`user-profile.component.ts`**: Manages profile image uploads and displays the user's current profile picture.

### Services:
- **`auth.service.ts`**: Manages user authentication, login, and session handling.
- **`group.service.ts`**: Handles group-related API requests (create, delete groups).
- **`imageUpload.service.ts`**: Manages image uploads for profile pictures and chat images.

### Models:
- **User Model** (in `auth.service.ts`):
  ```typescript
  interface User {
    id: number;
    username: string;
    email: string;
    role: 'Super Admin' | 'Group Admin' | 'User';
  }
