import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import AddTask from "../pages/AddTask/AddTask";
import AllTask from "../pages/AllTask/AllTask";
import MyTask from "../pages/MyTask/MyTask";
import UpdateTask from "../components/UpdateTask";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: '/add-task',
                element: <AddTask></AddTask>
            },
            {
                path: '/all-task',
                element: <AllTask></AllTask>
            },
            {
                path: '/my-task',
                element: <MyTask></MyTask>
            },
            {
                path: '/update:id',
                element: <UpdateTask></UpdateTask>

            },
            {
                path: '/login',
                element: <Login></Login>
            }
        ]
    }
])
export default router;