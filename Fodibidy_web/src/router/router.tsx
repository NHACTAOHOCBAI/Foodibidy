import { createBrowserRouter, } from "react-router";
import Layout from "../layout/Layout";
import Dashboard from "../pages/admin/Dashboard";
import Food from "../pages/admin/Food";
import Order from "../pages/admin/Order";
import Restaurant from "../pages/admin/Restaurant";
import Category from "../pages/admin/Category";

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
        ]
    },
]);
export default router

