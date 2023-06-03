CREATE DATABASE Sintapujos2023;
USE Sintapujos2023;


CREATE TABLE  persona (
    id INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (45) NOT NULL,
    lastname VARCHAR (45) NOT NULL,
    typeid ENUM ('Tarjeta de Identidad','Cedula de Ciudadania','Cedula de Extranjeria') NOT NULL,
    idnumber INT (45) NOT NULL,
    file INT (40)NOT NULL,
    phone VARCHAR (40)NOT NULL,
    email VARCHAR(45)NOT NULL,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)

);

DESCRIBE persona;


INSERT INTO persona VALUES
(1,'ferney Alexander','Figueroa Vasquez','Cedula de Ciudadania',1061790550,2452442,3122304465,'alezfigueroa@hotmail.com','ferney123contraseña');


INSERT INTO person VALUES
(2,'Thiago Alexander','Figueroa Vasquez','tarjeta_identidad',123456,2452442,3008472620,'thiagofigueroa@hotmail.com','thiago123contraseña');
