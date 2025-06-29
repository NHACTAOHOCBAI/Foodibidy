/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, Col, Row, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { Column, Line, Pie } from "@ant-design/charts";
import moment from "moment";
import useMessage from "antd/es/message/useMessage";
import { getRestaurantDashboard } from "../../services/dashboard";

const { Title } = Typography;

// Provided interfaces

interface DashboardData {
    totalRevenue: number;
    totalOrders: number;
    averageOrderValue: number;
    totalItemsSold: number;
    revenueTrend: { date: string; revenue: number }[];
    topItems: Food[];
    categoryRevenue: Pick<Category, "name" | "purchase">[];
}

const RestaurantDashboard = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [messageApi, contextHolder] = useMessage();
    const [loading, setLoading] = useState(false);

    // Mock data
    const mockData: DashboardData = {
        totalRevenue: 15000000,
        totalOrders: 120,
        averageOrderValue: 125000,
        totalItemsSold: 350,
        revenueTrend: [
            { date: "2025-06-25", revenue: 4000000 },
            { date: "2025-06-26", revenue: 4500000 },
            { date: "2025-06-27", revenue: 3000000 },
            { date: "2025-06-28", revenue: 5000000 },
            { date: "2025-06-29", revenue: 5500000 },
        ],
        topItems: [
            {
                id: "F001",
                restaurant: { id: "R001", restaurantName: "Restaurant A" },
                category: { id: "C001", name: "Main Course" },
                dishName: "Pizza",
                description: "Classic Margherita Pizza",
                price: 200000,
                dishImage: "pizza.jpg",
                soldQuantity: 100,
                available: true,
                remainingQuantity: 50,
                createdAt: "2025-06-01",
                updatedAt: "2025-06-29",
                rating: 4.7,
            },
            {
                id: "F002",
                restaurant: { id: "R001", restaurantName: "Restaurant A" },
                category: { id: "C001", name: "Main Course" },
                dishName: "Burger",
                description: "Beef Burger with Fries",
                price: 200000,
                dishImage: "burger.jpg",
                soldQuantity: 80,
                available: true,
                remainingQuantity: 30,
                createdAt: "2025-06-01",
                updatedAt: "2025-06-29",
                rating: 4.5,
            },
            {
                id: "F003",
                restaurant: { id: "R001", restaurantName: "Restaurant A" },
                category: { id: "C001", name: "Main Course" },
                dishName: "Sushi",
                description: "Fresh Sushi Platter",
                price: 300000,
                dishImage: "sushi.jpg",
                soldQuantity: 60,
                available: true,
                remainingQuantity: 20,
                createdAt: "2025-06-01",
                updatedAt: "2025-06-29",
                rating: 4.8,
            },
            {
                id: "F004",
                restaurant: { id: "R001", restaurantName: "Restaurant A" },
                category: { id: "C002", name: "Salads" },
                dishName: "Salad",
                description: "Fresh Garden Salad",
                price: 200000,
                dishImage: "salad.jpg",
                soldQuantity: 50,
                available: true,
                remainingQuantity: 40,
                createdAt: "2025-06-01",
                updatedAt: "2025-06-29",
                rating: 4.2,
            },
            {
                id: "F005",
                restaurant: { id: "R001", restaurantName: "Restaurant A" },
                category: { id: "C003", name: "Beverages" },
                dishName: "Coffee",
                description: "Espresso Coffee",
                price: 10000,
                dishImage: "coffee.jpg",
                soldQuantity: 60,
                available: true,
                remainingQuantity: 100,
                createdAt: "2025-06-01",
                updatedAt: "2025-06-29",
                rating: 4.0,
            },
        ],
        categoryRevenue: [
            { name: "Main Course", purchase: 8000000 },
            { name: "Beverages", purchase: 4000000 },
            { name: "Desserts", purchase: 3000000 },
        ],
    };

    // Fetch data function (replace with actual API call)
    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            // Simulate API call
            const response = await getRestaurantDashboard()
            setData(response);
            setData(mockData); // Use mock data
            messageApi.success("Data loaded successfully");
        } catch {
            messageApi.error("Failed to load dashboard data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    // Chart configurations
    const revenueChartConfig = {
        data: data?.revenueTrend || [],
        xField: "date",
        yField: "revenue",
        height: 300,
        title: { text: "Revenue Trend" },
        xAxis: { label: { formatter: (v: string) => moment(v).format("DD/MM") } },
        yAxis: { label: { formatter: (v: number) => `${(v / 1000000).toFixed(1)}M` } },
    };

    const topItemsChartConfig = {
        data: data?.topItems || [],
        xField: "dishName",
        yField: "soldQuantity",
        height: 300,
        title: { text: "Top 5 Best-Selling Items" },
        yAxis: { label: { formatter: (v: number) => `${v}` } },
    };

    const categoryChartConfig = {
        data: data?.categoryRevenue || [],
        angleField: "purchase",
        colorField: "name",
        height: 300,
        title: { text: "Revenue by Category" },
        label: { type: "inner", offset: "-30%", style: { textAlign: "center" } },
        interactions: [{ type: "element-active" }],
    };

    return (
        <div style={{ padding: 24 }}>
            {contextHolder}
            <Title level={3}>Restaurant Dashboard</Title>


            {loading ? (
                <div style={{ textAlign: "center", padding: 50 }}>
                    <Spin size="large" />
                </div>
            ) : (
                <>
                    <Row gutter={[16, 16]}>
                        <Col span={6}>
                            <Card title="Total Revenue">{(data?.totalRevenue || 0).toLocaleString()} VND</Card>
                        </Col>
                        <Col span={6}>
                            <Card title="Total Orders">{data?.totalOrders || 0}</Card>
                        </Col>
                        <Col span={6}>
                            <Card title="Average Order Value">
                                {(data?.averageOrderValue || 0).toLocaleString()} VND
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card title="Total Items Sold">{data?.totalItemsSold || 0}</Card>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                        <Col span={8}>
                            <Card title="Revenue Trend">
                                <Line {...revenueChartConfig} />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Top 5 Best-Selling Items">
                                <Column {...topItemsChartConfig} />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Revenue by Category">
                                <Pie {...categoryChartConfig} />
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </div>
    );
};

export default RestaurantDashboard;