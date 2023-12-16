// UserName.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Getcarreraname = ({ id }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get(`http://srv435312.hstgr.cloud:4000/api/v2/facultades/${id}`);
        if (response.status === 200) {
          setUsername(response.data.nombre);
        } else {
          console.error('La respuesta de la API no contiene datos válidos.');
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchUsername();
  }, [id]);

  return <p>{username}</p>;
};

export default Getcarreraname;

