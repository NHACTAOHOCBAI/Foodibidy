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