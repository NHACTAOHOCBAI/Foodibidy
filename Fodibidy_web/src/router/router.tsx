import { createBrowserRouter, } from "react-router";
import Layout from "../layout/Layout";
import Dashboard from "../pages/admin/Dashboard";
import Food from "../pages/admin/Food";
import Order from "../pages/admin/Order";
import Restaurant from "../pages/admin/Restaurant";
import Category from "../pages/admin/Category";
import Profile from "../pages/admin/Profile";
import Account from "../pages/admin/Account";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: '/dashboard', element: <Dashboard /> },
            { path: '/foods', element: <Food /> },
            { path: '/orders', element: <Order /> },
            { path: '/restaurants', element: <Restaurant /> },
            { path: '/categories', element: <Category /> },
            { path: '/accounts', element: <Account /> },
            { path: '/my-restaurant', element: <Profile /> },
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    }
]);
export default router

