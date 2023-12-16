import React, { useState,useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import axios from "axios";
import "../App.css";

function CarrouselMain() {
  const [proyectos, setProyectos] = useState([]); // [] Estado inicial
  const [currentIndex, setCurrentIndex] = useState(0);
 const [sliders, setSliders] = useState([]); // [] Estado inicial
  useEffect(() => {
    axios
      .get("http://srv435312.hstgr.cloud:4000/api/v2/proyectos/")
      .then((response) => {
        const latestProjects = response.data.data.slice(-5); // Obtener los últimos 5 proyectos
        setProyectos(response.data.data);
        setSliders(latestProjects);
        console.log(latestProjects);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  if (sliders.length === 0) {
    // Aún no se han cargado los datos, puedes mostrar un mensaje de carga u otro indicador
    return <p>Cargando...</p>;
  }

  


  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? sliders.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === sliders.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const handlegotosite = () => {
    window.open("/search");
  }

  return (
    <div className="max-w-[1020px] md:h-[680px] h-xs w-full m-auto py-16 px-4 relative group">
      <div
        className="w-full h-full relative rounded-2xl bg-center bg-cover duration-500 bg-local-upc"
      >
        <div className="absolute inset-0 grid h-full rounded-2xl w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <p
              className="mb-4 text-xl text-justify font-bold text-white"
            >
              {sliders[currentIndex].titulo}
            </p>
            <p
              className="mb-12 opacity-80 text-white text-sm text-justify max-h-36 "
            >
              {sliders[currentIndex].descripción}
            </p>
            <div className="flex justify-end gap-2">

              <button onClick={handlegotosite} className="btn btn-outline btn-xl btn-primary">
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="flex top-4 justify-center py-2">
        {sliders.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer"
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarrouselMain;
