import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Input } from "react-bootstrap";
import DataTable from "react-data-table-component";
import React, { useState } from "react";
import mensajes from "../utilidades/Mensajes";
import { useNavigate } from "react-router";
import { Libros, ObtenerDatos, ModificarLibro } from "../hooks/Conexion";
import RegistrarLibro from "./RegistrarLibro";
import EditarLibro from "./EditarLibro";

const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);

export const PresentarLibros = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState([]);
  const navegation = useNavigate();
  const [llLibros, setLlLibros] = useState(false);
  const [llObtenerDatos, setLlObtenerDatos] = useState(false);
  const [searchValue, setSearchValue] = useState(""); //PARA LA BUSQUEDA POR ID
  const [idEditar, setSelectedId] = useState(null); //CONSTANTE PARA GUARDAR EL ID DEL LIBRO A EDITAR
  const handleSearchChange = (event) => {            //PARA LA BUSQUEDA POR ID
    setSearchValue(event.target.value);
  }; 

  const [show2, setShow2] = useState(false);
  const CloseModelEditar = () => setShow2(false);
  const handleeShow = () => setShow2(true);
  const EditarLibroId =  (id) => {
    setSelectedId(id);
    handleeShow();
    var datos = {
      "id": id,
      "title": data.title,
      "description": data.description,
      "pageCount": data.pageCount,
      "excerpt": data.excerpt,
      "publishDate": data.publishDate,
    };
    ModificarLibro(id, datos).then((info) => {
      if (info.error === true) {
        mensajes(info.message, "error", "Error");
      } else {
        mensajes(info.message);
      }
    });

  }; 

  if (!llLibros) {
    Libros().then((info) => {
      var aux = info;
      if (info.error == true) {
        mensajes(info.mensajes);
      } else {
        setData(aux);
      }
    });
    setLlLibros(true);
  }
  if (!(searchValue == "")) {
    if (!llObtenerDatos) {
      ObtenerDatos(searchValue).then((info) => {
        var aux = info;
        if (info.error == true) {
          mensajes(info.mensajes);
        } else {
          setData([aux]);
        }
      });
      setLlObtenerDatos(true);
    }
  }

  return (
    <div className="container">
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div className="row ">
          <div className="col-sm-3 mt-5 mb-4 text-gred">
            <div className="search">
              <form className="form-inline">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Buscar Librito"
                  aria-label="Search"
                  value={searchValue}
                  onChange={handleSearchChange}
                />
              </form>
            </div>
          </div>
          <div
            className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred"
            style={{ color: "black" }}
          >
            <h2>
              <b>Libros</b>
            </h2>
          </div>
          <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
            <Button variant="primary" onClick={handleShow}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-plus"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
              <span style={{ marginLeft: "5px" }}>Añadir Libro</span>
            </Button>
          </div>
        </div>
        <div className="row">
        <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Titulo</th>
                                <th>Descripcion</th>
                                <th>Numero de paginas</th>
                                <th>Extracto</th>
                                <th>Fecha de publicacion</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((data) => (
                                <tr key={data.id}>
                                    <td>{data.id}</td>
                                    <td>{data.title}</td>
                                    <td>{data.description}</td>
                                    <td>{data.pageCount}</td>
                                    <td>{data.excerpt}</td>
                                    <td>{data.publishDate}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '10px' }}>

                                            <Button variant="btn btn-outline-info btn-rounded" onClick={() => {
                                                handleeShow();
                                                setSelectedId(data.id);
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                </svg>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
          
        </div>

        {/* <!--- MODEL BOX REGISTRAR ---> */}
        <div className="model_box">
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Añadir Libro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <RegistrarLibro />
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        {/* <!--- MODEL BOX EDITAR ---> */}
        <div className="model_box">
          <Modal
            show={show2}
            onHide={CloseModelEditar}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Editar Libro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <EditarLibro nro={idEditar}></EditarLibro>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={CloseModelEditar}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default PresentarLibros;
