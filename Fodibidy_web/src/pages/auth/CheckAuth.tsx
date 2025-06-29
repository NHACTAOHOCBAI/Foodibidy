import { Button, Result } from "antd"
import { useContext } from "react"
import { Outlet } from "react-router"
import { MyProfileContext } from "../../context/MyProfileContext"

const CheckAuth = ({ endpoint }: { endpoint: string }) => {
    const { myProfile } = useContext(MyProfileContext)
    if (myProfile) {
        // if (myProfile.role === "admin" || endpoint === "foods" || endpoint === "orders")
        return <Outlet />
    }
    return (
        <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button type="primary">Back Home</Button>}
        />
    )
}
export default CheckAuth