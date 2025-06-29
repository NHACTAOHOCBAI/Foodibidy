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
import CheckAuth from "../pages/auth/CheckAuth";
import { Button, Result } from "antd";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: '/dashboard', element: <Dashboard /> },
            { path: '/foods', element: <CheckAuth endpoint="foods" />, children: [{ index: true, element: <Food /> }] },
            { path: '/orders', element: <CheckAuth endpoint="orders" />, children: [{ index: true, element: <Order /> }] },
            { path: '/restaurants', element: <CheckAuth endpoint="restaurants" />, children: [{ index: true, element: <Restaurant /> }] },
            { path: '/categories', element: <CheckAuth endpoint="categories" />, children: [{ index: true, element: <Category /> }] },
            { path: '/accounts', element: <CheckAuth endpoint="accounts" />, children: [{ index: true, element: <Account /> }] },
            { path: '/profile', element: <Profile /> },
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: "*", element: <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary">Back Home</Button>}
        />
    }

]);
export default router

