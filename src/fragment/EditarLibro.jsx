import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ModificarLibro, ObtenerDatos } from "../hooks/Conexion";
import Footer from "./Footer";
import mensajes from "../utilidades/Mensajes";
import { useForm } from "react-hook-form";

function EditarLibro(n) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const [validated, setValidated] = useState(false);
  const navegation = useNavigate();
  const [llObtenerDatos, setLlObtenerDatos] = useState(false);

  const onSubmit = (data) => {
    var datos = {
      "id": n.nro,
      "title": data.title,
      "description": data.description,
      "pageCount": data.pageCount,
      "excerpt": data.excerpt,
      "publishDate": data.publishDate,
    };
    console.log(datos);
    ModificarLibro(n.nro, datos).then((info) => {
      if (info.error === true) {
        mensajes(info.message, "error", "Error");
      } else {
        mensajes(info.message);
        navegation("/Libritos");
      }
    });
  };


  return (
    <div className="wrapper">
      <div className="d-flex flex-column">
        <div className="content">
          <div className="container-fluid">
            <div className="col-lg-10">
              <div className="p-5">
                <form className="user" onSubmit={handleSubmit(onSubmit)}>
                  
                  {/** INGRESAR EL TÍTULO */}
                  <div className="form-group">
                    <input
                      type="text"
                      {...register("title", { required: true })}
                      className="form-control form-control-user"
                      placeholder="Título"
                    />
                    {errors.title && errors.title.type === "required" && (
                      <div className="alert alert-danger">
                        Ingrese el título
                      </div>
                    )}
                  </div>

                  {/** INGRESAR DESCRIPCIÓN*/}
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      placeholder="Descripción"
                      {...register("description", { required: true })}
                    />
                    {errors.description && errors.description.type === "required" && (
                      <div className="alert alert-danger">
                        Ingrese la Descripción
                      </div>
                    )}
                  </div>
                  {/** INGRESAR NRO DE PÁGINAS*/}
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      placeholder="Nro. Páginas"
                      {...register("pageCount", { required: true })}
                    />
                    {errors.pageCount &&
                      errors.pageCount.type === "required" && (
                        <div className="alert alert-danger">
                          Ingresar el número de páginas
                        </div>
                      )}
                  </div>
                  {/** INGRESAR RESUMEN*/}
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      placeholder="Resumen"
                      {...register("excerpt", { required: true })}
                    />
                    {errors.excerpt && errors.excerpt.type === "required" && (
                      <div className="alert alert-danger">
                        Ingrese un breve resumen
                      </div>
                    )}
                  </div>
                  {/** INGRESAR FECHA DE PUBLICACIÓN */}
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control form-control-user"
                      placeholder="Ingrese la fecha de publicación"
                      {...register("publishDate", { required: true })}
                    />
                    {errors.publishDate && errors.publishDate.type === "required" && (
                      <div className="alert alert-danger">
                        Ingrese la fecha de publicación
                      </div>
                    )}
                  </div>

                  <hr />

                  {/** BOTÓN CANCELAR */}
                  <div style={{ display: "flex", gap: "10px" }}>
                    <a href="/Libritos" className="btn btn-danger btn-rounded">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-x-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                      <span style={{ marginLeft: "5px" }}>Cancelar</span>
                    </a>

                    {/** BOTÓN EDITAR*/}
                    <input
                      className="btn btn-success btn-rounded"
                      type="submit"
                      value="Editar"
                    ></input>
                  </div>
                </form>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditarLibro;
