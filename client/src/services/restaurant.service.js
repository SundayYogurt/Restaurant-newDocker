import api from "./api";
const RESTAU_API = import.meta.env.VITE_RESTAU_API;

// get all restaurants
const getAllRestaurants = async () => {
  return await api.get(RESTAU_API);
};

// get restaurant by Id
const getRestaurantById = async (id) => {
  return await api.get(`${RESTAU_API}/${id}`);
};

// update restaurant by Id
const editRestaurantById = async (id, data) => {
  return await api.put(`${RESTAU_API}/${id}`, data);
};

// add restaurant
const insertRestaurant = async (data) => {
  return await api.post(RESTAU_API, data);
};

// delete restaurant by Id
const deleteRestaurant = async (id) => {
  return await api.delete(`${RESTAU_API}/${id}`);
};

const RestaurantService = {
  getAllRestaurants,
  getRestaurantById,
  editRestaurantById,
  deleteRestaurant,
  insertRestaurant
};

export default RestaurantService;
