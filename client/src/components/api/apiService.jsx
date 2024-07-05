// apiService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: BASE_URL,
});

const apiService = {
  fetchProducts: async () => {
    try {
      const response = await api.get('/productlist/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
  checkCartItem: async (userId, cartitemId) => {
    try {
      const response = await api.get(`/cart/cartlist`, {
        params: { userId, cartitemId }
      });
      return response.data;
    } catch (error) {
      console.error('Error checking cart item:', error);
      throw error;
    }
  },
  addCartItem: async (orderData) => {
    try {
      const response = await api.post('/cart/addcart', orderData);
      return response.data;
    } catch (error) {
      console.error('Error adding cart item:', error.response ? error.response.data : error);
      throw error;
    }
  },
  // Other API methods...
};

export default apiService;
