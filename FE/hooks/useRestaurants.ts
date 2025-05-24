
import { getRestaurant } from '@/services/restaurant';
import { useQuery } from 'react-query';
export const useGetRestaurant = (page?: number, limit?: number) => {
    return useQuery({
        queryKey: ["get restaurant"],
        queryFn: () => getRestaurant(page, limit),
    })
}