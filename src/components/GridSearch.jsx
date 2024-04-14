import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import CardObject from "../shared/CardObject";
import { useFiltro } from '../Filtrocontext.jsx';


const GridSearch = ({ setSelectedproject, selectedproject, setPagina,filtro,setfiltro,filtropor,setfiltropor}) => {
  const { filtroType, setFiltroType } = useFiltro();
  const { filtrofecha, setFiltrofecha } = useFiltro();
  const [search, setSearch] = useState("");
  const [Proyectos, setProyectos] = useState([]);

  useEffect(() => {
    axios
      .get("https://upc-codex.tech:4000/api/v2/proyectos/")
      .then((response) => {
        setProyectos(response.data.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  useEffect(() => {
    setSelectedproject("");
  }, [Proyectos]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleFilterChange = (event) => {
    setfiltro(event.target.value);
  };
  const filteredProjects = Proyectos.filter((proyecto) => {
    const tituloMatch = proyecto.titulo
      .toLowerCase()
      .startsWith(search.toLowerCase());

    const filtroMatch = filtro
      ? proyecto.Comunidad === filtro
      : true;

      if (filtrofecha && filtrofecha.length >= 2) {
        const fechainicial = new Date(filtrofecha[0]);
        const fechafinal = new Date(filtrofecha[1]);
        
        // Ajustar la hora a 00:00:00 para ignorar la hora en la comparación
        fechainicial.setUTCHours(0, 0, 0, 0);
        fechafinal.setUTCHours(23, 59, 59, 999);
  
        const fechaPublicacion = new Date(proyecto.fecha_publicado);
        fechaPublicacion.setUTCHours(0, 0, 0, 0);
        const F=fechaPublicacion >= fechainicial && fechaPublicacion <= fechafinal;
        

        return tituloMatch && filtroMatch && F;
      }
      

      if (filtro === "Todos") {
        return tituloMatch; 
      }
    return tituloMatch && filtroMatch ; 
  });

  return (
    <Fragment>
      {/* Contenido */}
      <div className=" flex-1 p-4 overflow-y-auto h-full">
        <div className=" text-center">
          <h1 className="text-primary text-4xl font-bold ">Buscar</h1>
          <p className="text-gray-600 mt-1">Mostrar items 1-10 de #</p>
        </div>
        {/* barra de busqueda */}
        <div className="flex gap-2">
          <div className="join w-full flex justify-center mt-10">
            <input
              className="input input-bordered input-primary join-item w-4/5"
              placeholder="Search"
              type="text"
              value={search}
              onChange={handleSearchChange}
            />

            <select
              onChange={handleFilterChange}
              value={filtro}
              className="select select-bordered w-44 join-item"
            >
              <option disabled selected>
                Filter
              </option>
                  <option>Todos</option>
                  <option>Acervo Institucional</option>
                  <option>Investigacion Semillero</option>
                  <option>Trabajo de grado</option>
                  <option>Produccion Editorial</option>
                  <option>Publicacion academica</option>
                  <option>Revista Universitaria</option>
            </select>
            <button className="btn btn-primary join-item">Search</button>
          </div>
        </div>
        {/* Tabla */}
        <div className="grid grid-flow-cols place-content-center place-items-center p-4 overflow-hidden gap-4 mt-5">
          {filteredProjects.map((item) => (
            <React.Fragment key={item.id_proyecto}>
              <CardObject
                item={item}
                setSelectedproject={setSelectedproject}
                selectedproject={selectedproject}
                setPagina={setPagina}
              />
            </React.Fragment>
          ))}
          { filteredProjects.length === 0 && (
              <div className=" w-full flex justify-center items-center">
              <h1 className="text-2xl text-center font-bold text-gray-400">
                No se encontraron resultados
              </h1>
            </div>
          )}

        </div>
      </div>
    </Fragment>
  );
};

export default GridSearch;
