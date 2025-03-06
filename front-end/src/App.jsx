import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Layout';
import UserRegister from './pages/User/UserRegister.jsx';
import UserLogin from './pages/User/UserLogin.jsx';
import Dashboard from './pages/User/Dashboard.jsx';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes.jsx';
import AddNote from './pages/Notes/AddNote.jsx';
import UpdateNote from './pages/Notes/UpdateNote.jsx';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import NavbarComponent from './components/Navbar/Navbar.jsx';

const App = () => {

	const router = createBrowserRouter([{

		path: "/",
		element: <Layout />,
		children: [
			{
				path: "user/register",
				element: <UserRegister />
			},
			{
				path: "user/login",
				element: <UserLogin />
			},
			{
				path: "users/:username/dashboard",
				element: <ProtectedRoutes> <NavbarComponent/> <Dashboard /> </ProtectedRoutes>
			},
			{
				path: "notes/new",
				element: <ProtectedRoutes> <NavbarComponent /> <AddNote /> </ProtectedRoutes>
			},
			{
				path: "notes/:noteID/edit",
				element: <ProtectedRoutes> <NavbarComponent /> <UpdateNote /> </ProtectedRoutes>
			}
		]
	}], { basename: "/SimpleNotesApp" });

	const notes = useSelector(state=>state?.notes || {});
	const auth = useSelector(state=>state?.auth || {});

	useEffect(()=>{

		console.log("auth :", auth);
		console.log("notes :", notes);
	}, [notes, auth]);

  return (
    <>
		<RouterProvider router={router} />
    </>
  )
}

export default App
