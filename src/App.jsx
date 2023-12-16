import "./App.css";
import React from "react";
import Nabvar from "./components/Navbar";
import logo from "./assets/logo.png"; 
import { Link, Element } from "react-scroll";
import { HiOutlineSearch } from "react-icons/hi";
import Footer from "./components/Footer";
import CarrouselMain from "./shared/CarrouselMain";
function App() {
  return (
    <>
      <Element name="inicio" className="h-screen flex flex-col">
        <Nabvar />
        <main className="flex-1 flex bg-gray-200 items-center p-8 gap-3 bg-no-repeat bg-cover bg-center relative bg-local-upc">
          <div className="absolute  bg-gradient-to-r from-gray-900 to-gray-900 opacity-75 inset-0 z-0"></div>

          <div className="flex flex-col gap-2 w-full object-contain  h-full items-center z-10">
            <img src={logo} alt="" className="z-10  w-32 md:max-w-xs   " />
            <p className="text-6xl text-white text-center  font-bold z-10 ">
              Repositorio <br /> Institucional
            </p>
            <div className="w-full flex justify-center md:w-3/6 mt-20 join">
              <a  href="Search" class="cssbuttons-io-button">
                Iniciar busqueda
                <div className="icon">
                <HiOutlineSearch />
                </div>
              </a>
            </div>
          </div>
        </main>
      </Element>
      <section className="object-contain flex-col items-center flex ">
        <p className=" text-4xl text-primary font-bold my-5">
          Ultimos documentos
        </p>
        <CarrouselMain />
      </section>
      <Footer />
    </>
  );
}

export default App;
