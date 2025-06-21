import { getAllCategories } from "../services/category"

const categoryOptions = async () => {
    const res = await getAllCategories()
    const options = res.map((record) => {
        return ({
            value: record.id,
            label: record.name
        })
    })
    return options
}

export { categoryOptions }