const connection = require('../config/connection.js');

function listarRegistros(req, res){
    if(connection){
        let sql = "SELECT * FROM vRegistro ORDER BY registroId";
        connection.query(sql, (error, registros) => {
            if(error){
                res.json(error);
            } else {
                console.log(registros);
                res.json(registros);
            }
        });
    }
}

function obtenerRegistro(req, res){
    if(connection){
        const registroId = req.params.id;
        let sql = `SELECT * FROM vRegistro WHERE registroId = ${connection.escape(registroId)}`;
        connection.query(sql, (error, registro) => {
            if (error){
                console.log(error);
            } else {
                var mensaje1 = "";
                if(registro === undefined || registro.length == 0)
                    var mensaje1 = "Registro no encontrado";
                res.json({data: registro[0], mensaje: mensaje1});
            }
        });
    }
}

function crearRegistro(req, res){
    if(connection){
        console.log(req.body);
        
        const registro = {
            "registroDescripcion": req.body.registroDescripcion,
            "congresoId": req.body.congresoId,
            "estudianteId": req.body.estudianteId,
        };

        const {eventosId} = req.body;

        if(!registro.congresoId){
            return res.status(400).send({error: true, mensaje: "El ID del congreso es obligatorio."});
        }

        if(!registro.estudianteId){
            return res.status(400).send({error: true, mensaje: "El ID del estudiante es obligatorio."});
        }

        let sqlcongreso = `SELECT * FROM CONGRESO WHERE congresoId = ${connection.escape(registro.congresoId)}`;

        let sqlestudiante = `SELECT * FROM ESTUDIANTE WHERE estudianteId = ${connection.escape(registro.estudianteId)}`;

        connection.query(sqlcongreso, (error, congreso) => {
            if (error){
                console.log(error);
            }
            if (congreso === undefined || congreso.length == 0){
                return res.status(400).send({ error: true, mensaje: "El congreso no existe" });
            } else {
                connection.query(sqlestudiante, (error, estudiante) => {
                    if (error){
                        console.log(error);
                    }
                    if (estudiante === undefined || estudiante.length == 0){
                        return res.status(400).send({ error: true, mensaje: "El estudiante no existe" });
                    } else {

                        let sql = "INSERT INTO REGISTRO set ?";
                        
                        connection.query(sql, [registro], (error, data) => {
                            if (error){
                                console.log(error);
                            } else {
                                //Aqui se creará el detalle usando el registroId del data
                                registro.registroId = data.insertId;
                                let sql = `INSERT INTO REGISTROXEVENTO (eventoId, registroId) VALUES `;
                                for (let i = 0; i < eventosId.length; i++) {
                                    sql += `(${eventosId[i]}, ${registro.registroId})`;
                                    if (i != eventosId.length - 1) {
                                        sql+= ", ";
                                    }
                                }
                                sql += ";";
                                console.log("sql = ", sql);
                                connection.query(sql, (error, data) => {
                                    if (error){
                                        console.log(error);
                                    } else {
                                        //Aqui devolvemos la insercion del detalle del registro
                                        res.json({error: false, registro, mensaje: "Registro creado con éxito."});
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
}

function editarRegistro(req, res) {
	if (connection) {
        const registroId = req.params.id;
		const registro = req.body;

		if(!registro.congresoId){
            return res.status(400).send({error: true, mensaje: "El ID del congreso es obligatorio."});
        }

        if(!registro.estudianteId){
            return res.status(400).send({error: true, mensaje: "El ID del estudiante es obligatorio."});
        }

        let sqlcongreso = `SELECT * FROM CONGRESO WHERE congresoId = ${connection.escape(registro.congresoId)}`;

        let sqlestudiante = `SELECT * FROM ESTUDIANTE WHERE estudianteId = ${connection.escape(registro.estudianteId)}`;

        connection.query(sqlcongreso, (error, congreso) => {
            if (error){
                console.log(error);
            }
            if (congreso === undefined || congreso.length == 0){
                return res.status(400).send({error: true, mensaje: "El congreso no existe"});
            } else {
                connection.query(sqlestudiante, (error, estudiante) => {
                    if (error){
                        console.log(error);
                    }
                    if (estudiante === undefined || estudiante.length == 0){
                        return res.status(400).send({error: true, mensaje: "El estudiante no existe"});
                    } else {
                        let sql = "UPDATE REGISTRO set ? WHERE registroId = ?";

                        connection.query(sql, [registro, registroId], (error, data) => {
                            if(error){
                                res.json(error);
                            } else {
                                let mensaje ="";
                                if (data.changedRows === 0) {
									mensaje = "La información es la misma o el registro no existe.";
								} else {
									mensaje = "Se actualizaron los datos del registro correctamente."
								}
								res.json({ error: false, data, mensaje });
                            }
                        });
                    }
                });
            }
        });
	}
}

function eliminarRegistro(req, res){
    if(connection){
        const registroId = req.params.id;

        let sqlregistroxevento = `SELECT * FROM REGISTROXEVENTO WHERE registroId = ${connection.escape(registroId)}`;

        connection.query(sqlregistroxevento, (error, registroxevento) => {
            if(error){
                console.log(error);
            }
            if (registroxevento == undefined || registroxevento.length == 0){
                let sql = "DELETE FROM REGISTRO WHERE registroId = ?";
                connection.query(sql, [registroId], (error, data) => {
                    if(error){
                        res.json(error);
                    } else {
                        let mensaje1 = "";
                        if(data.affectedRows == 0){
                            mensaje1 = "Registro no encontrado.";
                        } else {
                            mensaje1 = "Registro eliminado con éxito.";
                        }
                        res.json({error: false, data, mensaje1});
                    }
                });
            } else {
                return res.status(400).send({error: true, mensaje: "El Registro no puede ser eliminado."});
            }
        });
    }
}


module.exports = {
    listarRegistros,
    obtenerRegistro,
    crearRegistro,
    editarRegistro,
    eliminarRegistro,
}