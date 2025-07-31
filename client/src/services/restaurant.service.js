import api from "./api"
const RESTAU_API = import.meta.env.VITE_RESTAU_API;

//get all restaurant
const getAllRestaurants = async () => {
    return await api.get(RESTAU_API)
}

//get restaurant by Id
const getRestaurantById = async (id) => {
    return await api.get(`${RESTAU_API}/${id}`)
}

//update restaurant by Id
const editRestaurantById = async (id) => {
    return await api.put(`${RESTAU_API}/${id}`)
}
//add restaurant 
const insertRestaurant = async () => {
    return await api.post(RESTAU_API)
}

//delete restaurants
const deleteRestaurant = async () => {
    return await api.delete(RESTAU_API)
}

const RestaurantService = {
    getAllRestaurants,
    getRestaurantById,
    editRestaurantById,
    deleteRestaurant,
    insertRestaurant
}

export default RestaurantService