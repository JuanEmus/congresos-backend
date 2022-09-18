const express = require('express');

const routes = express.Router();

const {listarCongresos, obtenerCongreso, crearCongreso, editarCongreso, eliminarCongreso} = require('../controllers/congresoController.js');

routes.get('/congresos', listarCongresos);

routes.get('/congresos/:id', obtenerCongreso);

routes.post('/congresos', crearCongreso);

routes.put('/congresos/:id', editarCongreso);

routes.delete('/congresos/:id', eliminarCongreso);



module.exports = routes;

