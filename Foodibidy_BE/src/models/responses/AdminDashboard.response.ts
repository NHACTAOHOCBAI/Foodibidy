import { DishType } from '../schemas/dish.schema'
import { UserType } from '../schemas/user.schema'
import { RestaurantType } from '../schemas/restaurant.schema'
import { CategoryType } from '../schemas/category.schema'

export interface DashboardRes {
    // tổng số nhà hàng
    totalRestaurants: number
    // tổng số khách hàng toàn hệ thống
    totalAccounts: number
    // tổng số đơn hàng toàn hệ thống
    totalOrders: number
    // tổng số món ăn toàn hệ thống
    totalFoodItems: number
    // tổng số danh mục toàn hệ thống
    totalCategories: number
    // tổng số đánh giá toan hệ thống
    averageRating: number
    // số lượng order trong 5 ngày trước thời điểm hiện tại 
    ordersTrend: {
        date: string
        orders: number
    }[]
    // top 5 nhà hàng doanh thu cao nhat
    restaurantRevenue: {
        name: string
        revenue: number
    }[]
    // top 5 món ăn số lượng bán nhiều nhất 
    topFoodItems: DishType[]

}
