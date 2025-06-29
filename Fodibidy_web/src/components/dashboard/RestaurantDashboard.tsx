import { Card, Col, Row, Select, Spin, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { Column, Line, Pie } from "@ant-design/charts";
import moment from "moment";
import useMessage from "antd/es/message/useMessage";

const { Title } = Typography;
const { Option } = Select;

// Define interfaces for data
interface Order {
    key: string;
    orderId: string;
    date: string;
    total: number;
    status: string;
}

interface FoodItem {
    key: string;
    name: string;
    sold: number;
    revenue: number;
}

interface CategoryRevenue {
    category: string;
    revenue: number;
}

interface DashboardData {
    totalRevenue: number;
    totalOrders: number;
    averageOrderValue: number;
    totalItemsSold: number;
    revenueTrend: { date: string; revenue: number }[];
    topItems: FoodItem[];
    categoryRevenue: CategoryRevenue[];
    recentOrders: Order[];
}

const RestaurantDashboard = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [timeRange, setTimeRange] = useState("today");
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
            { key: "1", name: "Pizza", sold: 100, revenue: 2000000 },
            { key: "2", name: "Burger", sold: 80, revenue: 1600000 },
            { key: "3", name: "Sushi", sold: 60, revenue: 1800000 },
            { key: "4", name: "Salad", sold: 50, revenue: 1000000 },
            { key: "5", name: "Coffee", sold: 60, revenue: 600000 },
        ],
        categoryRevenue: [
            { category: "Main Course", revenue: 8000000 },
            { category: "Beverages", revenue: 4000000 },
            { category: "Desserts", revenue: 3000000 },
        ],
        recentOrders: [
            { key: "1", orderId: "ORD001", date: "2025-06-29 09:00", total: 250000, status: "Completed" },
            { key: "2", orderId: "ORD002", date: "2025-06-29 09:30", total: 180000, status: "Preparing" },
            { key: "3", orderId: "ORD003", date: "2025-06-29 10:00", total: 300000, status: "Cancelled" },
        ],
    };

    // Fetch data function (replace with actual API call)
    const fetchDashboardData = async (range: string) => {
        setLoading(true);
        try {
            // Simulate API call
            // const response = await api.getDashboardData(range);
            // setData(response);
            setData(mockData); // Use mock data
            messageApi.success("Data loaded successfully");
        } catch {
            messageApi.error("Failed to load dashboard data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData(timeRange);
    }, [timeRange]);

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
        xField: "name",
        yField: "revenue",
        height: 300,
        title: { text: "Top 5 Best-Selling Items" },
        yAxis: { label: { formatter: (v: number) => `${(v / 1000000).toFixed(1)}M` } },
    };

    const categoryChartConfig = {
        data: data?.categoryRevenue || [],
        angleField: "revenue",
        colorField: "category",
        height: 300,
        title: { text: "Revenue by Category" },
        label: { type: "inner", offset: "-30%", style: { textAlign: "center" } },
        interactions: [{ type: "element-active" }],
    };

    // Order table columns
    const orderColumns = [
        { title: "Order ID", dataIndex: "orderId", key: "orderId" },
        { title: "Date", dataIndex: "date", key: "date" },
        { title: "Total", dataIndex: "total", key: "total", render: (value: number) => `${value.toLocaleString()} VND` },
        { title: "Status", dataIndex: "status", key: "status" },
    ];

    return (
        <div style={{ padding: 24 }}>
            {contextHolder}
            <Title level={3}>Restaurant Dashboard</Title>
            <Select
                value={timeRange}
                onChange={setTimeRange}
                style={{ width: 200, marginBottom: 16 }}
                disabled={loading}
            >
                <Option value="today">Today</Option>
                <Option value="week">This Week</Option>
                <Option value="month">This Month</Option>
            </Select>

            {loading ? (
                <div style={{ textAlign: "center", padding: 50 }}>
                    <Spin size="large" />
                </div>
            ) : (
                <>
                    <Row gutter={[16, 16]}>
                        <Col span={6}>
                            <Card title="Total Revenue">
                                {(data?.totalRevenue || 0).toLocaleString()} VND
                            </Card>
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
                        <Col span={12}>
                            <Card title="Revenue Trend">
                                <Line {...revenueChartConfig} />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="Top 5 Best-Selling Items">
                                <Column {...topItemsChartConfig} />
                            </Card>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                        <Col span={12}>
                            <Card title="Revenue by Category">
                                <Pie {...categoryChartConfig} />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="Recent Orders">
                                <Table
                                    dataSource={data?.recentOrders || []}
                                    columns={orderColumns}
                                    pagination={false}
                                />
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </div>
    );
};

export default RestaurantDashboard;