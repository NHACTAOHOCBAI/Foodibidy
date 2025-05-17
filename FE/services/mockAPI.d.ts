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

const mockFoods: Food[] = [...Array(20).keys()].map(i => ({
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

export const getCategories = ({ quantity }: { quantity: number }): Category[] =>
    mockCategories.slice(0, quantity);

export const getAllCategoriesByRestaurant = ({ idRestaurant }: { idRestaurant: number }): Category[] => {
    const restaurant = mockRestaurants.find(r => r.id === idRestaurant);
    return restaurant ? restaurant.categories.map(c => ({
        ...mockCategories.find(mc => mc.id === c.id)!
    })) : [];
};

export const getFoodsByCategory = ({ idCategory, quantity }: { idCategory: number; quantity: number }): Food[] =>
    mockFoods.filter(f => f.category.id === idCategory).slice(0, quantity);

export const getFoodsByRestaurant = ({ idRestaurant, quantity }: { idRestaurant: number; quantity: number }): Food[] =>
    mockFoods.filter(f => f.restaurant.id === idRestaurant).slice(0, quantity);

export const getFoods = ({ quantity }: { quantity: number }): Food[] =>
    mockFoods.slice(0, quantity);

export const getMyFavouriteFoods = ({ quantity }: { quantity: number }): Food[] =>
    mockFoods.filter(f => f.rating >= 4.5).slice(0, quantity);

export const searchFoods = ({ quantity, keyword }: { quantity: number; keyword: string }): Food[] =>
    mockFoods.filter(f => f.name.toLowerCase().includes(keyword.toLowerCase())).slice(0, quantity);

export const getRestaurants = ({ quantity }: { quantity: number }): Restaurant[] =>
    mockRestaurants.slice(0, quantity);

export const getMyOngoingOrder = ({ quantity }: { quantity: number }): Order[] =>
    mockOrders.filter(o => o.status === 'pending' || o.status === 'preparing').slice(0, quantity);

export const getMyHistoryOrder = ({ quantity }: { quantity: number }): Order[] =>
    mockOrders.filter(o => o.status === 'delivered' || o.status === 'cancelled').slice(0, quantity);

export const addFoodToCart = ({ idFood }: { idFood: number }) => {
    const food = mockFoods.find(f => f.id === idFood);
    if (food) {
        const existing = mockAccount.cart.find(item => item.food.id === idFood);
        if (existing) {
            existing.quantity += 1;
        } else {
            mockAccount.cart.push({
                food: { id: food.id, name: food.name, price: food.price },
                quantity: 1
            });
        }
    }
};

export const placeOrder = ({ idFoods }: { idFoods: number[] }) => {
    const items = idFoods.map(id => {
        const food = mockFoods.find(f => f.id === id);
        return food ? { food: { id: food.id, name: food.name, price: food.price }, quantity: 1 } : null;
    }).filter(Boolean) as Order["items"];

    const totalPrice = items.reduce((sum, item) => sum + item.food.price * item.quantity, 0);

    const newOrder: Order = {
        id: mockOrders.length + 1,
        account: { id: mockAccount.id, fullName: mockAccount.fullName },
        restaurant: { id: 1, name: 'Restaurant 1' },
        status: 'pending',
        orderTime: new Date().toISOString(),
        deliveryPhone: mockAccount.phoneNumber,
        items,
        totalPrice
    };

    mockOrders.push(newOrder);
};
