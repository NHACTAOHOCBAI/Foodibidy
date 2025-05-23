import { getCategory } from '@/services/category';
import { useQuery } from 'react-query';
export const useGetCatgory = (page?: number, limit?: number) => {
    return useQuery({
        queryKey: ["get categories"],
        queryFn: () => getCategory(page, limit),
    })
}