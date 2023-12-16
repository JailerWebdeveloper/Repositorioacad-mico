import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Getcarreraname from "../shared/Getcarreraname";

const Projectview = ({ selectedproject }) => {
  const [archivos, setArchivos] = useState({});
  const [dowloadlink, setdowloadlink] = useState("");
  const [project, setProject] = useState({});

  const [isloading, setIsloading] = useState(true);
  //LLAMADO DEL PROYECTO POR ID
  useEffect(() => {
    axios
      .get(`http://srv435312.hstgr.cloud:4000/api/v2/proyectos/${selectedproject}`)
      .then((response) => {
        if (response.status === 200) {
          setProject(response.data);
          setIsloading(false);
        } else {
          console.error("La respuesta de la API no contiene datos válidos.");
        }
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, [selectedproject]);

  useEffect(() => {
    axios
      .get(`http://srv435312.hstgr.cloud:4000/api/v2/archivos/proyecto/${selectedproject}`)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setArchivos(response.data.data[0]);
          setdowloadlink(
            `http://srv435312.hstgr.cloud:4000/api/v2/archivos/proyecto/mostrar/${response.data.data[0].proyectoId}`
          );
        } else {
          console.error("La respuesta de la API no contiene datos válidos.");
        }
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, [selectedproject]);

  console.log(archivos);
  //METODO PARA DESCARGA DE ARCHIVO DE PROYECTO
  const handleDownloadFile = async (archivoId) => {
    try {
      const response = await axios.get(
        `http://srv435312.hstgr.cloud:4000/api/v2/archivos/proyecto/mostrar/${archivoId}`
      );
      const downloadLink = `http://srv435312.hstgr.cloud:4000/api/v2/archivos/proyecto/mostrar/${archivoId}`; // Utilizar 'kk' en la URL
      const link = document.createElement("a");
      link.href = downloadLink;
      link.setAttribute("target", "_blank");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
      console.error(error.response.data.message);
      console.error(error.response.status);
      console.error(error.response.headers);
    }
  };

  function getFileNameFromPath(filePath) {
    return filePath.split("/").pop();
  }

  const {
    fecha_publicado,
    titulo,
    carreraId,
    descripción,
    Autor,
    Comunidad,
    Url,
    colaboradores,
  } = project;

  return (
    <Fragment>
      {isloading ? (
        <p>loading...</p>
      ) : (
        <section className="text-gray-600 body-font p-5 border-2 h-full overflow-hidden">
          <div className="container break-all mx-auto">
            <div className="w-11/12 -py-6 items-center mx-auto flex flex-wrap">
              <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  Publicado en: {fecha_publicado}
                </h2>
                <h1 className="text-gray-900 text-xl title-font h-32 overflow-y-auto font-medium mb-4">
                  {titulo}
                </h1>
                <div className="flex mb-4">
                  <a className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">
                    Descripcion
                  </a>
                </div>
                <p className="p-2 break-all text-justify overflow-y-auto h-40 mb-4">
                  {descripción}
                </p>
                <div className="flex border-t border-gray-200 py-2">
                  <span className="text-gray-500">Categoria</span>
                  <span className="ml-auto text-gray-900">{Comunidad}</span>
                </div>
                <div className="flex border-t border-gray-200 py-2">
                  <span className="text-gray-500">Autor</span>
                  <span className="ml-auto text-gray-900">{Autor}</span>
                </div>
                {Url && (
                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">Url</span>
                    <span className="ml-auto text-gray-900">{Url}</span>
                  </div>
                )}
                {colaboradores && (
                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">Colaboradores</span>
                    <span className="ml-auto text-gray-900">
                      {colaboradores}
                    </span>
                  </div>
                )}

                <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                  <span className="text-gray-500">Programa</span>
                  <span className="ml-auto text-gray-900"><Getcarreraname id={carreraId}/></span>
                </div>
                <div className="flex justify-start">
                  <button
                    className="flex  text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                    onClick={() => handleDownloadFile(archivos.proyectoId)}
                  >
                    Descargar Archivo
                  </button>
                </div>
              </div>
              <div className="flex grow  justify-center">
                <iframe
                  title="PDF Viewer"
                  src={dowloadlink}
                  width="100%"
                  height="500px"
                  style={{ border: "none" }}
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default Projectview;
