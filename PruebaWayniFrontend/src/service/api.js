import axios from 'axios';

const API_URL = 'https://localhost:7255/api/Productos';

const productosService = {
  obtenerProductos: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error;
    }
  },

  crearProducto: async (nuevoProducto) => {
    try {
      const response = await axios.post(API_URL, nuevoProducto);
      return response.data;
    } catch (error) {
      console.error('Error al crear producto:', error);
      throw error;
    }
  },
  actualizarProducto: async (id, productoActualizado) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, productoActualizado);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      throw error;
    }
  },
  eliminarProducto: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      throw error;
    }
  },
};

export default productosService;