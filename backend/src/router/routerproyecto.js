const router =require("express").Router()


const  Proyecto  = require("../model/modeloproyecto");

 //todos los proyectos

router.get('/Proyectos', async (req, res) => {
    try {
      const proyecto = await Proyecto.findAll();  
      res.status(200).json({
        status: 200,
        data: proyecto,
      });
    } catch (error) {
      console.error('Error al obtener las facultades:', error);
      res.status(500).json({
        status: 500,
        message: 'Error interno del servidor',
      });
    }
  });

  //crear proyecto
  router.post('/proyectos', async (req, res) => {
    try {
      // Extrae los datos del cuerpo de la solicitud
      const { id_proyecto, titulo, descripción, fecha_publicado,fecha_radicado,Comunidad,Autor,cedulaUsuario, facultadId, carreraId,Url,colaboradores } = req.body;
      
      

      // Crea un nuevo proyecto en la base de datos
      const nuevoProyecto = await Proyecto.create({
        id_proyecto,
        titulo,
        descripción,
        fecha_radicado,
        facultadId,
        carreraId,
        Comunidad,
        Autor,
        cedulaUsuario,
        fecha_publicado,
        Url,
        colaboradores
      });
  
      // Envía la respuesta con el nuevo proyecto creado
      res.status(201).json(nuevoProyecto);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  });

 //busqueda de todos los proyectos por cedulas

router.get('/proyectos/cedula/:cedulaUsuario', async (req, res) => {
    try {
      const { cedulaUsuario } = req.params;
  
      const proyecto = await Proyecto.findAll({ where: { cedulaUsuario } });
  
      if (!proyecto) {
        return res.status(404).json({ error: 'Proyecto no encontrado' });
      }
  
      res.json(proyecto);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  });


//eliminar proyecto
router.delete('/proyectos/:id_proyecto', async (req, res) => {
  try {
    const { id_proyecto } = req.params;
    const proyecto = await Proyecto.findOne({ where: { id_proyecto } });

    if (!proyecto) {
      return res.status(404).json({ mensaje: 'Proyecto no encontrado' });
    }

    await proyecto.destroy();

    return res.status(200).json({ mensaje: 'Proyecto eliminado correctamente' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});



//busqueda individual por proyecto

router.get('/proyectos/:id_proyecto', async (req, res) => {
    try {
      const { id_proyecto } = req.params;
  
      const proyecto = await Proyecto.findOne({ where: { id_proyecto } });
  
      if (!proyecto) {
        return res.status(404).json({ error: 'Proyecto no encontrado' });
      }
  
      res.json(proyecto);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  });
//filtro por facultad
router.get('/proyectos/facultad/:facultadId', async (req, res) => {
  try {
    const { facultadId } = req.params;

    const proyecto = await Proyecto.findOne({ where: { facultadId } });

    if (!proyecto) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    res.json(proyecto);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

//filtro por carrera
router.get('/proyectos/carrera/:carreraId', async (req, res) => {
  try {
    const { carreraId } = req.params;

    const proyecto = await Proyecto.findOne({ where: { carreraId } });

    if (!proyecto) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    res.json(proyecto);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

//filtro por comunidad
router.get('/proyectos/comunidad/:Comunidad', async (req, res) => {
  try {
    const { Comunidad } = req.params;

    const proyecto = await Proyecto.findOne({ where: { Comunidad } });

    if (!proyecto) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    res.json(proyecto);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

//filtro por fechas radicado

//filtro autores
router.get('/proyectos/autor/:Autor', async (req, res) => {
  try {
    const { Autor } = req.params;

    const proyecto = await Proyecto.findOne({ where: { Autor } });

    if (!proyecto) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    res.json(proyecto);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

//filtro titulos
router.get('/proyectos/titulo/:titulo', async (req, res) => {
  try {
    const { titulo } = req.params;

    const proyecto = await Proyecto.findOne({ where: { titulo } });

    if (!proyecto) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    res.json(proyecto);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});
//
  module.exports=router
