import Timepicker from "./TimePicker";
import React, { Fragment, useState,useEffect } from "react";
import "../App.css";
import {
  HiHome,
  HiArchive,
  HiUser,
  HiViewGridAdd,
  HiViewBoards,
  HiOutlineUser,
  HiOutlineNewspaper,
  HiOutlineCollection,
} from "react-icons/hi";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useFiltro } from '../Filtrocontext.jsx';


const Sidebar = ({ setPagina, pagina}) => {
  const { filtro, setFiltro } = useFiltro();
  const { filtroType, setFiltroType } = useFiltro();
  const { filtrofecha, setFiltrofecha } = useFiltro();
  const [user, setuser] = useState(false); // Inicializar el estado con null
  const [loggedIn, setLoggedIn] = useState(false);
  const bread = pagina;

   useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      setLoggedIn(true);
      
    }
    else {
      setLoggedIn(false);
    }
  }, [loggedIn]);

  useEffect(() => {
    // Actualizar el estado solo si userData no es null
  if(loggedIn == true) {
    setuser(true);
    axios.interceptors.request.use((config) => {
      const accessToken = Cookies.get("accessToken");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });
  
    const decodificado = Cookies.get("accessToken");
    const userData = jwtDecode(decodificado);
  
  
  } else {
    setuser(false);

  }  

  }, [loggedIn]); // Dependencia: userData

  return (
    <Fragment>
      <aside className="flex flex-col justify-between gap-8 bg-gray-100 pl-8 h-full w-80 p-4 overflow-y-auto static">
        <section>
          {/*breadcrumbs */}
          <div className="logo flex items-center gap-4 mb-8">
            <div className="text-sm breadcrumbs ">
              <ul>
                {bread === "DashboardS" ? (
                  <li className="flex gap-2">
                    <HiHome />
                    <a onClick={() => setPagina("DashboardS")}>Home/</a>
                  </li>
                ) : (
                  <Fragment>
                    <li className="flex gap-2">
                      <HiHome />
                      <a onClick={() => setPagina("DashboardS")}>Home/</a>
                    </li>
                    <li className="flex gap-2">
                      <HiArchive />
                      <a onClick={() => setPagina(bread)}>{bread}</a>
                    </li>
                  </Fragment>
                )}
              </ul>
            </div>
          </div>

          <ul className="mt-4 mb-8">
            {/* Todas las entradas */}
            <li>
              <button
                onClick={() => {
                  if (pagina !== "DashboardS") {
                    setPagina("DashboardS");
                  }
                }}
                className="flex items-center gap-4 p-2 hover:bg-gray-200 w-full ring-primary transition-colors rounded-lg"
              >
                <HiArchive className="text-xl text-primary" />
                <p>Todas las Entradas</p>
              </button>
            </li>
            {user && (
              <Fragment>
                <li>
                  <button
                    onClick={() => {
                      if (pagina !== "Menuuser") {
                        setPagina("Menuuser");
                      }
                    }}
                    className="flex items-center gap-4 p-2 hover:bg-gray-200 w-full ring-primary transition-colors rounded-lg"
                  >
                    <HiUser className="text-xl text-primary" />
                    <p>Mi perfil</p>
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => {
                      if (pagina !== "Createproject") {
                        setPagina("Createproject");
                      }
                    }}
                    className="flex items-center gap-4 p-2 hover:bg-gray-200 w-full ring-primary transition-colors rounded-lg"
                  >
                    <HiViewGridAdd className="text-xl text-primary" />
                    <p>Publicar nuevo proyecto</p>
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => {
                      if (pagina !== "Myprojectsview") {
                        setPagina("Myprojectsview");
                      }
                    }}
                    className="flex items-center gap-4 p-2 hover:bg-gray-200 w-full ring-primary transition-colors rounded-lg"
                  >
                    <HiViewBoards className="text-xl text-primary" />
                    <p>Mis publicaciones</p>
                  </button>
                </li>
              </Fragment>
            )}
          </ul>
          {/* Filtros */}
          <hr className="my-8" />
          <h5 className="uppercase font-semibold text-xs text-primary tracking-[2px] mb-4">
            Listas
          </h5>
          <ul>
            <li>
              <button
                onClick={() => {
                  setFiltroType("autor");
                }}
                className="flex items-center gap-4 p-2 hover:bg-gray-200 w-full ring-primary transition-colors rounded-lg"
              >
                <HiOutlineUser className="text-xl text-primary" />
                <p>Autores</p>
              </button>
            </li>
            <li>
              <button
                 onClick={() => {
                   setFiltroType("Titulo");
                  }}
                className="flex items-center gap-4 p-2 hover:bg-gray-200 w-full ring-primary transition-colors rounded-lg"
              >
                <HiOutlineNewspaper className="text-xl text-primary" />
                <p>Titulos</p>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setFiltroType("Facultad");
                }}
                className="flex items-center gap-4 p-2 hover:bg-gray-200 w-full ring-primary transition-colors rounded-lg"
              >
                <HiOutlineCollection className="text-xl text-primary" />
                <p>Facultad</p>
              </button>
            </li>
          </ul>
          <h5 className="uppercase font-semibold text-xs text-primary tracking-[2px] my-4">
            Filtros avanzados
          </h5>
          <ul>
            <li>
              <Timepicker />
            </li>
          </ul>
        </section>
      </aside>
    </Fragment>
  );
};

export default Sidebar;
