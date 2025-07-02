import { useMutation, useQuery } from 'react-query';
import { addFavouriteFood, getMyFavouriteFood } from '@/services/favourite';

export const useAddMyFavourite = () => {
    return useMutation({
        mutationFn: ({ dishId }: { dishId: string }) =>
            addFavouriteFood(dishId),
    });
};

export const useGetMyFavourite = (page?: number, limit?: number) => {
    return useQuery({
        queryKey: ["get my favourite", page, limit,],
        queryFn: () => getMyFavouriteFood(page, limit),
    })
}