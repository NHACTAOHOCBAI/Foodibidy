// hooks/useAddDishToCart.ts
import { useMutation } from 'react-query';
import { addDishToCart } from '@/services/cart';

export const useAddDishToCart = () => {
    return useMutation({
        mutationFn: ({ idAccount, idDish, quantity }: { idAccount: string; idDish: string; quantity: number }) =>
            addDishToCart(idAccount, idDish, quantity),
    });
};