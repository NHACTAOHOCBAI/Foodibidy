import { useContext } from "react"
import RestaurantDashboard from "../../components/dashboard/RestaurantDashboard"
import { MyProfileContext } from "../../context/MyProfileContext"
import AdminDashboard from "../../components/dashboard/AdminDashboard"

const Dashboard = () => {
    const { myProfile } = useContext(MyProfileContext)
    return (
        myProfile?.role === 'admin' ?
            <AdminDashboard />
            :
            <RestaurantDashboard />
    )
}
export default Dashboard