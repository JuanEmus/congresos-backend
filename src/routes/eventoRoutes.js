const express = require('express');

const routes = express.Router();

const { listarEventos, obtenerEvento, crearEvento, editarEvento, eliminarEvento, } = require("../controllers/eventoRoutes.js");

routes.get('/eventos', listarEventos);

routes.get('/eventos/:id', obtenerEvento);

routes.post('/eventos', crearEvento);

routes.put('/eventos/:id', editarEvento)

routes.delete('/eventos/:id', eliminarEvento)

module.exports = routes;