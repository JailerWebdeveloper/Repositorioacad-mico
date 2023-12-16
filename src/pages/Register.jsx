import "../App.css";
import axios from "axios";
import UPCBANNER from "../assets/UPCBANNER.png";
import logo from "../assets/logo.png";
import Select from "react-select";
import { HiLogin, HiOutlineEye } from "react-icons/hi";
import React, { useState, useEffect, Fragment } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    cedula: "",
    nombre: "",
    apellido: "",
    correo: "",
    carreraId: 0,
    usuario: "",
    contraseña: "",
    facultadId: 0,
  });

  const [facultades, setfacultades] = useState([]); // Almacena los datos de las facultades
  const [carreras, setcarreras] = useState([]); // Almacena los datos de las carreras
  const [filtro, setfiltro] = useState([]); // Almacena los datos de las carreras
  const [selectedOption, setSelectedOption] = useState(null); // Controlador de cambios en los select carrera
  const [selectedOption2, setSelectedOption2] = useState(null); // Controlador de cambios en los select facultad
  const [showpaswword, setshowpaswword] = useState(true); // Controlador de cambios en los select facultad

  const handleshowpaswword = () => {
    setshowpaswword(!showpaswword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Datos para la primera solicitud POST
    const data = {
      cedula: formData.cedula,
      nombre: formData.nombre,
      apellido: formData.apellido,
      correo: formData.correo,
      carreraId: formData.carrera,
      usuario: formData.usuario,
      contrasena: formData.contraseña,
      facultadId: formData.facultadId,
    };

    try {
      const [response1] = await Promise.all([
        axios.post("http://srv435312.hstgr.cloud:4000/api/v2/usuarios/", data),
      ]);

      console.log("Respuesta de solicitud 1:", response1.status);
      if (response1.status === 200 || response1.status === 201) {
        window.location.href = "/Registroexitoso";
      } else {
        alert(
          "La solicitud fue exitosa, pero ocurrió un error en la respuesta."
        );
      }
    } catch (error) {
      // Manejar errores aquí
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    axios
      .get("http://srv435312.hstgr.cloud:4000/api/V2/carreras")
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setcarreras(response.data.data);
        } else {
          console.error("La respuesta de la API no contiene datos válidos.");
        }
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://srv435312.hstgr.cloud:4000/api/V2/facultades")
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setfacultades(response.data.data);
        } else {
          console.error("La respuesta de la API no contiene datos válidos.");
        }
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  const optionsfacultad = facultades.map((facultad) => {
    if (facultad.id && facultad.nombre) {
      return { value: facultad.id, label: facultad.nombre };
    } else {
      return { value: null, label: null };
    }
  });

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setFormData({ ...formData, carrera: selectedOption.value });
  };

  const handleChange2 = (selectedOption2) => {
    setSelectedOption2(selectedOption2);
    setFormData({ ...formData, facultadId: selectedOption2.value });
    const filtro = carreras.filter(
      (carrera) => carrera.facultadId === selectedOption2.value
      
    );
    // Establece las carreras que se mostrarán
    setfiltro(filtro);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const optionscarreras = filtro.map((carrera) => {
    if (carrera.id && carrera.nombre && carrera.facultadId) {
      return { value: carrera.id, label: carrera.nombre };
    } else {
      return { value: null, label: null };
    }
  });

  return (
    <Fragment>
      <div className="register flex flex-col h-screen   justify-center items-center">
        <a href="/" className="mt-2">
          <img src={UPCBANNER} alt="" className="w-40" />
        </a>
        <div className="p-8">
          <h1 className="text-6xl text-white font-medium mb-2">
            Crea una cuenta
          </h1>
          <span className="text-gray-500 font-medium">
            ¿Ya eres usuario?{" "}
            <a
              href="/Login"
              className="text-primary hover:underline"
            >
              Ingresa
            </a>
          </span>
          {/* Formulario de registro */}
          <form id="register" onSubmit={handleSubmit}>
              <div className="mb-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <input
                  type="text"
                  name="nombre"
                  required
                  value={formData.nombre}
                  onChange={handleInputChange}
                  autoComplete="off"
                  className="w-full py-3 px-4 rounded-xl outline-none bg-[#343434] text-gray-100 group hover:bg-green-800  transition-colors"
                  placeholder="Nombre(s)"
                />
                <input
                  type="text"
                  name="apellido"
                  required
                  value={formData.apellido}
                  onChange={handleInputChange}
                  autoComplete="off"
                  className="w-full py-3 px-4 rounded-xl outline-none bg-[#343434] text-gray-100 group hover:bg-green-800  transition-colors"
                  placeholder="Apellidos"
                />
              </div>
              <div className="flex gap-2 items-center mb-4">
                <input
                  name="usuario"
                  required
                  value={formData.usuario}
                  onChange={handleInputChange}
                  type="text"
                  autoComplete="off"
                  className="w-1/2 py-3 px-4 rounded-xl outline-none bg-[#343434] text-gray-100 group hover:bg-green-800  transition-colors"
                  placeholder="Usuario"
                />
                <div className="relative w-1/2">
                  <input
                    name="contraseña"
                    required
                    value={formData.contraseña}
                    onChange={handleInputChange}
                    type={showpaswword ? "text" : "password"}
                    autoComplete="off"
                    className="w-full py-3 px-4 rounded-xl outline-none bg-[#343434] text-gray-100 group hover:bg-green-800  transition-colors"
                    placeholder="Contraseña"
                  />
                  <button onClick={handleshowpaswword}>
                    <HiOutlineEye className="w-5 h-5 absolute right-2 top-[50%] -translate-y-[50%] text-primary cursor-pointer" />
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <input
                  name="correo"
                  type="email"
                  required
                  value={formData.correo}
                  onChange={handleInputChange}
                  autoComplete="off"
                  className="w-full py-3 px-4 rounded-xl outline-none bg-[#343434] text-gray-100 group hover:bg-green-800  transition-colors"
                  placeholder="Correo electrónico"
                />
              </div>
              <div className="flex gap-2 mb-4">
                <input
                  type="number"
                  name="cedula"
                  value={formData.cedula}
                  required
                  onChange={handleInputChange}
                  autoComplete="off"
                  className="w-full py-3 px-4 rounded-xl outline-none bg-[#343434] text-gray-100 group hover:bg-green-800  transition-colors"
                  placeholder="Cedula"
                />
              </div>
              <div className="flex gap-2 items-center mb-4">
                <Select
                  className="w-full"
                  value={selectedOption2}
                  name="facultadId"
                  onChange={handleChange2}
                  required
                  options={optionsfacultad}
                  isSearchable={true} // Habilita la función de búsqueda
                  placeholder="Facultad"
                />
                <Select
                  className="w-full"
                  value={selectedOption}
                  onChange={handleChange}
                  options={optionscarreras}
                  required
                  isSearchable={true} // Habilita la función de búsqueda
                  placeholder="Programa cursado"
                />
              </div>
            </form>
            <button
            form="register"
            type="submit"
            className="bg-primary w-full text-white py-3 px-4 rounded-full"
          >
            Crear cuenta
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;