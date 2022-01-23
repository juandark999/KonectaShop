# Konecta Crud

## Configuración Api

En su servidor php añadir el archivo index.php el cual simula la Api ejemplo /xampp/htdcos/index.php

### `Configuración base de datos`

En el archivo index.php añadir las credenciales de su base de datos

### `Estructura Tabla Ventas`

Crear una tabla la cual disponga de los campos: cantidad y id_productos para almacenar las ventas realizadas

### `SQL's Extras solicitados`

En la carpeta Api se encuentra un archivo llamado sql_konecta, en este se encuentra las consultas extras solicitadas

### `Configuración REACT`

todo lo relacionado con react se encuentra en la carpeta konecta_crud, tener en cuenta que la ruta de la api se encuentra en src/services/api.js, se debe modificar la variable api por la ruta en la cual halla albergado el archivo index.php ejemplo: http://localhost/api/

Ejecutar npm start

