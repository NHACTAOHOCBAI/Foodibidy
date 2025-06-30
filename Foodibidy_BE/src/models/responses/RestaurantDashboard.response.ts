import { DishType } from '../schemas/dish.schema'
import { CategoryType } from '../schemas/category.schema'
import { RestaurantType } from '../schemas/restaurant.schema'

export interface RestaurantDashboardRes {
    // tổng doanh thu 
    totalRevenue: number
    // tổng số đơn hàng
    totalOrders: number
    // giá trị đơn hàng trung bình
    averageOrderValue: number
    // tổng số lượng món ăn đã bán 
    totalItemsSold: number
    // thu nhập từng ngày trong 5 ngày vừa qua
    revenueTrend: {
        date: string // ISO string
        revenue: number
    }[]
    // top 5 món ăn có số lượng bán nhiều nhất
    topItems: DishType[]
    // top 5 danh mục chiếm thu nhập nhiều nhất
    categoryRevenue: Array<Pick<CategoryType, 'name'> & { purchase: number }>
}
