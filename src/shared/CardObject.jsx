import React, { Fragment } from "react";
import { HiClipboardList } from "react-icons/hi";
import logo2 from "../assets/logo2.png";
const CardObject = ({item,setSelectedproject,setPagina}) => {

  const { titulo, descripción, Autor, fecha_publicado, id_proyecto,Comunidad } = item


  const handleSelectProject = () => {
    setSelectedproject(id_proyecto);
    setPagina("Projectview");
  };

  return (
    <Fragment>
      <div   className="card w-full bg-base-100 hover:ring ring-primary transition-all duration-100 border-4">
        <div className="card-body break-all">
          <h2 className="card-title capitalize text-lg">{titulo}</h2>
          <p className="text-gray-700 text-justify break-all text-sm">{descripción}</p>
          <div className="card-actions justify-between flex items-center mt-4 ">
            <div className="grid grid-cols-3 rounded-lg p-2 gap-1">
            <div className="  break-words  text-xs "><p className="text-xs text-gray-600">Publicado: </p>{fecha_publicado}</div> 
            <div className="   break-words text-xs"><p className="text-xs text-gray-600">Autor: </p>{Autor}</div> 
            <div className="   break-words text-xs"><p className="text-xs text-gray-600">Categoria: </p>{Comunidad}</div> 
             </div>
            <button onClick={handleSelectProject} className="btn btn-primary btn-sm">leer</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CardObject;
