// hooks/useAddDishToCart.ts
import { useMutation } from 'react-query';
import { addDishToCart } from '@/services/cart';

export const useAddDishToCart = () => {
    return useMutation({
        mutationFn: ({ idDish, quantity }: { idDish: string; quantity: number }) =>
            addDishToCart(idDish, quantity),
    });
};