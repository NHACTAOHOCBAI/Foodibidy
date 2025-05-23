// interface Category {
//     image: string,
//     id: number,
//     name: string,
//     note: string,
//     createdAt: string,
// }

// interface Restaurant {
//     id: number,
//     // account: {
//     //     id: number,
//     //     name: string,
//     // }
//     name: string,
//     address: string,
//     image: string,
//     rate: number,
//     categories: {
//         id: number,
//         name: string
//     }[],
//     description: string,
//     reviews: number,
//     createdAt?: string,
//     updatedAt?: string,
//     status: string
// }



// interface Food {
//     id: number;
//     restaurantName: string;
//     category: string;
//     name: string;
//     note: string;
//     price: number;
//     image: string;
//     sold: number;
//     remaining: number | null;
//     createdAt: string;
//     rate: number;
// }

// interface Order {
//     id: number;
//     food: {
//         idFood: number,
//         foodName: string,
//         image: string;
//         quantity: number
//     }[]
//     price: number;
//     quantity: number;
//     orderedAt: string;
//     status: "Completed" | "Canceled" | "Shipping",
//     restaurantName: string,
//     receivedAt: string
// }

// interface DetailOrder {
//     id: number,
//     foodName: string,
//     price: number,
//     quantity: number,
//     receivedAt: string,
//     image: string,
//     status: "Completed" | "Canceled",
//     category: string
// }

// interface CartItem {
//     id: number,
//     foodName: string,
//     quantity: number,
//     price: number,
//     restaurantName: string;
// }

// interface Account {
//     id: number,
//     name: string,
//     address: {
//         type: string,
//         location: string
//     }[],
//     phone: string,
//     email: string,
//     avatar: string,
//     bio: string,
//     currentAddress: {
//         type: string,
//         location: string
//     },
// }
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
    rating: number;
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

