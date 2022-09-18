/*Exportamos express*/
const express = require('express');

/*Inicializamos express*/

const app = express();

app.set('port', process.env.PORT || 3000);

/*Establecemos los MIDDLEWARES*/
app.use(express.urlencoded({extended: false}));
app.use(express.json());

/*BD*/
require("./config/connection.js");

/*Rutas*/
app.use(require('./routes/congresoRoutes.js'));
app.use(require('./routes/estudianteRoutes.js'));
app.use(require('./routes/registroRoutes.js'));
app.use(require('./routes/eventoRoutes.js'));

/*Levantar el servidor*/
app.listen(app.get('port'), (error) => {
    if (error){
        console.log(error);
    } else {
        console.log(`Sevidor en puerto: ${app.get('port')}`);
    }
});