const connection = require('../config/connection.js');

function listarEventos(req, res){
    if(connection){
        let sql = "SELECT * FROM EVENTO";
        connection.query(sql, (error, eventos) => {
            if(error){
                res.json(error);
            } else {
                console.log(eventos);
                res.json(eventos);
            }
        });
    }
}

function obtenerEvento(req, res){
    if(connection){
        const eventoId = req.params.id;
        let sql = `SELECT * FROM EVENTO WHERE eventoId = ${connection.escape(eventoId)}`;
        connection.query(sql, (error, evento) => {
            if (error){
                console.log(error);
            } else {
                var mensaje1 = "";
                if(evento === undefined || evento.length == 0)
                    var mensaje1 = "Evento no encontrado";
                res.json({data: evento[0], mensaje: mensaje1});
            }
        });
    }
}

function crearEvento(req, res){
    if(connection){
        console.log(req.body);
        const evento = req.body;

        if(!evento.eventoFecha){
            return res.status(400).send({error: true, mensaje: "La fecha del evento es obligatoria."});
        }

        if(!evento.eventoCosto){
            return res.status(400).send({error: true, mensaje: "El costo del evento es obligatorio."});
        }

        let sql = "INSERT INTO EVENTO set ?";

        connection.query(sql, [evento], (error, data) => {
            if (error) {
                console.log(error);
            } else {

                res.json({ error: false, data, mensaje: "Evento creado con exito." });
            }
        });
    }
}

function editarEvento(req, res) {
	if (connection) {
        const eventoId = req.params.id;
		const evento = req.body;

		if(!evento.eventoFecha){
            return res.status(400).send({error: true, mensaje: "La fecha del evento es obligatoria."});
        }

        if(!evento.eventoCosto){
            return res.status(400).send({error: true, mensaje: "El costo del evento es obligatorio."});
        }

		let sql = "UPDATE EVENTO set ? WHERE eventoId = ?";

		connection.query(sql, [evento, eventoId], (error, data) => {
			if (error) {
				res.json(error);
			} else {
				let mensaje = "";
				if (data.changedRows === 0) {
					mensaje = "La información es la misma o el evento no existe.";
				} else {
					mensaje = "Se actualizaron los datos del evento correctamente."
				}
				res.json({ error: false, data, mensaje });
			}
		});
	}
}

function eliminarEvento(req, res){
    if(connection){
        const eventoId = req.params.id;

        let sqlregistroxevento = `SELECT * FROM REGISTROXEVENTO WHERE eventoId = ${connection.escape(eventoId)}`;

        connection.query(sqlregistroxevento, (error, registroxevento) => {
            if(error){
                console.log(error);
            }
            if (registroxevento == undefined || registroxevento.length == 0){
                let sql = "DELETE FROM EVENTO WHERE eventoId = ?";
                connection.query(sql, [eventoId], (error, data) => {
                    if(error){
                        res.json(error);
                    } else {
                        let mensaje1 = "";
                        if(data.affectedRows == 0){
                            mensaje1 = "Evento no encontrado.";
                        } else {
                            mensaje1 = "Evento eliminado con éxito.";
                        }
                        res.json({error: false, data, mensaje1});
                    }
                });
            } else {
                return res.status(400).send({error: true, mensaje: "El evento no puede ser eliminado."});
            }
        });

    }
}


module.exports = {
    listarEventos,
    obtenerEvento,
    crearEvento,
    editarEvento,
    eliminarEvento,
}