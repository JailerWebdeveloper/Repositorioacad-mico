import React from "react";
import { Fragment } from "react";
import {HiAnnotation, HiIdentification, HiDocumentAdd ,HiBriefcase} from "react-icons/hi";
const Menuuser = ({setPagina}) => {
  return (
    <Fragment>
      <div className="flex-1 h-full  flex  flex-col items-center p-4 ">
        <div className="rounded bg-white w-5/6 h-5/6 p-5 shadow-xl tabs border-2 ">
    
          <div className="grid grid-cols-2 grid-rows-2 gap-4 place-items-center place-content-center w-full h-full">
            <div className="w-4/5 h-4/5 flex items-center justify-center">
              <button onClick={() => setPagina("Myprojectsview")}  className="btn btn-base hover:btn-primary  flex flex-col gap-4  shadow-xl hover:-translate-y-4 w-full h-full font-bold py-2 px-4 rounded">
                <HiBriefcase className="text-4xl"/>
                <p>Mis proyectos</p>
              </button>
            </div>
            <div className="w-4/5 h-4/5 flex items-center justify-center">
              <button onClick={() => setPagina("Createproject")} className="btn btn-base hover:btn-primary shadow-xl   flex flex-col gap-4  hover:-translate-y-4 w-full h-full font-bold py-2 px-4 rounded">
                <HiDocumentAdd className="text-4xl"/>
                <p>Crear Proyecto</p>
              </button>
            </div>
            <div className="w-4/5 h-4/5 flex items-center justify-center">
              <button onClick={() => setPagina("Userview")}  className="btn btn-base hover:btn-primary   flex flex-col gap-4 shadow-xl hover:-translate-y-4 w-full h-full font-bold py-2 px-4 rounded">
                <HiIdentification className="text-4xl"/>
               <p>Mi perfil</p> 
              </button>
            </div>
            <div className="w-4/5 h-4/5 flex items-center justify-center">
              <button onClick={() => setPagina("Inbox")}  className="btn btn-base hover:btn-primary shadow-xl  flex flex-col gap-4 hover:-translate-y-4 w-full h-full font-bold py-2 px-4 rounded">
                <HiAnnotation className="text-4xl"/>
                <p>Bandeja de Entrada</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Menuuser;
