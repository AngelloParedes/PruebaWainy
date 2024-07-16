import React, { useState, useEffect } from "react";
import productosService from "../service/api";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [nombreAgregar, setNombreAgregar] = useState("");
  const [precioAgregar, setPrecioAgregar] = useState("");
  const [nombreEditar, setNombreEditar] = useState("");
  const [precioEditar, setPrecioEditar] = useState(""); // Inicializado como un string vacío ""
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [erroreditar, setErrorEditar] = useState("");
  const [successeditar, setSuccessEditar] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const mostrarMensajeExito = (mensaje) => {
    setSuccess(mensaje);
    setTimeout(() => {
      setSuccess("");
    }, 4000);
  };
  const mostrarMensajeError = (mensaje) => {
    setError(mensaje);
    setTimeout(() => {
      setError("");
    }, 4000);
  };
  const mostrarMensajeExitoEditar = (mensaje) => {
    setSuccessEditar(mensaje);
    setTimeout(() => {
      setSuccessEditar("");
    }, 4000);
  };
  const mostrarMensajeErrorEditar = (mensaje) => {
    setErrorEditar(mensaje);
    setTimeout(() => {
      setErrorEditar("");
    }, 4000);
  };

  const cargarProductos = async () => {
    try {
      const data = await productosService.obtenerProductos();
      setProductos(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  const handleEliminarProducto = async (id) => {
    try {
      await productosService.eliminarProducto(id);
      cargarProductos();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const handleAgregarProducto = async () => {
    if (!nombreAgregar.trim() || !precioAgregar.trim()) {
      mostrarMensajeError("Nombre y precio son campos obligatorios.");
      return;
    }
    if (parseFloat(precioAgregar) <= 0) {
      mostrarMensajeError("El precio debe ser mayor a 0.");
      return;
    }

    const nuevoProducto = {
      nombre: nombreAgregar.trim(),
      precio: parseFloat(precioAgregar),
    };
    try {
      await productosService.crearProducto(nuevoProducto);
      cargarProductos();
      setNombreAgregar("");
      setPrecioAgregar("");
      mostrarMensajeExito("Producto agregado exitosamente");
    } catch (error) {
      console.error("Error al crear producto:", error);
    }
  };

  const handleEditarProducto = (producto) => {
    setProductoSeleccionado(producto);
    setNombreEditar(producto.nombre);
    setPrecioEditar(producto.precio.toString());
  };

  const handleGuardarCambios = async () => {
    if (!nombreEditar.trim() || !precioEditar.trim()) {
      mostrarMensajeErrorEditar("Nombre y precio son campos obligatorios.");
      return;
    }
    if (parseFloat(precioEditar) <= 0) {
      mostrarMensajeErrorEditar("El precio debe ser mayor a 0.");
      return;
    }

    const productoActualizado = {
      ...productoSeleccionado,
      nombre: nombreEditar.trim(),
      precio: parseFloat(precioEditar),
    };
    try {
      await productosService.actualizarProducto(
        productoActualizado.id,
        productoActualizado
      );
      cargarProductos();
      mostrarMensajeExitoEditar("Producto editado exitosamente");
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center my-3">Prueba Wayni</h1>
      <p>Agregar Productos</p>
      <div className="row">
        <div className="col-lg-4">
          <div className="mb-3">
            <input
              placeholder="Nombre del Producto"
              type="text"
              className="form-control"
              id="nombreAgregar"
              value={nombreAgregar}
              onChange={(e) => setNombreAgregar(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="mb-3">
            <input
              placeholder="Precio del Producto"
              type="number"
              className="form-control"
              id="precioAgregar"
              value={precioAgregar}
              onChange={(e) => setPrecioAgregar(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-4 d-flex align-items-center">
          <button
            className="btn btn-primary mb-3"
            onClick={handleAgregarProducto}
          >
            Agregar Producto
          </button>
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <table className="table">
        <thead>
          <tr>
            <th scope="col" className="col-lg-1">Id</th>
            <th scope="col" className="col-lg-6">Nombre</th>
            <th scope="col" className="col-lg-1">Precio</th>
            <th scope="col" className="col-lg-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr>
              <th>{producto.id}</th>
              <td>{producto.nombre}</td>
              <td>S/. {producto.precio}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary mx-3"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => handleEditarProducto(producto)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleEliminarProducto(producto.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Editar Producto
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setProductoSeleccionado(null)}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="nombreEditar" className="form-label">
                  Nombre del Producto:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombreEditar"
                  value={nombreEditar}
                  onChange={(e) => setNombreEditar(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="precioEditar" className="form-label">
                  Precio del Producto:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="precioEditar"
                  value={precioEditar}
                  onChange={(e) => setPrecioEditar(e.target.value)}
                />
              </div>
              {erroreditar && <div className="alert alert-danger">{erroreditar}</div>}
              {successeditar && <div className="alert alert-success">{successeditar}</div>}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setProductoSeleccionado(null)}
              >
                Cerrar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleGuardarCambios}
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Productos;
