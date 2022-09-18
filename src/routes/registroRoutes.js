const express = require('express');

const routes = express.Router();

const { listarRegistros, obtenerRegistro, crearRegistro, editarRegistro, eliminarRegistro, } = require("../controllers/registroController.js");

routes.get('/registros', listarRegistros);

routes.get('/registros/:id', obtenerRegistro);

routes.post('/registros', crearRegistro);

routes.put('/registros/:id', editarRegistro)

routes.delete('/registros/:id', eliminarRegistro)

module.exports = routes;