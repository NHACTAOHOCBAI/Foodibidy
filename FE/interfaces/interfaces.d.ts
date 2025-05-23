interface Account {
    id: number;
    email: string;
    role: 'admin' | 'restaurant' | 'customer';
    fullName: string;
    createdAt: string;
    updateAt: string,
    phoneNumber: string;
    avatar: string;
    address: { id: number, typeName: string, value: string }[]
    cart: {
        food: Pick<Food, 'id' | 'name' | 'price'>;
        quantity: number;
    }[]
}

interface Restaurant {
    id: number;
    account: Pick<Account, 'id' | 'fullName' | 'phoneNumber'>;
    categories: Pick<Account, 'id' | 'name'>[];
    restaurantName: string;
    address: string;
    status: 'pending' | 'active' | 'closed';
    image: string;
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
    rating: string;
}

interface Order {
    id: number;
    account: Pick<Account, 'id' | 'fullName'>;
    restaurant: Pick<Restaurant, 'id' | 'name'>;
    status: 'pending' | 'preparing' | 'delivered' | 'cancelled';
    orderTime: string;
    deliveryPhone: string;
    items: {
        food: Pick<Food, 'id' | 'name' | 'price'>;
        quantity: number;
    }[]
    totalPrice: number;
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

