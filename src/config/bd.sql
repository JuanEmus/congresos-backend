CREATE DATABASE congresos;

USE congresos;

CREATE TABLE CONGRESO(
	congresoId INT NOT NULL AUTO_INCREMENT,
    congresoNombre VARCHAR(50) NOT NULL,
    congresoDireccion VARCHAR(50),
    PRIMARY KEY (congresoId)
);

CREATE TABLE ESTUDIANTE(
	estudianteId INT NOT NULL AUTO_INCREMENT,
    estudianteNombre VARCHAR(50) NOT NULL,
    estudianteApellidos VARCHAR(50),
    PRIMARY KEY (estudianteId)
);

CREATE TABLE REGISTRO(
	registroId INT NOT NULL AUTO_INCREMENT,
    registroDescripcion VARCHAR(50),
    congresoId INT NOT NULL,
    estudianteId INT NOT NULL,
    PRIMARY KEY (registroId)
);

CREATE TABLE EVENTO(
	eventoId INT NOT NULL AUTO_INCREMENT,
    eventoDescripcion VARCHAR(50),
    eventoFecha DATE NOT NULL,
    eventoLugar VARCHAR (50),
    eventoCosto DECIMAL(12,2) NOT NULL,
    PRIMARY KEY(eventoId)
);

CREATE TABLE REGISTROXEVENTO(
    eventoId INT NOT NULL,
    registroId INT NOT NULL
);

/*Establecemos las llaves foraneas*/
/*Registro*/
ALTER TABLE REGISTRO ADD CONSTRAINT fk_registro_conId FOREIGN KEY(congresoId) REFERENCES CONGRESO(congresoId);
ALTER TABLE REGISTRO ADD CONSTRAINT fk_registro_estId FOREIGN KEY(estudianteId) REFERENCES ESTUDIANTE(estudianteId);

/*REGISTROXEVENTO*/
ALTER TABLE REGISTROXEVENTO ADD CONSTRAINT fk_registroxevento_eventoId FOREIGN KEY(eventoId) REFERENCES EVENTO(eventoId);
ALTER TABLE REGISTROXEVENTO ADD CONSTRAINT fk_registroxevento_registroId FOREIGN KEY(registroId) REFERENCES REGISTRO(registroId);

/*Se crea una vista para los registros*/
CREATE VIEW vRegistro AS
SELECT r.registroId, r.registroDescripcion, c.congresoId, c.congresoNombre, e.estudianteId, e.estudianteNombre
FROM REGISTRO r
INNER JOIN CONGRESO c ON c.congresoId = r.congresoId
INNER JOIN ESTUDIANTE e ON e.estudianteId = r.estudianteId;