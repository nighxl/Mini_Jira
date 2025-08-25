# Mini\_Jira

JIRA is a project management tool





\# 📝 Task Management System (User \& Admin Dashboard)



A \*\*full-stack task management application\*\* built with \*\*Django REST Framework (backend)\*\* and \*\*React (frontend)\*\*.  

It supports \*\*two roles\*\*:  



\- 👤 \*\*User\*\* → Can register, log in, create tasks, update task status (In Progress / Completed), and delete tasks.  

\- 👑 \*\*Admin\*\* → Can log in to the admin dashboard, view system metrics (total users, total tasks), and see a user vs tasks summary.  



---



\## 🚀 Features



\### 🔐 Authentication

\- JWT-based authentication (`rest\_framework\_simplejwt`)

\- Role-based login: \*\*User\*\* vs \*\*Admin\*\*

\- Secure token storage in frontend



\### 👤 User Features

\- Register a new account

\- Login as \*\*User\*\*

\- Create, toggle, and delete tasks

\- Task status: In Progress ✅ Completed

\- Logout and return to role selection



\### 👑 Admin Features

\- Login as \*\*Admin\*\*

\- View \*\*Total Users\*\* and \*\*Total Tasks\*\*

\- See \*\*Users vs Tasks\*\* table

\- Logout and return to role selection



\### 🖥️ UI/UX

\- Role selection landing page:  

&nbsp; - Login as User  

&nbsp; - Login as Admin  

&nbsp; - Register new account  

\- Different themes for \*\*Users\*\* (blue) and \*\*Admins\*\* (red)

\- Clean dashboards for both roles



---



\## 🛠️ Tech Stack



\*\*Frontend\*\*  

\- React (Vite)  

\- React Router DOM  

\- Axios  

\- LocalStorage for session handling  



\*\*Backend\*\*  

\- Django \& Django REST Framework  

\- SimpleJWT for authentication  

\- PostgreSQL (can be swapped with SQLite for testing)  

\- CORS enabled  



---



\## ⚙️ Installation \& Setup



\### 🔧 Backend (Django)



1\. Clone the repo and navigate into backend folder:

&nbsp;  

&nbsp;  cd server

&nbsp;  



2\. Create virtual environment and install dependencies:

&nbsp;  

&nbsp;  python -m venv venv

&nbsp;  source venv/bin/activate   # On Windows: venv\\Scripts\\activate

&nbsp;  pip install -r requirements.txt

&nbsp;  



3\. Configure \*\*.env\*\* file:

&nbsp;  

&nbsp;  SECRET\_KEY=your-secret-key

&nbsp;  DEBUG=True

&nbsp;  DB\_NAME=taskdb

&nbsp;  DB\_USER=postgres

&nbsp;  DB\_PASSWORD=yourpassword

&nbsp;  DB\_HOST=localhost

&nbsp;  DB\_PORT=5432

&nbsp;  FRONTEND\_ORIGIN=http://localhost:5173

&nbsp;  



4\. Run migrations and start server:



&nbsp;  python manage.py migrate

&nbsp;  python manage.py runserver

&nbsp; 



➡️ Backend runs at: \*\*http://127.0.0.1:8000/\*\*







\### 🎨 Frontend (React)



1\. Go to frontend folder:

&nbsp;  

&nbsp;  cd frontend

&nbsp; 



2\. Install dependencies:

&nbsp;  

&nbsp;  npm install

&nbsp; 



3\. Start development server:

&nbsp; 

&nbsp;  npm run dev

&nbsp;

➡️ Frontend runs at: \*\*http://localhost:5173/\*\*







\## 🔑 API Endpoints



\### Auth

\- `POST /api/auth/register/` → Register new user  

\- `POST /api/auth/login/` → Login (returns JWT + `is\_staff`)  

\- `POST /api/auth/refresh/` → Refresh token  

\- `GET /api/auth/user/` → Get current logged-in user  



\### Tasks (User-only)

\- `GET /api/tasks/` → List my tasks  

\- `POST /api/tasks/` → Create new task  

\- `PUT /api/tasks/{id}/` → Update task  

\- `DELETE /api/tasks/{id}/` → Delete task  



\### Admin

\- `GET /api/admin/metrics/` → Returns system metrics  



---



\## 📸 Screenshots (Optional)

\_Add screenshots of your app (Landing page, User Dashboard, Admin Dashboard) here.\_



---



\## 🧑‍💻 How It Works



1\. When you open the app → You land on \*\*Role Selection Page\*\*.  

2\. Choose:  

&nbsp;  - Login as User → User Login form  

&nbsp;  - Login as Admin → Admin Login form  

&nbsp;  - Register → Registration form  

3\. After login:  

&nbsp;  - User → Redirected to \*\*Dashboard\*\* (task management)  

&nbsp;  - Admin → Redirected to \*\*Admin Panel\*\* (metrics)  

4\. Logout → Always redirected back to \*\*Role Selection Page\*\*.  



---



\## 📜 Status Codes



\- `200 OK` → Successful GET/PUT/DELETE  

\- `201 Created` → Successful POST  

\- `400 Bad Request` → Invalid request/validation error  

\- `401 Unauthorized` → Not logged in / Invalid token  

\- `403 Forbidden` → User not admin, tried accessing admin endpoint  

\- `404 Not Found` → Resource doesn’t exist  



---



\## 🤝 Contributing



Feel free to fork this project and open PRs. Suggestions are welcome 🚀



---



\## 📄 License

This project is licensed under the \*\*MIT License\*\*.



