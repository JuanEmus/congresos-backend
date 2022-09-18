/* Importamos*/

const mysql = require('mysql');

/*Creamos el objeto JSON para la conexion*/
const objConnection = {
    "host": "localhost",
    "port": "3306",
    "user": "pruebas",
    "password": "12345",
    "database": "congresos"
}

/*Creamos la conexion */

const myConn = mysql.createConnection(objConnection);

/*Probando la conexion (conectando...) */

myConn.connect((error) => {
    if(error){
        console.log("Error al hacer la conexión: ", error);
    } else {
        console.log("BD conectada");
    }
});

module.exports = myConn;