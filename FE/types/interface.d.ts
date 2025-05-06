interface category {
    image: string,
    id: number,
    name: string,
    note: string,
    createdAt: string,
}

interface restaurant {
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

}

interface Food {
    id: number;
    name: string;
    categories: string[];
    note: string;
    image: string;
    price: number;
    restaurantName: string;
    sold: number;
    remaining: number | null;
    createdAt: string;
}
