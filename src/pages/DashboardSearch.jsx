import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../shared/Sidebar";
import GridSearch from "../components/GridSearch";
import Createproject from "../components/Createproject";
import Projectview from "../components/Projectview";
import Menuuser from "../pages/Menuuser";
import Myprojectsview from "../pages/Myprojectsview";
import { useFiltro } from '../Filtrocontext.jsx';

const DashboardSearch = () => {
  const { filtro, setFiltro } = useFiltro();
  const [pagina, setPagina] = useState("DashboardS");
  const [selectedproject, setSelectedproject] = useState(null);
  const [filtropor,setfiltropor] = useState("nombre");
  const [filtrofecha,setfiltrofecha] = useState("");

  const Contenido = () => {
    switch (pagina) {
      case "DashboardS":
        return (
          <GridSearch
            selectedproject={selectedproject}
            setPagina={setPagina}
            setSelectedproject={setSelectedproject}
            filtro={filtro}
            filtropor={filtropor}
            setfiltropor={setfiltropor}
            setfiltro={setFiltro}
          />
        );
      case "Menuuser":
        return <Menuuser setPagina={setPagina} />;
      case "Projectview":
        return <Projectview selectedproject={selectedproject} />;
      case "Createproject":
        return <Createproject />;
      case "Myprojectsview":
        return (
          <Myprojectsview
            setSelectedproject={setSelectedproject}
            setcomponent={setPagina}
          />
        );
      default:
        return <p>No se ha especificado un tipo de contenido válido</p>;
    }
  };

  return (
    <Fragment>
<Navbar setPagina={setPagina} pagina={pagina} filtro={filtro} setfiltro={setFiltro} />
      <div className="w-full flex">
        <Sidebar setPagina={setPagina} pagina={pagina} filtro={filtro} setfiltro={setFiltro} />
        <div className="h-screen flex-1 border-2 ">
          <Contenido />
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardSearch;
