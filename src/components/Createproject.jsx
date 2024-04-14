import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import CreatableSelect from "react-select/creatable";
import { jwtDecode } from "jwt-decode";

const Createproject = () => {
  axios.interceptors.request.use((config) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  const decodificado = Cookies.get("accessToken");
  const userData = jwtDecode(decodificado);
  const [success, setSuccess] = useState(false);
  const Autor = userData.nombre + " " + userData.apellido;
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [formData, setFormData] = useState({
    Titulo: "",
    Descripcion: "",
    Archivo: null,
    Url: "",
    colaboradores: [],
    Autor: userData.nombre,
    carrera: userData.carreraId,
    facultad: userData.facultadId,
    fecha: null,
    fecha_proyecto: null, // Se agregará automáticamente
    comunidad: "Investigacion Semillero",
    cedula: "",
  });


  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setFormData({ ...formData, fecha: currentDate });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.includes("pdf")) {
      setFormData({ ...formData, Archivo: file });
    } else {
      alert(
        "El archivo seleccionado no es un archivo válido (debe ser .docx o .pdf)."
      );
    }
  };

  const handleColaboradoresChange = (selectedOptions) => {
    const colaboradores = selectedOptions.map((option) => option.value);
    const colaboradoresString = colaboradores.join(","); // Convierte el array a un string separado por comas
    setFormData({
      ...formData,
      colaboradores: colaboradores,
      colaboradoresString: colaboradoresString,
    });
  };

  const handleDescriptionChange = (event) => {
    // Limitar la descripción a 500 caracteres
    const description = event.target.value.slice(0, 1000);
    setFormData({ ...formData, Descripcion: description });
  };

  const handleTimepickerChange = (selectedDate) => {
    // Formatear la fecha como DD/MM/YYYY
    const formattedDate = selectedDate.format("DD-MM-YYYY");
    setFormData({ ...formData, fecha_proyecto: formattedDate });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const id_proyecto = `${formData.fecha}-${formData.Titulo}`;
    console.log(id_proyecto.toString());

    const data1 = {
      id_proyecto: `${formData.fecha}-${formData.Titulo}`,
      titulo: formData.Titulo,
      descripción: formData.Descripcion,
      autor: formData.Autor,
      Url: formData.Url,
      colaboradores: formData.colaboradoresString,
      fecha_radicado: formData.fecha.toString(),
      fecha_publicado: formData.fecha_proyecto.toString(),
      facultadId: 3, // Reemplaza con el ID de la Facultad relacionada
      carreraId: 5, // Reemplaza con el ID de la Carrera relacionada
      Comunidad: formData.comunidad, // Reemplaza con el ID de la Comunidad relacionada
      Autor: userData.nombre + " " + userData.apellido,
      cedulaUsuario: userData.cedula,
    };

    const dataarchivo = {
      proyectoId: id_proyecto,
      archivo: formData.Archivo,
    };

    try {
      const response1 = await axios.post(
        "https://upc-codex.tech:4000/api/v2/proyectos/",
        data1
      );

      const responsearchivo = await axios.post(
        "https://upc-codex.tech:4000/api/v2/archivos/",
        dataarchivo,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Establece el tipo de contenido en 'multipart/form-data'
          },
        }
      );

      setSuccess(true);

    } catch (error) {
      console.error("Error al enviar la solicitud de proyecto:", error);
      alert("Error al enviar la solicitud de proyecto:", error);
    } 
    
        finally {
      setButtonDisabled(false); // Habilita el botón después de que se completa la solicitud

    }

    if (success) {
      setTimeout(() => {
        setSuccess(false);
  
        setFormData({
          Titulo: "",
          Descripcion: "",
          Archivo: null,
          Url: "",
          colaboradores: [],
          Autor: userData.nombre,
          carrera: userData.carreraId,
          facultad: userData.facultadId,
          fecha: null,
          fecha_proyecto: null, // Se agregará automáticamente
          comunidad: "Investigacion Semillero",
          cedula: "",
        });
      }, 3000);
    }
  };

  return (
    <Fragment>
            {success && (
        <div className="alert alert-success absolute w-60 z-10  transition  ease-linear right-10 top-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Proyecto creado exitosamente</span>
        </div>
      )}
      <div className="flex-1 h-full p-4 flex items-center justify-center">
        <div className="rounded bg-white w-5/6  p-4 shadow-xl Tabs border-2">
          <a className="tab tab-lifted text-primary">Crear Proyecto</a>
          <div className="flex flex-col p-4 gap-2 items-center justify-center">
            <form
              id="proyecto"
              onSubmit={handleSubmit}
              className="grid grid-cols-2 place-content-center  gap-4 w-full"
            >
              <div className="mb-4 flex flex-col gap-2">
                <label className="text-gray-500 font-medium">
                  Título Proyecto *
                </label>
                <input
                  type="text"
                  name="Titulo"
                  required
                  value={formData.Titulo}
                  onChange={handleInputChange}
                  autoComplete="off"
                  className="w-full py-3 px-4 bg-white rounded-xl border-2 focus:border-primary"
                  placeholder="Título"
                />
              </div>

              <div className="mb-4 flex flex-col gap-2">
                <label className="text-gray-500 font-medium">
                  Tipo de publicación
                </label>
                <select
                  onChange={handleInputChange}
                  value={formData.comunidad}
                  name="comunidad"
                  className="select select-primary w-full "
                >
                  <option disabled selected>
                    Seleccione un tipo de publicacion
                  </option>
                  <option>Investigacion Semillero</option>
                  <option>Acervo Institucional</option>
                  <option>Trabajo de grado</option>
                  <option>Produccion Editorial</option>
                  <option>Publicacion academica</option>
                  <option>Revista Universitaria</option>
                </select>
              </div>
              <div className="mb-4 flex flex-col gap-2">
                <label className="text-gray-500 font-medium">
                  Direccion Url (Opcional)
                </label>
                <input
                  type="text"
                  name="Url"
                  value={formData.Url}
                  onChange={handleInputChange}
                  autoComplete="off"
                  className="w-full py-3 px-4 bg-white rounded-xl border-2 focus:border-primary"
                  placeholder="Url (Opcional)"
                />
              </div>

              <div className="mb-4 flex flex-col gap-2">
                <label className="text-gray-500 font-medium">
                  Archivo (PDF o DOCX) *
                </label>
                <input
                  type="file"
                  required
                  encType="multipart/form-data"
                  name="Archivo"
                  onChange={handleFileChange}
                  className="w-full py-1 px-2 border-2 rounded-lg border-gray-300"
                />
              </div>

              <div className="mb-4 flex flex-col gap-2">
                <label className="text-gray-500 font-medium">
                  Fecha de publicación
                </label>
                <input type="date" onChange={handleTimepickerChange(value)} />
              </div>

              <div className="mb-4 flex flex-col gap-2">
                <label className="text-gray-500 font-medium">
                  Colaboradores (Opcional)
                </label>
                <CreatableSelect
                  isMulti
                  isClearable
                  name="colaboradores"
                  options={formData.colaboradores.map((colaborador) => ({
                    label: colaborador,
                    value: colaborador,
                  }))}
                  onChange={handleColaboradoresChange}
                  defaultValue={
                    formData.colaboradores.length > 0
                      ? {
                          label: formData.colaboradores[0],
                          value: formData.colaboradores[0],
                        }
                      : null
                  }
                />
              </div>

              <div className="mb-4 col-span-2">
                <label className="text-gray-500 font-medium">
                  Descripción Proyecto (Máximo 1200 caracteres) *
                </label>
                <textarea
                  name="Descripcion"
                  value={formData.Descripcion}
                  onChange={handleDescriptionChange}
                  maxLength="1200"
                  required
                  className="w-full py-3 px-4 rounded-xl bg-white border-2 focus-border-primary resize-none h-40"
                  placeholder="Descripción"
                />
              </div>
            </form>

            <button
              form="proyecto"
              type="submit"
              className={`bg-primary text-white py-3 px-4 rounded-full ${isButtonDisabled && "opacity-50 cursor-not-allowed btn-disabled"}}`}
            >
              Crear proyecto
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Createproject;
