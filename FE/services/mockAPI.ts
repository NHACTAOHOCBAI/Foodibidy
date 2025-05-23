// mock-data.ts
const mockCategories: Category[] = [...Array(10).keys()].map(i => ({
    id: i + 1,
    name: `Category ${i + 1}`,
    description: `Description for Category ${i + 1}`,
    image: `https://example.com/category-${i + 1}.jpg`,
    createdAt: new Date().toISOString()
}));

const mockRestaurants: Restaurant[] = [...Array(5).keys()].map(i => ({
    id: i + 1,
    name: `Restaurant ${i + 1}`,
    address: `${i + 1} Main St`,
    phoneNumber: `090000000${i}`,
    status: 'active',
    image: `https://example.com/restaurant-${i + 1}.jpg`,
    rating: 4.5 - (i * 0.2),
    createdAt: new Date().toISOString(),
    bio: 'Good food, great people.',
    account: { id: i + 1, fullName: `Owner ${i + 1}`, phoneNumber: `090000000${i}` },
    categories: mockCategories.slice(0, 3).map(c => ({ id: c.id, name: c.name }))
}));

const mockFoods: Food[] = [...Array(100).keys()].map(i => ({
    id: i + 1,
    name: `Food ${i + 1}`,
    description: `Delicious food number ${i + 1}`,
    price: 5 + i,
    image: `https://example.com/food-${i + 1}.jpg`,
    soldQuantity: i * 2,
    available: true,
    remainingQuantity: 10 + i,
    createdAt: new Date().toISOString(),
    rating: 4 + (i % 2) * 0.2,
    category: { id: (i % 5) + 1, name: `Category ${(i % 5) + 1}` },
    restaurant: { id: (i % 3) + 1, name: `Restaurant ${(i % 3) + 1}` }
}));

const mockAccount: Account = {
    id: 1,
    email: 'user@example.com',
    fullName: 'John Doe',
    phoneNumber: '0988888888',
    avatar: 'https://example.com/avatar.jpg',
    role: 'customer',
    createdAt: new Date().toISOString(),
    updateAt: new Date().toISOString(),
    address: [{ id: 1, typeName: 'Home', value: '123 Street A' }],
    cart: []
};

const mockOrders: Order[] = [...Array(5).keys()].map(i => ({
    id: i + 1,
    account: { id: 1, fullName: 'John Doe' },
    restaurant: { id: (i % 3) + 1, name: `Restaurant ${(i % 3) + 1}` },
    status: i % 2 === 0 ? 'preparing' : 'delivered',
    orderTime: new Date().toISOString(),
    deliveryPhone: '0988888888',
    items: [
        { food: { id: 1, name: 'Food 1', price: 10 }, quantity: 1 },
        { food: { id: 2, name: 'Food 2', price: 15 }, quantity: 2 }
    ],
    totalPrice: 40
}));

// --- Mock API functions ---

export const getMyProfile = () => mockAccount

// 🥗 Lấy category có phân trang
export const getCategoriesPaginated = ({ page, limit }: { page: number; limit: number }): Promise<Category[]> => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return new Promise(resolve => {
        setTimeout(() => resolve(mockCategories.slice(start, end)), 500);
    });
};

// 🏪 Lấy categories theo nhà hàng (không cần phân trang vì thường ít)
export const getAllCategoriesByRestaurant = ({ idRestaurant }: { idRestaurant: number }): Category[] => {
    const restaurant = mockRestaurants.find(r => r.id === idRestaurant);
    return restaurant ? restaurant.categories.map(c => ({
        ...mockCategories.find(mc => mc.id === c.id)!
    })) : [];
};

// 🍕 Lấy food theo category (đã có phân trang rồi - giữ nguyên)
export const getFoodsByCategoryPaginated = ({
    idCategory,
    page,
    limit,
}: {
    idCategory: number;
    page: number;
    limit: number;
}): Promise<Food[]> => {
    const all = mockFoods.filter(f => f.category.id === idCategory);
    const start = (page - 1) * limit;
    const end = start + limit;
    return new Promise((resolve) => {
        setTimeout(() => resolve(all.slice(start, end)), 500);
    });
};

// 🍽️ Lấy food theo restaurant có phân trang
export const getFoodsByRestaurantPaginated = ({
    idRestaurant,
    page,
    limit,
}: {
    idRestaurant: number;
    page: number;
    limit: number;
}): Promise<Food[]> => {
    const all = mockFoods.filter(f => f.restaurant.id === idRestaurant);
    const start = (page - 1) * limit;
    const end = start + limit;
    return new Promise(resolve => {
        setTimeout(() => resolve(all.slice(start, end)), 500);
    });
};

// 🍱 Lấy toàn bộ food có phân trang
export const getFoodsPaginated = ({ page, limit }: { page: number; limit: number }): Promise<Food[]> => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return new Promise(resolve => {
        setTimeout(() => resolve(mockFoods.slice(start, end)), 500);
    });
};

// ❤️ Lấy favourite food có phân trang
export const getMyFavouriteFoodsPaginated = ({
    page,
    limit,
}: {
    page: number;
    limit: number;
}): Promise<Food[]> => {
    const favs = mockFoods.filter(f => f.rating >= 4.5);
    const start = (page - 1) * limit;
    const end = start + limit;
    return new Promise(resolve => {
        setTimeout(() => resolve(favs.slice(start, end)), 500);
    });
};

// 🔍 Tìm kiếm food có phân trang
export const searchFoodsPaginated = ({
    keyword,
    page,
    limit,
}: {
    keyword: string;
    page: number;
    limit: number;
}): Promise<Food[]> => {
    const results = mockFoods.filter(f => f.name.toLowerCase().includes(keyword.toLowerCase()));
    const start = (page - 1) * limit;
    const end = start + limit;
    return new Promise(resolve => {
        setTimeout(() => resolve(results.slice(start, end)), 500);
    });
};

// 🍴 Lấy nhà hàng có phân trang
export const getRestaurantsPaginated = ({ page, limit }: { page: number; limit: number }): Promise<Restaurant[]> => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return new Promise(resolve => {
        setTimeout(() => resolve(mockRestaurants.slice(start, end)), 500);
    });
};

// 🧾 Lấy đơn đang xử lý có phân trang
export const getMyOngoingOrderPaginated = ({ page, limit }: { page: number; limit: number }): Promise<Order[]> => {
    const ongoing = mockOrders.filter(o => o.status === 'pending' || o.status === 'preparing');
    const start = (page - 1) * limit;
    const end = start + limit;
    return new Promise(resolve => {
        setTimeout(() => resolve(ongoing.slice(start, end)), 500);
    });
};

// 📜 Lịch sử đơn hàng có phân trang
export const getMyHistoryOrderPaginated = ({ page, limit }: { page: number; limit: number }): Promise<Order[]> => {
    const history = mockOrders.filter(o => o.status === 'delivered' || o.status === 'cancelled');
    const start = (page - 1) * limit;
    const end = start + limit;
    return new Promise(resolve => {
        setTimeout(() => resolve(history.slice(start, end)), 500);
    });
};

export const addFoodToCart = ({ idFood, quantity }: { idFood: number, quantity: number }) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            const food = mockFoods.find(f => f.id === idFood);
            if (food) {
                const existing = mockAccount.cart.find(item => item.food.id === idFood);
                if (existing) {
                    existing.quantity += quantity;
                } else {
                    mockAccount.cart.push({
                        food: { id: food.id, name: food.name, price: food.price },
                        quantity
                    });
                }
            }
            resolve();
        }, 1000); // 500ms delay
    });
};


export const placeOrder = ({ items }: { items: { idFood: number, quantity: number }[] }) => {
    return new Promise<Order>((resolve) => {
        setTimeout(() => {
            const orderItems = items.map(({ idFood, quantity }) => {
                const food = mockFoods.find(f => f.id === idFood);
                return food ? { food: { id: food.id, name: food.name, price: food.price }, quantity } : null;
            }).filter(Boolean) as Order["items"];

            const totalPrice = orderItems.reduce((sum, item) => sum + item.food.price * item.quantity, 0);

            const newOrder: Order = {
                id: mockOrders.length + 1,
                account: { id: mockAccount.id, fullName: mockAccount.fullName },
                restaurant: { id: 1, name: 'Restaurant 1' },
                status: 'pending',
                orderTime: new Date().toISOString(),
                deliveryPhone: mockAccount.phoneNumber,
                items: orderItems,
                totalPrice
            };

            mockOrders.push(newOrder);
            resolve(newOrder);
        }, 1000); // 1000ms delay
    });
};


