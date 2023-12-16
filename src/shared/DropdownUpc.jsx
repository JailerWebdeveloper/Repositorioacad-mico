import React from "react";
import logo from "../assets/logo.png";
import sistemaslogo from "../assets/sistemaslogo.jpeg";
const DropdownUpc = () => {
  return (
    <>
      <div className="dropdown dropdown-hover dropdown-end ">
        <button className="btn btn-outline btn-success btn-sm">
          Sitios web
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content flex flex-col  z-[1] menu p-5 shadow bg-white rounded-box w-64 mt-2 ring-1 ring-primary"
        >
          <li className="w-full rounded ">
            <a href="https://www.unicesar.edu.co/" target="_blank" className="rounded flex w-full gap-5">
              <img
                className="mask mask-squircle h-10 w-10 bg-gray-100"
                src={logo}
              />
              <p className="font-bold text-primary">Universidad Popular del cesar</p>
            </a>
          </li>
          <div className="divider"></div>
          <li className="w-full rounded ">
            <a  href="https://sistemas.unicesar.edu.co/index.php/es/" target="_blank"className="rounded flex w-full gap-5">
              <img
                className="mask mask-squircle h-10 w-10 bg-gray-100"
                src={sistemaslogo}
              />
              <p className="font-bold text-primary">Ingenieria de sistemas</p>
            </a>
          </li>
          <div className="divider"></div>
          <li className="w-full rounded ">
            <a  href="https://aulaweb.unicesar.edu.co/" target="_blank" className="rounded flex w-full gap-5">
              <img
                className="mask mask-squircle h-10 w-10 bg-gray-100"
                src={logo}
              />
              <p className="font-bold text-primary">Aulaweb</p>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default DropdownUpc;
