/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Table, Tag, Input, message, Popconfirm } from "antd";
import type { TableProps } from "antd";
import { useEffect, useState, useMemo, useContext } from "react";
import { FaRegEdit } from "react-icons/fa";
import { DeleteOutlined } from "@ant-design/icons";
import UpdateOrder from "../../components/order/UpdateOrder";
import { deleteOrder, geAllOrder, getMyOrder } from "../../services/order";
import convertDateFormat from "../../utils/convertDateFormat";
import { RiResetLeftFill } from "react-icons/ri";
import { MyProfileContext } from "../../context/MyProfileContext";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../configs/firebaseConfig";

const PAGE_SIZE = 4;

const Order = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [updatedOrder, setUpdatedOrder] = useState<Order>();
  const [isPending, setIsPending] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { myProfile, restaurantId } = useContext(MyProfileContext);

  // Column definitions
  const columns: TableProps<Order>["columns"] = [
    {
      title: "Customer",
      dataIndex: ["user", "fullName"],
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Items",
      dataIndex: "items",
      render: (
        items: {
          dish: { dishName: string; price: number | string };
          quantity: number;
        }[]
      ) => (
        <ul style={{ paddingLeft: 16 }}>
          {items.map((item, idx) => (
            <li key={idx}>
              {item.dish.dishName} x {item.quantity} ($
              {(Number(item.dish.price) * item.quantity).toFixed(2)})
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Total Price",
      dataIndex: "items",
      sorter: (a, b) => {
        const totalA = a.items.reduce(
          (sum, item) => sum + Number(item.dish.price) * item.quantity,
          0
        );
        const totalB = b.items.reduce(
          (sum, item) => sum + Number(item.dish.price) * item.quantity,
          0
        );
        return totalA - totalB;
      },
      render: (items) => {
        const total = items.reduce(
          (
            sum: number,
            item: { dish: { price: number | string }; quantity: number }
          ) => sum + Number(item.dish.price) * item.quantity,
          0
        );
        return `$${total.toFixed(2)}`;
      },
    },
    {
      title: "Placed At",
      dataIndex: "createdAt",
      render: (time) => convertDateFormat(time),
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        { text: "Pending", value: "pending" },
        { text: "Preparing", value: "preparing" },
        { text: "Ongoing", value: "ongoing" },
        { text: "Delivered", value: "delivered" },
        { text: "Cancelled", value: "cancelled" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        const colorMap: Record<string, string> = {
          pending: "gold",
          preparing: "blue",
          ongoing: "orange",
          delivered: "green",
          cancelled: "red",
        };
        return <Tag color={colorMap[status]}>{status.toUpperCase()}</Tag>;
      },
    },
    ...(myProfile?.role === "admin"
      ? [
        {
          title: "Restaurant",
          render: (_: any, record: Order) => (
            <div>{record.restaurant?.restaurantName || "N/A"}</div>
          ),
        },
      ]
      : []),
    {
      title: "Actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {myProfile?.role === "restaurant" ? (
            <Button
              onClick={() => {
                setUpdatedOrder(record);
                setIsUpdateOpen(true);
              }}
              icon={<FaRegEdit />}
            >
              Update
            </Button>
          ) : (
            myProfile?.role === "admin" && (
              <Popconfirm
                title="Delete the order"
                description="Are you sure?"
                onConfirm={() => handleDelete(String(record.id))}
                okText="Yes"
                cancelText="No"
              >
                <div style={{ color: "#ED3500" }}>
                  <DeleteOutlined />
                </div>
              </Popconfirm>
            )
          )}
        </div>
      ),
    },
  ];

  // Filter by search text (customer or restaurant name)
  const filteredOrders = useMemo(() => {
    if (!searchText) return orders;
    return orders.filter(
      (order) =>
        order.user.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
        (order.restaurant?.restaurantName || "")
          .toLowerCase()
          .includes(searchText.toLowerCase())
    );
  }, [orders, searchText]);

  // Reset page when searchText changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);

  // Handle delete
  const handleDelete = async (id: string) => {
    try {
      await deleteOrder(id);
      await refetchData();
      messageApi.success("Deleted successfully");
    } catch (error) {
      messageApi.error(String(error));
    }
  };

  const refetchData = async () => {
    setIsPending(true);
    try {
      let res: Order[] = [];
      if (myProfile?.role === "restaurant") {
        res = await getMyOrder();
      } else res = await geAllOrder();
      setOrders(res);
    } catch (error) {
      messageApi.error(String(error));
    } finally {
      setIsPending(false);
    }
  };

  // Firestore live update
  useEffect(() => {
    setIsPending(true);

    console.log(myProfile);
    const ordersRef = collection(db, "Order_details");
    const q =
      myProfile?.role === "restaurant"
        ? query(ordersRef, where("restaurant.id", "==", restaurantId))
        : ordersRef;

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const ordersData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return { ...data, id: doc.id } as Order;
        });

        const totalPages = Math.ceil(ordersData.length / PAGE_SIZE);
        if (currentPage > totalPages) {
          setCurrentPage(1);
        }

        setOrders(ordersData);
        setIsPending(false);
        messageApi.success(`New orders fetched successfully`);
      },
      (error) => {
        messageApi.error(`Error fetching orders: ${error.message}`);
        setIsPending(false);
      }
    );

    return () => unsubscribe();
  }, [myProfile?.role, messageApi, currentPage]);

  return (
    <>
      h
      <div
        style={{
          boxShadow:
            "0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.05)",
          padding: 20,
          borderRadius: 8,
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          Search:{" "}
          <Input
            style={{ width: 400 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by customer or restaurant name"
          />
        </div>
        <Button
          style={{ display: "flex", alignItems: "center" }}
          type="primary"
          onClick={() => setSearchText("")}
        >
          <RiResetLeftFill /> Reset
        </Button>
      </div>
      {contextHolder}
      <UpdateOrder
        isUpdateOpen={isUpdateOpen}
        setIsUpdateOpen={setIsUpdateOpen}
        updatedOrder={updatedOrder}
        setUpdatedOrder={setUpdatedOrder}
        refetchData={refetchData}
      />
      <Table<Order>
        key="order-table"
        loading={isPending}
        bordered
        columns={columns}
        dataSource={filteredOrders}
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize: PAGE_SIZE,
          onChange: (page) => setCurrentPage(page),
          showTotal: (total) => `Total ${total} Orders`,
        }}
        expandable={{
          expandedRowRender: (record) => (
            <div key={record.id}>
              <p style={{ margin: 0 }}>
                Shipper phone: {record.shipperPhone || "N/A"}
              </p>
              <p style={{ margin: 0 }}>
                Shipper name: {record.shipperName || "N/A"}
              </p>
            </div>
          ),
          rowExpandable: (record) =>
            !!record.shipperName || !!record.shipperPhone,
        }}
      />
    </>
  );
};

export default Order;
