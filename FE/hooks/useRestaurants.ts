import { getAllRestaurant } from "@/services/restaurant"
import { useQuery } from 'react-query';
export const useGetAllRestaurants = () => {
    return useQuery({
        queryKey: ["get all restaurants"],
        queryFn: getAllRestaurant,
    })
}