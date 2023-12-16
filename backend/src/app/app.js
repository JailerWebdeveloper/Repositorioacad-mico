const config = require("../config");
const express = require('express');
const morgan = require('morgan');
const app = express();

var createError = require('http-errors');
const cors = require('cors');
var path = require('path');
/////////
const routerfacultad = require("../router/routerfacultad");
const routercarreras= require("../router/routercarreras");
const routerusuarios=require("../router/routerusuario");
const routerproyectos=require("../router/routerproyecto");
const routerArchivos =require("../router/routerArchivos");
///////
app.use(morgan("dev"));
app.get('/', (req, res) => {
    res.send('express');
});
app.use(express.json());
app.use('/MEDIA', express.static(path.join(__dirname, 'MEDIA')));
app.use(cors(config.application.cors.server));

app.use("/api/v2", routerfacultad);
app.use("/api/v2",routercarreras);
app.use("/api/v2",routerusuarios);
app.use("/api/v2",routerproyectos);
app.use("/api/v2",routerArchivos);




module.exports = app;
