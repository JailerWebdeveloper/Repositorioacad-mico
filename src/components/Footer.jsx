import React from "react";
import UPCBANNER from "../assets/UPCBANNER.png";
import {HiOutlineLocationMarker,HiOutlineMail,HiOutlinePhone} from "react-icons/hi";
const Footer = () => {
  return (
    <>
      <div className="bg-white w-full p-8">
        <div className="grid grid-rows-1 gap-8 md:grid-cols-12 xl:gap-8">
          <div className="md:col-span-12 xl:col-span-4 flex flex-col gap-4 mx-2">
            <img  src={UPCBANNER} className="w-52 my-2"/>
            <p className="text-gray-600 text-justify text-break">
            Institución de Educación Superior sujeta a inspección y vigilancia por el Ministerio de Educación Nacional-Código SNIES 1120
            </p>
          </div>
          <div className="md:col-span-4 xl:col-span-2">
            <h2 className="font-bold mb-6 uppercase">Menu</h2>
            <nav className="flex flex-col gap-4">
              <a href="#" className="hover:underline">
                Inicio
              </a>
              <a href="#" className="hover:underline">
                Nosotros
              </a>
              <a href="#" className="hover:underline">
                Servicios
              </a>
              <a href="#" className="hover:underline">
                Blog
              </a>
              <a href="#" className="hover:underline">
                Contacto
              </a>
            </nav>
          </div>
          <div className="md:col-span-4 xl:col-span-3">
            <h2 className="font-bold mb-6 uppercase">Redes sociales</h2>
            <nav>
              <a
                href="https://www.facebook.com/people/Unicesar-Oficial/100088690585174/"
                className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition-colors"
                target="_blank"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                  className="w-[20px] h-[20px]"
                  alt="Facebook"
                />
                Unicesar Oficial
              </a>
              <a
                href="https://www.instagram.com/unipopularcesar/"
                className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition-colors"
                target="_blank"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                  className="w-[20px] h-[20px]"
                  alt="Instagram"
                />
                Universidad popular del cesar
              </a>
            </nav>
          </div>
          <div className="md:col-span-4 xl:col-span-3">
            <h2 className="font-bold mb-6 uppercase">Contacto</h2>
            <div className="flex flex-col gap-4">
              <p className="flex items-center gap-2">
                <HiOutlineLocationMarker className="text-2xl" />
                Valledupar, Cesar
              </p>
              <p className="flex items-center gap-2">
              <HiOutlineMail className="text-2xl"/>
              pqrs@unicesar.edu.co
              </p>
              <p className="flex items-center gap-2">
                <HiOutlinePhone className="text-2xl" />
                (+57) 605 588 5592
              </p>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex flex-col xl:flex-row gap-4 items-center justify-between">
          <p className="text-gray-800 text-center md:text-left">
            &copy; 2023
            <span className="text-gray-900 font-bold">Universidad Popular del cesar</span> Todos los
            derechos reservados.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-2">
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Terminos y condiciones
            </a>
            <span className="hidden md:flex">|</span>
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Política de privacidad
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
