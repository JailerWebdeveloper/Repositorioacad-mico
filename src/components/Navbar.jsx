import UPCBANNER from "../assets/UPCBANNER.png";
import React, { Fragment, useState, useEffect } from "react";
import logo from "../assets/logo.png";
import sistemaslogo from "../assets/sistemaslogo.jpeg";
import { HiLogout, HiLogin, HiKey } from "react-icons/hi";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importar useNavigate de React Router
import { useFiltro } from '../Filtrocontext.jsx';


const Navbar = ({ setPagina, pagina }) => {
  const { filtro, setFiltro } = useFiltro();
  const navigate = useNavigate(); // Obtener la función de navegación
  const [user, setuser] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn === true) {
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
  }, [loggedIn]);

  const handlesetfiltro = (event) => {
    const filtronuevo = event.target.innerText;
    setFiltro(filtronuevo);
    navigate("/Search"); // Navegar a la ruta /dashboard
    setPagina("DashboardS")
  };
  

  return (
    <Fragment>
      <header className=" px-4 py-6 flex items-center justify-around  z-20  w-full bg-white">
        <a href="/" className="font-bold text-white text-xl">
          <img src={UPCBANNER} alt="" className="h-10 w-15 " />
        </a>
        <div className=" flex items-center  justify-end">
          <ul className="flex items-centers  justify-center font-semibold">
            {/*MEGAMENU 1*/}
            <li className="relative group px-3 py-2">
              <button>Sitios web</button>
              <div className="absolute cursor-pointer top-0 -left-48 transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 min-w-[560px] transform">
                <div className="relative top-6 p-6 bg-white rounded-xl shadow-xl w-full">
                  <div className="w-10 h-10 bg-white transform rotate-45 absolute top-0 z-0 translate-x-0 transition-transform group-hover:translate-x-[12rem] duration-500 ease-in-out rounded-sm"></div>
                  <div className="relative z-10">
                    {/*MEGAMENU DIV PRINCIPAL*/}
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <p className="uppercase tracking-wider text-gray-500  font-medium text-[13px]">
                          Sitios web oficiales
                        </p>
                        <ul className="mt-3 text-[15px]">
                          <li>
                            <a
                              href="https://www.unicesar.edu.co/"
                              target="_blank"
                              className="flex gap-2 items-center p-2 -mx-2 rounded-lg hover:bg-gradient-to-br hover:from-indigo-50 hover:to-pink-50 hover:via-green-50 transition ease-in-out duration-300 text-gray-800 font-semibold hover:text-primary"
                            >
                              <img
                                className="mask mask-squircle h-10 w-10 bg-gray-100"
                                src={logo}
                              />
                              <div>
                                Universidad poupular del cesar
                                <p className="text-gray-500 font-normal">
                                  Pagina principal
                                </p>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://sistemas.unicesar.edu.co/index.php/es/"
                              target="_blank"
                              className="flex gap-2 items-center p-2 -mx-2 rounded-lg hover:bg-gradient-to-br hover:from-indigo-50 hover:to-pink-50 hover:via-green-50 transition ease-in-out duration-300 text-gray-800 font-semibold hover:text-primary"
                            >
                              <img
                                className="mask mask-squircle h-10 w-10 bg-gray-100"
                                src={sistemaslogo}
                              />
                              <div>
                                Sistemas unicesar
                                <p className="text-gray-500 font-normal">
                                  Pagina Ingenieria de sistemas
                                </p>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://aulaweb.unicesar.edu.co/"
                              target="_blank"
                              className="flex gap-2 items-center p-2 -mx-2 rounded-lg hover:bg-gradient-to-br hover:from-indigo-50 hover:to-pink-50 hover:via-green-50 transition ease-in-out duration-300 text-gray-800 font-semibold hover:text-primary"
                            >
                              <img
                                className="mask mask-squircle h-10 w-10 bg-gray-100"
                                src={logo}
                              />
                              <div>
                                Aulaweb
                                <p className="text-gray-500 font-normal">
                                  Portal universitario
                                </p>
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            {/*MEGAMENU 2*/}
            <li className="relative group px-3 py-2">
              <button className="hover:opacity-50 cursor-default">
                Comunidades
              </button>
              {/*MEGAMENU 2 DIV PRINCIPAL*/}
              <div className="absolute top-0 cursor-pointer -left-2 transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 min-w-[260px] transform">
                <div className="relative top-6 p-6 bg-white rounded-xl shadow-xl w-full">
                  <div className="w-10 h-10 bg-white transform rotate-45 absolute top-0 z-0 -translate-x-4 transition-transform group-hover:translate-x-3 duration-500 ease-in-out rounded-sm"></div>
                  <div className="relative z-10">
                    <p className="uppercase tracking-wider text-gray-500 font-medium text-[13px]">
                      Comunidades
                    </p>
                    <ul className="mt-3 grid grid-cols-2 grid-rows-3 text-[15px]">
                      <li>
                        <a
                          onClick={handlesetfiltro}
                          className="bg-transparent bg-clip-text text-gray-500 transition-colors hover:text-primary font-semibold py-1 block"
                        >
                          Acervo Institucional
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={handlesetfiltro}
                          className="bg-transparent bg-clip-text text-gray-500 transition-colors hover:text-primary font-semibold  py-1 block"
                        >
                          Produccion Editorial
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={handlesetfiltro}
                          className="bg-transparent bg-clip-text text-gray-500 transition-colors hover:text-primary font-semibold  py-1 block"
                        >
                          Investigacion Semillero
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={handlesetfiltro}
                          className="bg-transparent bg-clip-text text-gray-500 transition-colors hover:text-primary font-semibold  py-1 block"
                        >
                          Publicacion academica
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={handlesetfiltro}
                          className="bg-transparent bg-clip-text text-gray-500 transition-colors hover:text-primary font-semibold  py-1 block"
                        >
                          Trabajo de grado
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={handlesetfiltro}
                          className="bg-transparent bg-clip-text text-gray-500 transition-colors hover:text-primary font-semibold  py-1 block"
                        >
                          Revista Universitaria
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            {/*MEGAMENU 3*/}
          </ul>
        </div>
        <div>
          {user == true ? (
            <ul className="flex gap-5 items-center">
              <li>
                <a
                  href="/"
                  onClick={() => Cookies.remove("accessToken")}
                  className="flex group items-center gap-4 p-2 text-gray-500 hover:bg-gray-200 transition-colors rounded-lg"
                >
                  <HiLogout className="w-5 h-5 text-base group-hover:text-error" />
                  <p className="group-hover:text-error">Desconectar</p>
                </a>
              </li>
            </ul>
          ) : (
            <ul className="flex gap-5 items-center">
              <li>
                <a
                  href="Register"
                  className="rounded-full hover:text-success bg-gray-100 transition-colors px-3 py-2 font-semibold  flex items-center group"
                >
                  <span className="mr-2">Registrate</span>
                  <HiKey className="h-6 w-6 " />
                </a>
              </li>

              <li>
                <a
                  href="login"
                  className="dropdown rounded-full bg-success text-white hover:text-success hover:bg-gray-100 hover:ring ring-success ring-0 transition-colors px-3 py-2 font-semibold  flex items-center group"
                >
                  <span className="mr-2">Ingresa</span>
                  <HiLogin className="h-6 w-6 " />
                </a>
              </li>
            </ul>
          )}
        </div>
      </header>
    </Fragment>
  );
};

export default Navbar;
