const express = require('express');

const routes = express.Router();

const {listarEstudiantes, obtenerEstudiante, crearEstudiante, editarEstudiante, eliminarEstudiante} = require("../controllers/estudianteController.js");

routes.get('/estudiantes', listarEstudiantes);

routes.get('/estudiantes/:id', obtenerEstudiante);

routes.post('/estudiantes', crearEstudiante);

routes.put('/estudiantes/:id', editarEstudiante)

routes.delete('/estudiantes/:id', eliminarEstudiante)

module.exports = routes;