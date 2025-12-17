import axios from "axios";


const API_BASE_URL = "http://192.168.1.12:5080/api";


export const getProducts = () => axios.get(`${API_BASE_URL}/products`);
export const saveProduct = (product) =>
  axios.post(`${API_BASE_URL}/products`, product);
export const getProductById = (id) =>
  axios.get(`${API_BASE_URL}/products/${id}`);
export const updateProduct = (id, product) =>
  axios.put(`${API_BASE_URL}/products/${id}`, product); 
export const deleteProduct = (id) =>
  axios.delete(`${API_BASE_URL}/products/${id}`);
export const searchProducts = (query) =>
  axios.get(`${API_BASE_URL}/products?barcode=${query}`); 
