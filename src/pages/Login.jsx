import React, { useState, Fragment } from "react";
import "../App.css";
import UPCBANNER from "../assets/UPCBANNER.png";
import { HiMail, HiLockClosed, HiLogin } from "react-icons/hi";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [formData, setFormdata] = useState({
    usuario: "",
    contrasena: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormdata({ ...formData, [name]: value });
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      usuario: formData.usuario,
      contrasena: formData.contrasena,
    };

    try {
      console.log("Enviando datos de autenticación:", data);
      const response = await axios.post(
        "http://srv435312.hstgr.cloud:4000/api/v2/login/",
        data
      );

      if (response.status === 200) {
        const token = response.data.token;
        // Almacenar el token en las cookies de manera segura
        Cookies.set("accessToken", String(token), {
          sameSite: "strict",
          path: "/",
          expires: 1,
        });
        

        // Decodificar y mostrar información del token
        const accessToken = Cookies.get("accessToken");
        const decoded = jwtDecode(accessToken);
        const newUserData = decoded;

          alert("Bienvenido, " + newUserData.nombre);
          window.location.href = "/Search";

      } else {
        // Manejo específico de errores
        if (response.status === 401) {
          alert("Credenciales incorrectas");
        } else {
          alert("Ocurrió un error en la respuesta.");
        }
      }
    } catch (error) {
      console.error("Error durante la autenticación:", error);
      alert("Ocurrió un error durante la autenticación.");
    }
  };


  return (
    <Fragment>
      <div className="min-h-screen register flex items-center justify-center p-4">
        <div className="max-w-lg">
          <a href="/" className="flex justify-center mb-8">
            <img src={UPCBANNER} className="w-40" />
          </a>
          <div className="bg-gray-600 bg-opacity-30 w-full rounded-lg p-8 mb-8">
            <div className="flex flex-col items-center gap-1 mb-8">
              <h1 className="text-xl text-white">Bienvenido</h1>
              <p className="text-gray-400 text-sm">
                Ingresa con tu correo Usuario y tu contraseña
              </p>
            </div>
            <form onSubmit={handleSubmit} id="login" type="submit" className="flex flex-col gap-4">
              <div className="relative">
                <input
                onChange={handleInputChange}
                  name="usuario"
                  type="text"
                  className="w-full border py-2 px-10 rounded-md outline-none hover:bg-green-200 transition-colors"
                  placeholder="Ingresa tu usuario"
                />
                <HiMail className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-primary" />
              </div>
              <div className="relative">
                <input
                  onChange={handleInputChange}
                  name="contrasena"
                  type="password"
                  className="w-full border py-2 px-10 rounded-md outline-none hover:bg-green-200 transition-colors"
                  placeholder="Ingresa tu contraseña"
                />
                <HiLockClosed className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-primary" />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-gray-500 py-2 px-4 text-white rounded-md hover:bg-primary transition-colors"
                >
                  Iniciar sesión
                </button>
              </div>
            </form>
          </div>
          <span className="flex items-center justify-center gap-2 text-white">
            ¿Olvidaste tu contraseña?{" "}
            <a href="#" className="text-primary">
              Recuperar
            </a>
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
