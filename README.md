# 📒 Notes App (MERN Stack)  

A full-stack **Notes App** that allows users to securely create, edit, and manage personal notes with authentication. It ensures **proper session handling**, preventing unauthorized access while keeping users logged in until their session expires.  

## ✨ Features  
✅ **User Authentication** (JWT-based login/register with bcrypt encryption)  
✅ **Session Persistence** (Keeps users logged in until session expires)  
✅ **Auth-Protected Routes** (Users cannot access/edit notes without authentication)  
✅ **Auto-Redirect on Session Expiry** (Redirects to login if token is invalid/expired)  
✅ **CRUD Operations** (Create, Edit, Delete notes with title validation)  
✅ **Unique Titles per User** (Prevents duplicate titles for a user but allows them for different users)  
✅ **Form Validation** (Prevents empty fields & redundant updates)  
✅ **Delete Confirmation** (Alerts before deleting a note)  
✅ **Secure API** (Protected routes, backend validation, and CORS handling)  

## 🛠 Tech Stack  
- **Frontend:** React.js, Redux Toolkit, React Bootstrap, React Router, React Hook Form, Yup, Axios  
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, Bcrypt, CORS, Cookie Parser  
- **Hosting:** GitHub Pages (Frontend), Render (Backend), MongoDB Atlas (Database)  


## 🚀 Live Demo  
🔗 [https://vipul-sawant.github.io/SimpleNotesApp](https://vipul-sawant.github.io/SimpleNotesApp)

## 📸 Screenshots  
*(Add a screenshot of your app here)*  

## 📦 Installation & Setup  

### 1️⃣ Clone the Repository  
```bash 
git clone https://github.com/vipul-sawant/SimpleNotesApp.git
cd SimpleNotesApp
```

### 2️⃣ Install Dependencies
*Backend*
```bash
cd back-end
npm install
```
*Frontend*
``` bash
cd front-end
npm install
```
### 3️⃣ Setup Environment Variables
> 1️⃣ Create a `.env` file inside the root of the `back-end` folder.  
> 2️⃣ Copy the exact variables from the `.env.sample` file.  
> 3️⃣ Do not change variable names—only replace placeholder values with your actual values.  
 

#### Run this command in the backend folder to create the `.env` file:  
```bash
cp .env.sample .env
```

### 4️⃣ Run the Application
*Backend (Runs on port 4000 or your port number)*

```bash
cd back-end
npm run dev
```

*Frontend (Runs on port 5173)*

```bash
cd front-end
npm run dev
```