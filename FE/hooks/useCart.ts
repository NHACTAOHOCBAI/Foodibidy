// hooks/useAddDishToCart.ts
import { useMutation } from 'react-query';
import { addDishToCart } from '@/services/cart';

export const useAddDishToCart = () => {
    return useMutation({
        mutationFn: ({ idCart, idDish, quantity }: { idCart: string; idDish: string; quantity: number }) =>
            addDishToCart(idCart, idDish, quantity),
    });
};