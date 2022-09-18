const connection = require('../config/connection.js');

function listarEstudiantes(req, res){
    if(connection){
        let sql = "SELECT * FROM ESTUDIANTE";
        connection.query(sql, (error, estudiantes) => {
            if(error){
                res.json(error);
            } else {
                console.log(estudiantes);
                res.json(estudiantes);
            }
        });
    }
}

function obtenerEstudiante(req, res){
    if(connection){
        const estudianteId = req.params.id;
        let sql = `SELECT * FROM ESTUDIANTE WHERE estudianteId = ${connection.escape(estudianteId)}`;
        connection.query(sql, (error, estudiante) => {
            if (error){
                console.log(error);
            } else {
                var mensaje1 = "";
                if(estudiante === undefined || estudiante.length == 0)
                    mensaje1 = "Estudiante no encontrado";
                res.json({data: estudiante[0], mensaje: mensaje1});
            }
        });
    }
}

function crearEstudiante(req, res){
    if(connection){
        console.log(req.body);
        const estudiante = req.body;

        if(!estudiante.estudianteNombre){
            return res.status(400).send({error: true, mensaje: "El nombre del estudiante es obligatorio."});
        }

        let sql = "INSERT INTO ESTUDIANTE set ?"

        connection.query(sql, [estudiante], (error, data) => {
            if(error){
                console.log(error);
            } else {
                res.json({error: false, data, mensaje: "Estudiante creado con éxito."});
            }
        });
    }
}

function editarEstudiante(req, res) {
	if (connection) {
        const estudianteId = req.params.id;
		const estudiante = req.body;

		if (!estudiante.estudianteNombre) {
			return res.status(400).send({ error: true, mensaje: "El nombre del estudiante es obligatorio." });
		}

		let sql = "UPDATE ESTUDIANTE set ? WHERE estudianteId = ?";

		connection.query(sql, [estudiante, estudianteId], (error, data) => {
			if (error) {
				res.json(error);
			} else {
				let mensaje = "";
				if (data.changedRows === 0) {
					mensaje = "La información es la misma o el estudiante no existe.";
				} else {
					mensaje = "Se actualizaron los datos del estudiante correctamente."
				}
				res.json({ error: false, data, mensaje });
			}
		});
	}
}

function eliminarEstudiante(req, res){
    if(connection){
        const estudianteId = req.params.id;

        let sqlregistro = `SELECT * FROM REGISTRO WHERE estudianteId = ${connection.escape(estudianteId)}`;

        connection.query(sqlregistro, (error, registro) => {
            if(error){
                console.log(error);
            }
            if (registro === undefined || registro.length == 0){
                let sql = "DELETE FROM ESTUDIANTE WHERE estudianteId = ?";
                connection.query(sql, [estudianteId], (error, data) => {
                    if(error){
                        res.json(error);
                    } else {
                        let mensaje1 = "";
                        if(data.affectedRows == 0){
                            mensaje1 = "Estudiante no encontrado.";
                        } else {
                            mensaje1 = "Estudiante eliminado con éxito.";
                        }
                        res.json({error: false, data, mensaje1});
                    }
                });
            } else {
                return res.status(400).send({error: true, mensaje: "El estudiante no puede ser eliminado."});
            }
        });

    }
}


module.exports = {
    listarEstudiantes,
    obtenerEstudiante,
    crearEstudiante,
    editarEstudiante,
    eliminarEstudiante,
}