/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, Col, Row, Typography, Spin } from "antd";
import { useEffect, useState } from "react";
import { Column, Line, Pie } from "@ant-design/charts";
import moment from "moment";
import useMessage from "antd/es/message/useMessage";
import { getAdminDashboard } from "../../services/dashboard";

const { Title } = Typography;

// Provided interfaces

interface DashboardData {
    totalRestaurants: number;
    totalAccounts: number;
    totalOrders: number;
    totalFoodItems: number;
    totalCategories: number;
    averageRating: number;
    ordersTrend: { date: string; orders: number }[];
    restaurantRevenue: { name: string; revenue: number }[];
    topFoodItems: Food[];
}
const AdminDashboard = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [messageApi, contextHolder] = useMessage();
    const [loading, setLoading] = useState(false);

    // Mock data (minimized to include only necessary data for KPIs and charts)
    const mockData: DashboardData = {
        totalRestaurants: 10,
        totalAccounts: 50,
        totalOrders: 500,
        totalFoodItems: 200,
        totalCategories: 15,
        averageRating: 4.5,
        ordersTrend: [
            { date: "2025-06-25", orders: 80 },
            { date: "2025-06-26", orders: 100 },
            { date: "2025-06-27", orders: 70 },
            { date: "2025-06-28", orders: 120 },
            { date: "2025-06-29", orders: 130 },
        ],
        restaurantRevenue: [
            { name: "Restaurant A", revenue: 5000000 },
            { name: "Restaurant B", revenue: 3000000 },
            { name: "Restaurant C", revenue: 2000000 },
        ],
        topFoodItems: [
            {
                id: "F001",
                restaurant: { id: "R001", restaurantName: "Restaurant A" },
                category: { id: "C001", name: "Main Course" },
                dishName: "Pizza",
                description: "Classic Margherita Pizza",
                price: 200000,
                dishImage: "pizza.jpg",
                soldQuantity: 200,
                available: true,
                remainingQuantity: 50,
                createdAt: "2025-06-01",
                updatedAt: "2025-06-29",
                rating: 4.7,
            },
            {
                id: "F002",
                restaurant: { id: "R002", restaurantName: "Restaurant B" },
                category: { id: "C001", name: "Main Course" },
                dishName: "Burger",
                description: "Beef Burger with Fries",
                price: 150000,
                dishImage: "burger.jpg",
                soldQuantity: 150,
                available: true,
                remainingQuantity: 30,
                createdAt: "2025-06-01",
                updatedAt: "2025-06-29",
                rating: 4.5,
            },
        ],
    };

    // Fetch data (replace with API calls)
    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const response = await getAdminDashboard()
            setData(response);
            messageApi.success("Data loaded successfully");
        } catch (error) {
            messageApi.error("Failed to load dashboard data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    // Chart configurations
    const ordersChartConfig = {
        data: data?.ordersTrend || [],
        xField: "date",
        yField: "orders",
        height: 300,
        title: { text: "Orders Trend" },
        xAxis: { label: { formatter: (v: string) => moment(v).format("DD/MM") } },
    };

    const restaurantRevenueChartConfig = {
        data: data?.restaurantRevenue || [],
        angleField: "revenue",
        colorField: "name",
        height: 300,
        title: { text: "Revenue by Restaurant" },
        label: { type: "inner", offset: "-30%", style: { textAlign: "center" } },
        interactions: [{ type: "element-active" }],
    };

    const topFoodItemsChartConfig = {
        data: data?.topFoodItems || [],
        xField: "dishName",
        yField: "soldQuantity",
        height: 300,
        title: { text: "Top 5 Best-Selling Food Items" },
    };

    return (
        <div style={{ padding: 24 }}>
            {contextHolder}
            <Title level={3}>Admin Dashboard</Title>

            {loading ? (
                <div style={{ textAlign: "center", padding: 50 }}>
                    <Spin size="large" />
                </div>
            ) : (
                <>
                    <Row gutter={[16, 16]}>
                        <Col span={4}>
                            <Card title="Total Restaurants">{data?.totalRestaurants || 0}</Card>
                        </Col>
                        <Col span={4}>
                            <Card title="Total Accounts">{data?.totalAccounts || 0}</Card>
                        </Col>
                        <Col span={4}>
                            <Card title="Total Orders">{data?.totalOrders || 0}</Card>
                        </Col>
                        <Col span={4}>
                            <Card title="Total Food Items">{data?.totalFoodItems || 0}</Card>
                        </Col>
                        <Col span={4}>
                            <Card title="Total Categories">{data?.totalCategories || 0}</Card>
                        </Col>
                        <Col span={4}>
                            <Card title="Average Rating">{data?.averageRating?.toFixed(1) || "N/A"}</Card>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                        <Col span={12}>
                            <Card title="Orders Trend">
                                <Line {...ordersChartConfig} />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="Revenue by Restaurant">
                                <Pie {...restaurantRevenueChartConfig} />
                            </Card>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                        <Col span={12}>
                            <Card title="Top 5 Best-Selling Food Items">
                                <Column {...topFoodItemsChartConfig} />
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </div>
    );
};

export default AdminDashboard;