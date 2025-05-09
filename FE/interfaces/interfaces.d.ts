interface Category {
    image: string,
    id: number,
    name: string,
    note: string,
    createdAt: string,
}

interface Restaurant {
    id: number,
    name: string,
    ownerName: string,
    address: string,
    image: string,
    rate: number,
    categories: {
        id: number,
        name: string
    }[],
    description: string,
    reviews: number,
    status: "cho_duyet" | "hoat_dong" | "dong_cua"
}

interface Food {
    id: number;
    restaurantName: string;
    category: string;
    name: string;
    note: string;
    price: number;
    image: string;
    sold: number;
    remaining: number | null;
    createdAt: string;
    rate: number;
}

interface Order {
    id: number;
    food: {
        idFood: number,
        foodName: string,
        image: string;
        quantity: number
    }[]
    price: number;
    quantity: number;
    orderedAt: string;
    status: "Completed" | "Canceled" | "Shipping",
    restaurantName: string,
    receivedAt: string
}

interface DetailOrder {
    id: number,
    foodName: string,
    price: number,
    quantity: number,
    receivedAt: string,
    image: string,
    status: "Completed" | "Canceled",
    category: string
}

interface CartItem {
    id: number,
    foodName: string,
    quantity: number,
    price: number,
    restaurantName: string;
}

interface Account {
    id: number,
    name: string,
    address: {
        type: string,
        location: string
    }[],
    phone: string,
    email: string,
    avatar: string,
    bio: string,
    currentAddress: {
        type: string,
        location: string
    },
}