# Description

  The Task Management Application allows users to efficiently manage their tasks with a drag-and-drop interface. Tasks are categorized into three sections: To-Do, In Progress, and Done. Users can add, edit, delete, and reorder tasks, with changes instantly saved to the database for real-time synchronization.
  
# Live Demo
  
  Live Application Link: https://task-management-1ef7a.web.app/
  
# Dependencies

  * Frontend Dependencies:
  
  - react
  
  - react-dom
  
  - react-router-dom
  
  - @hello-pangea/dnd
  
  - axios
  
  - firebase
  
  - react-hot-toast
  
  - react-icons
  
  - tailwindcss
  
  - daisyui
  
  * Backend Dependencies:
  
  - express
  
  - mongodb
  
  - cors
  
  - dotenv

# Installation steps

Clone the Repository:
* git clone https://github.com/yourusername/task-manage.git
* cd task-manage
---
Install Dependencies:
 - Ensure you have Node.js installed. Then, run:
   npm install
---
Set Up Firebase Configuration:
- Create a .env file in the root directory and add your Firebase config:
- VITE_FIREBASE_API_KEY=your_api_key
- VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
- VITE_FIREBASE_PROJECT_ID=your_project_id
- VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
- VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
- VITE_FIREBASE_APP_ID=your_app_id
---
Run the Development Server:
- npm run dev
---
Build for Production:
- npm run build
---

# Technologies Used

* Frontend:

- React.js (Vite.js)

- React Router

- Tailwind CSS & DaisyUI

- Firebase Authentication

- @hello-pangea/dnd (Drag and Drop)

- React Hot Toast (Notifications)

* Backend:

- Node.js & Express.js

- MongoDB 
