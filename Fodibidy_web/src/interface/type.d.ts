interface Food {
    id: string;
    restaurant: Pick<Restaurant, 'id' | 'restaurantName'>;
    category: Pick<Category, 'id' | 'name'>;
    dishName: string;
    description: string;
    price: string;
    dishImage: string;
    soldQuantity: number;
    available: boolean;
    remainingQuantity: number | null;
    createdAt: string;
    updatedAt: string
    rating: numbernumber;
}

interface Order {
    address: string
    id: number;
    user: Pick<Account, 'id' | 'fullName'>;
    restaurant: Pick<Restaurant, 'id' | 'restaurantName'>;
    status: 'pending' | 'preparing' | 'delivered' | 'cancelled' | 'ongoing';
    orderTime: string;
    deliveryPhone?: string;
    items: {
        dish: Pick<Food, 'id' | 'dishName' | 'price' | 'dishImage'>;
        quantity: number;
    }[]
    totalPrice: number;
    createdAt: string
    shipperPhone?: string,
    shipperName?: string
}

interface Review {
    rating: number,
    comment: string,
    account: {
        avatar: string
        id: string,
        name: string
    }
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