Final Tech Stack Selection
 Frontend
React + Vite + Tailwind CSS
•	React for building dynamic, component-based user interfaces
•	Vite for fast development and optimized build performance
•	Tailwind CSS for rapid, clean, and responsive UI styling
This combination ensures a modern, scalable, and visually consistent frontend experience.
 
 Backend
Node.js + Express
•	Node.js for efficient server-side execution
•	Express.js for building RESTful APIs and handling business logic
Used for:
•	Authentication handling
•	Case / PR creation logic
•	Reviewer assignment / severity logic
•	Status updates
•	Decision logging
 
 Database
MongoDB
•	NoSQL document-based database
•	Flexible schema design
•	Efficient storage of structured and semi-structured data
Used to store:
•	User accounts
•	Emergency cases / PR records
•	Status updates
•	Decision logs
•	Reviewer assignments
 
 Real-Time Communication
Socket.io
•	Enables live updates across dashboards
•	Supports real-time status changes
•	Instant notification of reviewer assignment or priority updates
 
 Authentication
JWT (JSON Web Tokens)
•	Secure token-based authentication
•	Session management without server-side session storage
•	Role-based access control support
 
Architecture Overview
Frontend (React)
↓
Backend (Express API + Socket.io)
↓
MongoDB Database
The backend follows a clean monolithic structure with modular organization for scalability and maintainability.


In short:

Frontend:
 React + Vite + Tailwind
Backend:
 Node.js + Express
Database:
  MongoDB
Real-time:
   Socket.io
Auth:
  JWT

<img width="451" height="686" alt="image" src="https://github.com/user-attachments/assets/11337f30-62b7-4721-a97c-116df60730ba" />
