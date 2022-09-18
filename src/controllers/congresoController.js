const connection = require('../config/connection.js');

function listarCongresos(req, res){
    if(connection){
        let sql = "SELECT * FROM CONGRESO";
        connection.query(sql, (error, congresos) => {
            if(error){
                res.json(error);
            } else {
                console.log(congresos);
                res.json(congresos);
            }
        });
    }
}

function obtenerCongreso(req, res){
    if(connection){
        const congresoId = req.params.id;
        let sql =  `SELECT * FROM CONGRESO WHERE congresoId = ${connection.escape(congresoId)}`;
        connection.query(sql, (error, congreso) => {
            if(error){
                console.log(error);
            } else {
                var mensaje1= "";
                if(congreso.undefined || congreso == 0)
                    mensaje1 = "Congreso no encontrado";
                res.json({data: congreso[0], mensaje:mensaje1});
            }
        });
    }
}

function crearCongreso(req, res){
    if(connection){
        const congreso = req.body

        if(!congreso.congresoNombre){
            return res.status(400).send({error: true, mensaje:"El nombre es obligatorio"});
        }

        let sql = "INSERT INTO CONGRESO set ?"

        connection.query(sql, [congreso], (error, data) => {
            if(error){
                console.log(error);
            } else {
                res.json({error: false, data, mensaje: "Congreso creado con exito."});
            }
        });
    }
}

function editarCongreso(req, res) {
	if (connection) {
        const congresoId = req.params.id;
		const congreso = req.body;

		if (!congreso.congresoNombre) {
			return res.status(400).send({ error: true, mensaje: "El nombre del congreso es obligatorio." });
		}

		let sql = "UPDATE CONGRESO set ? WHERE congresoId = ?";

		connection.query(sql, [congreso, congresoId], (error, data) => {
			if (error) {
				res.json(error);
			} else {
				let mensaje = "";
				if (data.changedRows === 0) {
					mensaje = "La información es la misma o el congreso no existe.";
				} else {
					mensaje = "Se actualizaron los datos del congreso correctamente."
				}
				res.json({ error: false, data, mensaje });
			}
		});
	}
}

function eliminarCongreso(req, res){
    if(connection){
        const congresoId = req.params.id;

        let sqlregistro = `SELECT * FROM REGISTRO WHERE congresoId = ${connection.escape(congresoId)}`;

        connection.query(sqlregistro, (error, registro) => {
            if(error){
                console.log(error);
            }
            if (registro == undefined || registro.length == 0){
                let sql = "DELETE FROM CONGRESO WHERE congresoId = ?";
                connection.query(sql, [congresoId], (error, data) => {
                    if(error){
                        res.json(error);
                    } else {
                        let mensaje1 = "";
                        if(data.affectedRows == 0){
                            mensaje1 = "Congreso no encontrado.";
                        } else {
                            mensaje1 = "Congreso eliminado con éxito.";
                        }
                        res.json({error: false, data, mensaje1});
                    }
                });
            } else {
                return res.status(400).send({error: true, mensaje: "El congreso no puede ser eliminado."});
            }
        });

    }
}



module.exports = {
    listarCongresos,
    obtenerCongreso,
    crearCongreso,
    editarCongreso,
    eliminarCongreso,
}
