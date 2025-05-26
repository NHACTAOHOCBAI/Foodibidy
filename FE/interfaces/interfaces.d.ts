interface Account {
    id: string;
    email: string;
    roleId: 'admin' | 'restaurant' | 'customer';
    fullName: string;
    createdAt: string;
    updateAt: string,
    phoneNumber: string;
    avatar: string;
    address: { id: number, typeName: string, addressName: string, value: string }[]
    cart: string
}

interface Cart {
    idCart: string,
    userId: string,
    dishes: {
        dish: Food
        quantity: number
    }[]
}

interface Restaurant {
    id: string;
    user: Pick<Account, 'id' | 'fullName' | 'phoneNumber'>,
    purchase: number
    category: Pick<Category, 'id' | 'name'>[];
    restaurantName: string;
    address: string;
    status: 'pending' | 'active' | 'closed';
    restaurantImage: string;
    phoneNumber: string;
    rating: number;
    createdAt: string;
    bio: string
}

interface Category {
    id: string;
    name: string;
    description: string;
    image: string;
    createdAt: string;
    purchase: number,
    updateAt: string
}

interface Food {
    id: string;
    restaurant: Pick<Restaurant, 'id' | 'restaurantName'>;
    category: Pick<Category, 'id' | 'name'>;
    dishName: string;
    description: string;
    price: number;
    dishImage: string;
    soldQuantity: number;
    available: boolean;
    remainingQuantity: number | null;
    createdAt: string;
    updatedAt: string
    rating: numbernumber;
}

interface Order {
    id: number;
    user: Pick<Account, 'id' | 'fullName'>;
    restaurant: Pick<Restaurant, 'id' | 'restaurantName'>;
    status: 'pending' | 'preparing' | 'delivered' | 'cancelled';
    orderTime: string;
    deliveryPhone?: string;
    items: {
        dish: Pick<Food, 'id' | 'dishName' | 'price' | 'dishImage'>;
        quantity: number;
    }[]
    totalPrice: number;
    createdAt: string
}

interface Review {
    id: number;
    account: Pick<Account, 'id' | 'fullName'>;
    food: Pick<Food, 'id' | 'name'>;
    rating: number;
    comment: string;
    createdAt: string;
}

interface Notification {
    id: number;
    account: Pick<Account, 'id' | 'fullName'>;
    content: string;
    read: boolean;
}

