import { createContext, ReactNode, useContext, useState } from "react";

interface DataContextProps {
    categories: Category[]
    restaurants: Restaurant[]
    foods: Food[]
    orders: Order[]
    detailOrders: DetailOrder[]
    cart: CartItem[]
    account: Account
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
    const categories: Category[] = [
        { id: 1, name: "Fast Food", image: "fastfood.jpg", note: "Quick bites", createdAt: "2025-05-01T08:00:00Z" },
        { id: 2, name: "Vietnamese", image: "vietnamese.jpg", note: "Traditional food", createdAt: "2025-05-01T09:00:00Z" },
        { id: 3, name: "Japanese", image: "japanese.jpg", note: "Sushi and more", createdAt: "2025-05-01T10:00:00Z" },
        { id: 4, name: "Desserts", image: "desserts.jpg", note: "Sweet treats", createdAt: "2025-05-01T11:00:00Z" },
        { id: 5, name: "Drinks", image: "drinks.jpg", note: "Refreshing drinks", createdAt: "2025-05-01T12:00:00Z" },
        { id: 6, name: "Italian", image: "italian.jpg", note: "Pizza & pasta", createdAt: "2025-05-01T13:00:00Z" },
        { id: 7, name: "Chinese", image: "chinese.jpg", note: "Dim sum & more", createdAt: "2025-05-01T14:00:00Z" },
        { id: 8, name: "Korean", image: "korean.jpg", note: "K-BBQ", createdAt: "2025-05-01T15:00:00Z" },
        { id: 9, name: "Healthy", image: "healthy.jpg", note: "Salads & vegan", createdAt: "2025-05-01T16:00:00Z" },
        { id: 10, name: "Seafood", image: "seafood.jpg", note: "Fresh from ocean", createdAt: "2025-05-01T17:00:00Z" }
    ];
    const restaurants: Restaurant[] = [
        {
            id: 1, name: "Pho 24", address: "Hanoi", image: "pho24.jpg", rate: 4.5,
            categories: [{ id: 2, name: "Vietnamese" }], description: "Authentic pho and noodles", reviews: 120, status: "hoat_dong"
        },
        {
            id: 2, name: "Sushi King", address: "Ho Chi Minh City", image: "sushiking.jpg", rate: 4.7,
            categories: [{ id: 3, name: "Japanese" }], description: "Premium sushi", reviews: 90, status: "hoat_dong"
        },
        {
            id: 3, name: "Pizza Home", address: "Da Nang", image: "pizzahome.jpg", rate: 4.2,
            categories: [{ id: 6, name: "Italian" }], description: "Pizza and pasta", reviews: 85, status: "hoat_dong"
        },
        {
            id: 4, name: "Bun Cha Obama", address: "Hanoi", image: "buncha.jpg", rate: 4.9,
            categories: [{ id: 2, name: "Vietnamese" }], description: "Famous Bun Cha", reviews: 200, status: "hoat_dong"
        },
        {
            id: 5, name: "Dimsum House", address: "Hai Phong", image: "dimsum.jpg", rate: 4.0,
            categories: [{ id: 7, name: "Chinese" }], description: "Variety of dimsum", reviews: 75, status: "hoat_dong"
        },
        {
            id: 6, name: "KBBQ Seoul", address: "Nha Trang", image: "kbbq.jpg", rate: 4.6,
            categories: [{ id: 8, name: "Korean" }], description: "Korean BBQ experience", reviews: 110, status: "hoat_dong"
        },
        {
            id: 7, name: "The Smoothie Bar", address: "Da Lat", image: "smoothie.jpg", rate: 4.3,
            categories: [{ id: 5, name: "Drinks" }, { id: 9, name: "Healthy" }], description: "Healthy and fresh", reviews: 60, status: "hoat_dong"
        },
        {
            id: 8, name: "Seafood Paradise", address: "Vung Tau", image: "seafood.jpg", rate: 4.8,
            categories: [{ id: 10, name: "Seafood" }], description: "Ocean's finest", reviews: 140, status: "hoat_dong"
        },
        {
            id: 9, name: "Candy House", address: "Hue", image: "candy.jpg", rate: 3.9,
            categories: [{ id: 4, name: "Desserts" }], description: "All sweet things", reviews: 50, status: "cho_duyet"
        },
        {
            id: 10, name: "Burger Time", address: "Can Tho", image: "burger.jpg", rate: 4.1,
            categories: [{ id: 1, name: "Fast Food" }], description: "Burgers and fries", reviews: 70, status: "dong_cua"
        }
    ];
    const foods: Food[] = [
        { id: 1, restaurantName: "Pho 24", category: "Vietnamese", name: "Pho Bo", note: "With beef", price: 50000, image: "pho.jpg", sold: 200, remaining: 50, createdAt: "2025-05-01T08:00:00Z", rate: 4.5 },
        { id: 2, restaurantName: "Sushi King", category: "Japanese", name: "Salmon Sushi", note: "Fresh", price: 120000, image: "sushi.jpg", sold: 150, remaining: 30, createdAt: "2025-05-01T09:00:00Z", rate: 4.7 },
        { id: 3, restaurantName: "Pizza Home", category: "Italian", name: "Margherita", note: "Cheese pizza", price: 100000, image: "pizza.jpg", sold: 90, remaining: null, createdAt: "2025-05-01T10:00:00Z", rate: 4.2 },
        { id: 4, restaurantName: "Bun Cha Obama", category: "Vietnamese", name: "Bun Cha", note: "Grilled pork", price: 60000, image: "buncha.jpg", sold: 300, remaining: 80, createdAt: "2025-05-01T11:00:00Z", rate: 4.9 },
        { id: 5, restaurantName: "Dimsum House", category: "Chinese", name: "Shrimp Dumpling", note: "Steamed", price: 40000, image: "dumpling.jpg", sold: 120, remaining: 40, createdAt: "2025-05-01T12:00:00Z", rate: 4.1 },
        { id: 6, restaurantName: "KBBQ Seoul", category: "Korean", name: "Grilled Beef", note: "Spicy sauce", price: 150000, image: "kbbq.jpg", sold: 100, remaining: 25, createdAt: "2025-05-01T13:00:00Z", rate: 4.6 },
        { id: 7, restaurantName: "Candy House", category: "Desserts", name: "Chocolate Cake", note: "Rich chocolate", price: 50000, image: "cake.jpg", sold: 60, remaining: 15, createdAt: "2025-05-01T14:00:00Z", rate: 3.8 },
        { id: 8, restaurantName: "The Smoothie Bar", category: "Healthy", name: "Green Smoothie", note: "Kale, banana", price: 45000, image: "smoothie.jpg", sold: 70, remaining: null, createdAt: "2025-05-01T15:00:00Z", rate: 4.3 },
        { id: 9, restaurantName: "Seafood Paradise", category: "Seafood", name: "Grilled Lobster", note: "With butter", price: 250000, image: "lobster.jpg", sold: 40, remaining: 10, createdAt: "2025-05-01T16:00:00Z", rate: 4.8 },
        { id: 10, restaurantName: "Burger Time", category: "Fast Food", name: "Cheeseburger", note: "Double cheese", price: 55000, image: "burger.jpg", sold: 95, remaining: 20, createdAt: "2025-05-01T17:00:00Z", rate: 4.0 }
    ];
    const orders: Order[] = [
        {
            id: 1,
            food: [
                { idFood: 1, foodName: "Pho Bo", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuD7uPq_5omNXa_uzoTG8xV0bFQakFLproEQ&s", quantity: 2 },
                { idFood: 2, foodName: "Chao", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk4UfAad3IxecUFU6D8zorZ27Q1AYtzZQoKQ&s", quantity: 2 }
            ],
            price: 100000, quantity: 2, orderedAt: "2025-05-02T09:00:00Z", status: "Completed", receivedAt: "2025-05-02T10:00:00Z", restaurantName: "phuc nguyen"
        },
        {
            id: 2,
            food: [{ idFood: 3, foodName: "Margherita", image: "pizza.jpg", quantity: 1 }],
            price: 100000, quantity: 1, orderedAt: "2025-05-02T09:30:00Z", status: "Shipping", receivedAt: "", restaurantName: "phuc nguyen"
        },
        {
            id: 3,
            food: [{ idFood: 5, foodName: "Shrimp Dumpling", image: "dumpling.jpg", quantity: 3 }],
            price: 120000, quantity: 3, orderedAt: "2025-05-02T10:00:00Z", status: "Canceled", receivedAt: "", restaurantName: "phuc nguyen"
        },
        {
            id: 4,
            food: [{ idFood: 2, foodName: "Salmon Sushi", image: "sushi.jpg", quantity: 2 }],
            price: 240000, quantity: 2, orderedAt: "2025-05-02T10:30:00Z", status: "Completed", receivedAt: "2025-05-02T11:00:00Z", restaurantName: "phuc nguyen"
        },
        {
            id: 5,
            food: [{ idFood: 4, foodName: "Bun Cha", image: "buncha.jpg", quantity: 2 }],
            price: 120000, quantity: 2, orderedAt: "2025-05-02T11:00:00Z", status: "Shipping", receivedAt: "", restaurantName: "phuc nguyen"
        },
        {
            id: 6,
            food: [{ idFood: 7, foodName: "Chocolate Cake", image: "cake.jpg", quantity: 1 }],
            price: 50000, quantity: 1, orderedAt: "2025-05-02T11:30:00Z", status: "Completed", receivedAt: "2025-05-02T12:00:00Z", restaurantName: "phuc nguyen"
        },
        {
            id: 7,
            food: [{ idFood: 8, foodName: "Green Smoothie", image: "smoothie.jpg", quantity: 2 }],
            price: 90000, quantity: 2, orderedAt: "2025-05-02T12:00:00Z", status: "Completed", receivedAt: "2025-05-02T12:30:00Z", restaurantName: "phuc nguyen"
        },
        {
            id: 8,
            food: [{ idFood: 9, foodName: "Grilled Lobster", image: "lobster.jpg", quantity: 1 }],
            price: 250000, quantity: 1, orderedAt: "2025-05-02T12:30:00Z", status: "Shipping", receivedAt: "", restaurantName: "phuc nguyen"
        },
        {
            id: 9,
            food: [{ idFood: 6, foodName: "Grilled Beef", image: "kbbq.jpg", quantity: 2 }],
            price: 300000, quantity: 2, orderedAt: "2025-05-02T13:00:00Z", status: "Canceled", receivedAt: "", restaurantName: "phuc nguyen"
        },
        {
            id: 10,
            food: [{ idFood: 10, foodName: "Cheeseburger", image: "burger.jpg", quantity: 3 }],
            price: 165000, quantity: 3, orderedAt: "2025-05-02T13:30:00Z", status: "Completed", receivedAt: "2025-05-02T14:00:00Z", restaurantName: "phuc nguyen"
        }
    ];
    const cart: CartItem[] = [
        { id: 1, foodName: "Pho Bo", quantity: 1, price: 50000, restaurantName: "Pho 24" },
        { id: 2, foodName: "Margherita", quantity: 1, price: 100000, restaurantName: "Pizza Home" },
        { id: 3, foodName: "Salmon Sushi", quantity: 2, price: 120000, restaurantName: "Sushi King" },
        { id: 4, foodName: "Bun Cha", quantity: 1, price: 60000, restaurantName: "Bun Cha Obama" },
        { id: 5, foodName: "Shrimp Dumpling", quantity: 3, price: 40000, restaurantName: "Dimsum House" },
        { id: 6, foodName: "Grilled Beef", quantity: 2, price: 150000, restaurantName: "KBBQ Seoul" },
        { id: 7, foodName: "Green Smoothie", quantity: 1, price: 45000, restaurantName: "The Smoothie Bar" },
        { id: 8, foodName: "Chocolate Cake", quantity: 1, price: 50000, restaurantName: "Candy House" },
        { id: 9, foodName: "Grilled Lobster", quantity: 1, price: 250000, restaurantName: "Seafood Paradise" },
        { id: 10, foodName: "Cheeseburger", quantity: 2, price: 55000, restaurantName: "Burger Time" }
    ];
    const account: Account = {
        id: 1, name: "Nguyen Van A", phone: "0901234567", email: "a@gmail.com", avatar: "a.jpg", bio: "Food lover",
        address: [{ type: "home", location: "Hanoi" }, { type: "work", location: "Ha Dong" }],
        currentAddress: { type: "home", location: "Hanoi" }
    }
    const detailOrders: DetailOrder[] = [
        {
            id: 1,
            foodName: "Phở Bò",
            price: 45000,
            quantity: 2,
            receivedAt: "2025-05-09T11:30:00",
            image: "https://example.com/images/pho-bo.jpg",
            status: "Completed",
            category: "Food"
        },
        {
            id: 2,
            foodName: "Bánh Mì Thịt",
            price: 25000,
            quantity: 3,
            receivedAt: "2025-05-09T12:00:00",
            image: "https://example.com/images/banh-mi.jpg",
            status: "Completed",
            category: "Food"
        },
        {
            id: 3,
            foodName: "Cơm Tấm Sườn",
            price: 50000,
            quantity: 1,
            receivedAt: "2025-05-09T13:15:00",
            image: "https://example.com/images/com-tam.jpg",
            status: "Canceled",
            category: "Food"
        },
        {
            id: 4,
            foodName: "Bún Chả",
            price: 40000,
            quantity: 2,
            receivedAt: "2025-05-09T14:00:00",
            image: "https://example.com/images/bun-cha.jpg",
            status: "Completed",
            category: "Drink"
        },
        {
            id: 5,
            foodName: "Trà Sữa Trân Châu",
            price: 30000,
            quantity: 4,
            receivedAt: "2025-05-09T14:30:00",
            image: "https://example.com/images/tra-sua.jpg",
            status: "Completed",
            category: "Food"
        }
    ];
    return (
        <DataContext.Provider
            value={{ categories, restaurants, foods, orders, cart, account, detailOrders }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) throw new Error('useData must be used within FilterProvider');
    return context;
};