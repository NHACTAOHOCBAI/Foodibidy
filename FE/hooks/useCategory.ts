import { getCategory, getCategoryByRestaurant } from '@/services/category';
import { useQuery } from 'react-query';
export const useGetCatgory = (page?: number, limit?: number) => {
    return useQuery({
        queryKey: ["get categories"],
        queryFn: () => getCategory(page, limit),
    })
}
export const useGetCatgoryByRestaurant = (restaurantId: string, page?: number, limit?: number) => {
    return useQuery({
        queryKey: ["get categories by restaurant"],
        queryFn: () => getCategoryByRestaurant(restaurantId, page, limit),
    })
}