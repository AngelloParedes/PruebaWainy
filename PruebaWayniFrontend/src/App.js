import React, { useState, useEffect } from "react";
import ListarProductos from "./components/Productos";
import productosService from "./service/api";
import "./App.css";

function App() {
  const [productos, setProductos] = useState([]);

  const fetchProductos = async () => {
    try {
      const data = await productosService.obtenerProductos();
      setProductos(data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleProductoEliminado = async () => {
    await fetchProductos();
  };

  return (
    <div className="App">
      <ListarProductos productos={productos} onProductoEliminado={handleProductoEliminado} />
    </div>
  );
}

export default App;
