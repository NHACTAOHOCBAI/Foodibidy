import { Request, Response, NextFunction } from 'express'
import { RestaurantDashboardRes } from '~/models/responses/RestaurantDashboard.response'
import moment from 'moment'
import { Timestamp } from 'firebase-admin/firestore'
import databaseService from '~/services/database.service'
import { OrderDetailType } from '~/models/schemas/orderDetail.schema'
import { handleFormatDate } from '~/utils/utils'
import { doc } from 'firebase/firestore'
import { DashboardRes } from '~/models/responses/AdminDashboard.response'
import restaurantService from '~/services/restaurant.service'

export const getAdminDashboard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. Lấy dữ liệu
    const [restaurantSnap, userSnap, orderSnap, dishSnap, categorySnap] = await Promise.all([
      databaseService.restaurants.get(),
      databaseService.users.get(),
      databaseService.order_details.get(),
      databaseService.dishes.get(),
      databaseService.categories.get()
    ])

    const restaurants = restaurantSnap.docs.map((doc) => doc.data())
    const users = userSnap.docs.map((doc) => doc.data())
    const orders = orderSnap.docs.map((doc) => doc.data())
    const dishes = dishSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    const categories = categorySnap.docs.map((doc) => doc.data())

    const completedOrders = orders.filter((order) => order.status === 'delivered')

    // 2. Tính tổng doanh thu từng đơn hàng
    const orderRevenueList = await Promise.all(
      completedOrders.map(async (order) => {
        const total = await calculateOrderTotal(order)
        return { restaurantId: order.restaurant.id, total }
      })
    )

    // 3. Tính doanh thu từng nhà hàng
    const revenueMap: Record<string, number> = {}
    for (const entry of orderRevenueList) {
      if (entry.restaurantId) {
        revenueMap[entry.restaurantId] = (revenueMap[entry.restaurantId] || 0) + entry.total
      }
    }

    const restaurantRevenue = restaurants
      .map((r) => ({
        name: r.restaurantName,
        revenue: revenueMap[r.id ?? ''] || 0
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)
    // 4. Tính xu hướng đơn hàng 5 ngày
    const today = moment().startOf('day')
    const past5Days = [...Array(5)].map((_, i) => moment(today).subtract(4 - i, 'days'))
    const ordersTrend = past5Days.map((day) => {
      const nextDay = moment(day).add(1, 'days')
      const ordersInDay = orders.filter(
        (o) => moment(o.createdAt).isSameOrAfter(day) && moment(o.createdAt).isBefore(nextDay)
      )
      return {
        date: day.format('YYYY-MM-DD'),
        orders: ordersInDay.length
      }
    })

    // 5. Đánh giá trung bình hệ thống
    let totalRating = 0
    let totalReviewCount = 0
    dishes.forEach((dish) => {
      totalRating += dish.rating || 0
      totalReviewCount += 1
    })

    const averageRating = totalReviewCount > 0 ? +(totalRating / totalReviewCount).toFixed(1) : 0

    // 6. Top 5 món ăn bán chạy
    const topFoodItems = dishes.sort((a, b) => (b.soldQuantity || 0) - (a.soldQuantity || 0)).slice(0, 5)

    // 7. Trả kết quả
    const result: DashboardRes = {
      totalRestaurants: restaurants.length,
      totalAccounts: users.length,
      totalOrders: orders.length,
      totalFoodItems: dishes.length,
      totalCategories: categories.length,
      averageRating,
      ordersTrend,
      restaurantRevenue,
      topFoodItems
    }

    res.status(200).json(result)
  } catch (err) {
    console.error('Error fetching admin dashboard:', err)
    res.status(500).json({ message: 'Lỗi khi lấy dữ liệu dashboard quản trị viên' })
  }
}
export const getRestaurantDashboard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.uid
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const restaurantId = await restaurantService.getRestaurantByUserId(userId).then((res) => res?.id)

    if (!restaurantId) {
      return res.status(400).json({ message: 'Thiếu thông tin nhà hàng' })
    }

    // Lấy đơn hàng, món ăn, danh mục của nhà hàng hiện tại
    const [orderSnap, dishSnap, categorySnap] = await Promise.all([
      databaseService.order_details.where('restaurant.id', '==', restaurantId).get(),
      databaseService.dishes.where('restaurant.id', '==', restaurantId).get(),
      databaseService.categories.get() // danh mục thường là toàn hệ thống
    ])

    const orders = orderSnap.docs.map((doc) => doc.data() as OrderDetailType)
    const completedOrders = orders.filter((order) => order.status === 'delivered')
    const dishes = dishSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    const categories = categorySnap.docs.map((doc) => doc.data())

    // Tính tổng doanh thu
    const totalRevenue = (await Promise.all(completedOrders.map(calculateOrderTotal))).reduce((sum, v) => sum + v, 0)

    const totalOrders = orders.length
    const averageOrderValue = totalOrders > 0 ? +(totalRevenue / totalOrders).toFixed(1) : 0

    // Tổng sản phẩm đã bán
    const totalItemsSold = completedOrders.reduce(
      (sum, order) => sum + order.items.reduce((s, i) => s + i.quantity, 0),
      0
    )

    // Doanh thu theo ngày trong 5 ngày gần nhất
    const today = moment().startOf('day')
    const past5Days = [...Array(5)].map((_, i) => moment(today).subtract(4 - i, 'days'))

    const revenueTrend = await Promise.all(
      past5Days.map(async (day) => {
        const nextDay = moment(day).add(1, 'day')
        const ordersInDay = completedOrders.filter(
          (o) => moment(o.createdAt).isSameOrAfter(day) && moment(o.createdAt).isBefore(nextDay)
        )
        const total = (await Promise.all(ordersInDay.map(calculateOrderTotal))).reduce((sum, t) => sum + t, 0)

        return {
          date: day.format('YYYY-MM-DD'),
          revenue: total
        }
      })
    )

    // Top 5 món ăn bán chạy nhất
    const topItems = dishes.sort((a, b) => (b.soldQuantity || 0) - (a.soldQuantity || 0)).slice(0, 5)

    // Doanh thu theo danh mục
    const categoryMap: Record<string, number> = {}

    for (const order of completedOrders) {
      for (const item of order.items) {
        const dish = dishes.find((d) => d.id === item.dish.id)

        const catName = dish?.category.name || ''
        const priceSnap = await databaseService.dishes.doc(item.dish.id || '').get()
        const price = priceSnap.data()?.price || 0
        categoryMap[catName] = (categoryMap[catName] || 0) + price * item.quantity
      }
    }

    const categoryRevenue = Object.entries(categoryMap).map(([name, purchase]) => ({
      name,
      purchase
    }))

    // Trả kết quả
    const result: RestaurantDashboardRes = {
      totalRevenue,
      totalOrders,
      averageOrderValue,
      totalItemsSold,
      revenueTrend,
      topItems,
      categoryRevenue
    }

    res.status(200).json(result)
  } catch (error) {
    console.error('Error fetching restaurant dashboard:', error)
    res.status(500).json({ message: 'Lỗi khi lấy dữ liệu dashboard nhà hàng' })
  }
}
async function calculateOrderTotal(order: OrderDetailType): Promise<number> {
  const itemTotals = await Promise.all(
    order.items.map(async (item) => {
      const dishSnap = await databaseService.dishes.doc(item.dish.id || '').get()
      const price = dishSnap.data()?.price || 0
      return price * item.quantity
    })
  )
  return itemTotals.reduce((sum, v) => sum + v, 0)
}
