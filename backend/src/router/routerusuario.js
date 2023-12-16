const router =require("express").Router()
const bcrypt = require('bcrypt');
const  Usuario  = require("../model/modelosusuario");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); // Importa la biblioteca jsonwebtoken


router.get('/usuario/:cedula', async (req, res) => {
  try {
    const { cedula } = req.params;

    if (!cedula) {
      return res.status(400).json({ error: 'Cedula is required' });
    }

    const usuario = await Usuario.findOne({
      where: { cedula },
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario not found' });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/usuarios', async (req, res) => {
    try {
      const usuario = await Usuario.findAll();
      console.log('Facultades encontradas:', usuario); // Agrega esta línea para imprimir las facultades en la consola
  
      res.status(200).json({
        status: 200,
        data: usuario,
      });
    } catch (error) {
      console.error('Error al obtener las facultades:', error);
      res.status(500).json({
        status: 500,
        message: 'Error interno del servidor',
      });
    }
  });

  router.post('/usuarios', async (req, res) => {
    const { cedula, nombre, apellido, correo, usuario, contrasena, carreraId,facultadId } = req.body;
  
    try {
      const newUsuario = await Usuario.create({
        cedula,
        nombre,
        apellido,
        correo,
        usuario,
        contrasena,
        carreraId,
        facultadId
      });
  
      res.status(201).json({
        message: 'Usuario creado exitosamente',
        usuario: newUsuario,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Error al crear usuario',
        error,
      });
    }
  });
  
//login
router.post('/login', async (req, res) => {
  const { usuario, contrasena } = req.body;

  try {
    const usuarioEncontrado = await Usuario.findOne({
      where: {
        usuario: usuario,
      },
    });

    if (!usuarioEncontrado) {
      return res.status(401).json({
        message: 'Usuario no encontrado',
      });
    }

    const esValido = await usuarioEncontrado.comparePassword(contrasena);

    if (!esValido) {
      return res.status(401).json({
        message: 'Contraseña incorrecta',
      });
    }


    const payload = {
      usuarioId: usuarioEncontrado.id,
      cedula: usuarioEncontrado.cedula,
      nombre: usuarioEncontrado.nombre,
      apellido: usuarioEncontrado.apellido,
      correo: usuarioEncontrado.correo,
      rol: usuarioEncontrado.rol,
      carreraId: usuarioEncontrado.carreraId,
      facultadId: usuarioEncontrado.facultadId
    };

    const token = jwt.sign(payload, 'secretoDelToken'); // Cambia 'secretoDelToken' por tu secreto real

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      status:200,
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error al iniciar sesión',
      error,
    });
  }
});

//cambiar rol de usuario
router.post('/cambiar-rol/:cedula', async (req, res) => {
  try {
    const { cedula } = req.params;
    const { nuevoRol } = req.body;

    // Verificar si el usuario existe
    const usuario = await Usuario.findOne({
      where: { cedula },
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Cambiar el rol del usuario
    usuario.rol = nuevoRol;
    await usuario.save();

    // Enviar la respuesta
    res.status(200).json({
      status: 200,
      message: `Rol del usuario con cédula ${cedula} cambiado a ${nuevoRol}`,
    });
  } catch (error) {
    console.error('Error al cambiar el rol del usuario:', error);
    res.status(500).json({
      status: 500,
      message: 'Error interno del servidor',
    });
  }
});


//Usuarios inactivos
router.get('/usuarios/inactivos', async (req, res) => {
  try {
    const usuariosInactivos = await Usuario.findAll({
      where: {
        rol: 'INACTIVO',
      },
    });

    res.status(200).json({
      status: 200,
      data: usuariosInactivos,
    });
  } catch (error) {
    console.error('Error al obtener usuarios inactivos:', error);
    res.status(500).json({
      status: 500,
      message: 'Error interno del servidor',
    });
  }
});


//
  module.exports=router