import { Fragment } from "react";
import { HiCheckCircle } from "react-icons/hi";

const SucefullRegister = () => {
  return (
    <Fragment>
      <div className="flex relative flex-col w-full min-h-screen p-8 items-center justify-center">
        <div className="w-full max-w-screen-md flex flex-col items-center justify-center">
          <div className="rounded bg-white flex items-center justify-center p-5 shadow-xl border-2">
            <div className="flex flex-col gap-4 justify-center items-center text-center">
              <HiCheckCircle className="text-6xl text-primary" />
              <h1 className="text-2xl text-primary font-medium">
                Registro exitoso
              </h1>
              <p>Espere la autenticación para poder ingresar al sistema</p>
              <a href="/">
                <button className="btn btn-primary w-full font-bold py-2 px-4 mt-4">
                  Regresar
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SucefullRegister;
