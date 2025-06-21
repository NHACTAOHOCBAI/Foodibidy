import { createContext, ReactNode, useContext, useState } from "react";

interface OrderContextProps {
    orders: Food[]
    setOrders: (value: Food[]) => void
}

const OrderContext = createContext<OrderContextProps | undefined>(undefined);
const initialOrders: Food[] = [
    {
        id: 'dish_001',
        restaurant: { id: 'rest_001', restaurantName: 'Pizza Palace  ' },
        category: { id: 'cat_001', name: 'Pizza' },
        dishName: 'Margherita Pizza',
        description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil.',
        price: 12.99,
        dishImage: 'https://example.com/images/margherita_pizza.jpg',
        soldQuantity: 150,
        available: true,
        remainingQuantity: 50,
        createdAt: '2025-06-01T10:00:00Z',
        updatedAt: '2025-06-18T15:30:00Z',
        rating: 4.5,
    },
    {
        id: 'dish_002',
        restaurant: { id: 'rest_002', restaurantName: 'Pizza Palace 2' },
        category: { id: 'cat_002', name: 'Sushi' },
        dishName: 'California Roll',
        description: 'Sushi roll with crab, avocado, and cucumber.',
        price: 8.99,
        dishImage: 'https://example.com/images/california_roll.jpg',
        soldQuantity: 200,
        available: true,
        remainingQuantity: 30,
        createdAt: '2025-06-02T12:00:00Z',
        updatedAt: '2025-06-17T14:20:00Z',
        rating: 4.2,
    },
    {
        id: 'dish_003',
        restaurant: { id: 'rest_003', restaurantName: 'Burger Bonanza' },
        category: { id: 'cat_003', name: 'Burgers' },
        dishName: 'Cheeseburger',
        description: 'Juicy beef patty with cheddar cheese, lettuce, and tomato.',
        price: 9.99,
        dishImage: 'https://example.com/images/cheeseburger.jpg',
        soldQuantity: 300,
        available: false,
        remainingQuantity: 0,
        createdAt: '2025-06-03T09:00:00Z',
        updatedAt: '2025-06-19T08:00:00Z',
        rating: 4.7,
    },
];
export const OrderProvider = ({ children }: { children: ReactNode }) => {
    const [orders, setOrders] = useState<Food[]>(initialOrders)
    return (
        <OrderContext.Provider
            value={{ orders, setOrders }}
        >
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => {
    const context = useContext(OrderContext);
    if (!context) throw new Error('useOrder must be used within OrderProvider');
    return context;
};