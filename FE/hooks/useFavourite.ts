import { useMutation, useQuery } from 'react-query';
import { addFavouriteFood, getMyFavouriteFood } from '@/services/favourite';

export const useAddMyFavourite = () => {
    return useMutation({
        mutationFn: ({ userId, dishId }: { userId: string, dishId: string }) =>
            addFavouriteFood(userId, dishId),
    });
};

export const useGetMyFavourite = (accountId: string, page?: number, limit?: number) => {
    return useQuery({
        queryKey: ["get my favourite", accountId, page, limit,],
        queryFn: () => getMyFavouriteFood(accountId, page, limit),
    })
}