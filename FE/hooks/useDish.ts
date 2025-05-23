import { getDish } from '@/services/dish'
import { useQuery } from 'react-query'

export const useGetDish = (page?: number, limit?: number) => {
    return useQuery({
        queryKey: ["get dishes", page, limit],
        queryFn: () => getDish(page, limit),
    })
}
