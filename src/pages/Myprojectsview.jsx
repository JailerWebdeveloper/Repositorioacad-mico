import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import { HiArchive } from "react-icons/hi";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import CardObject from "../shared/CardObject";

const Myprojectsview = ({ setSelectedproject, setcomponent }) => {
  axios.interceptors.request.use((config) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  const decodificado = Cookies.get("accessToken");
  const userData = jwtDecode(decodificado);
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de la pantalla de carga
  useEffect(() => {
    axios
      .get(
        `https://upc-codex.tech:4000/api/v2/proyectos/cedula/${userData.cedula}`
      )
      .then((response) => {
        console.log(response.data)
        if (response.status === 200) {
          setProyectos(response.data);
        } else {
          console.error("La respuesta de la API no contiene datos válidos.");
        }
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
        if (error.response) {
          // El servidor respondió con un código de estado diferente de 2xx
          console.error("Código de estado:", error.response.status);
          console.error("Datos de respuesta:", error.response.data);
        } else if (error.request) {
          // La solicitud fue hecha pero no se recibió respuesta
          console.error("No se recibió respuesta del servidor");
        } else {
          // Algo sucedió en la configuración de la solicitud que provocó un error
          console.error(
            "Error de configuración de la solicitud:",
            error.message
          );
        }
      })

      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Fragment>
      {loading ? ( // Si loading es true, muestra la pantalla de carga
        <div className="flex w-full h-screen justify-center items-center">
          <div className="spinner border-t-4 border-primary h-12 w-12 rounded-full"></div>
        </div>
      ) : (
        <div className="w-full p-4 flex h-full overflow-y-auto justify-center">
          {proyectos.length === 0 ? (
            <div className="flex w-4/5 h-60 justify-center items-center">
              <div className="w-full h-full bg-gray-300 rounded border-2 border-gray-400 border-dashed">
                <div className="flex justify-center flex-col h-full gap-4 bg-gray-400 items-center">
                  <HiArchive className="text-6xl text-white" />
                  <h1 className="text-white text-2xl font-bold">
                    No hay proyectos
                  </h1>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 w-full p-10 bg-gray-200 rounded-lg gap-4">
            {proyectos.map((proyecto) => (
              <React.Fragment key={proyecto.proyectoId}>
                <div>
                  <CardObject
                    item={proyecto}
                    setSelectedproject={setSelectedproject}
                    setPagina={setcomponent}
                  />
                </div>
              </React.Fragment>
            ))}
          </div>
          )}

         
        </div>
      )}
    </Fragment>
  );
};

export default Myprojectsview;
