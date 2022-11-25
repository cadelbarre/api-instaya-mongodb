# REST API - Proyecto InstaYa (Gestión de Paquetes)

## Tabla de Contenido
- [REST API - Proyecto InstaYa (Gestión de Paquetes)](#rest-api---proyecto-instaya-gestión-de-paquetes)
	- [Tabla de Contenido](#tabla-de-contenido)
	- [.ENV](#env)
	- [Instalación](#instalación)
	- [Correr la Aplicación](#correr-la-aplicación)
- [Lista de Endpoint](#lista-de-endpoint)
	- [Loguear usuario](#loguear-usuario)
		- [Request](#request)
		- [Response](#response)
	- [Registrar usuario](#registrar-usuario)
		- [Request](#request-1)
		- [Response](#response-1)
	- [Obtener todos los servicios por id del usuario](#obtener-todos-los-servicios-por-id-del-usuario)
		- [Request](#request-2)
		- [Response](#response-2)
	- [Obtener información de un servicio por su id](#obtener-información-de-un-servicio-por-su-id)
		- [Request](#request-3)
		- [Response](#response-3)
	- [Guardar orden de servicio](#guardar-orden-de-servicio)
		- [Request](#request-4)
		- [Response](#response-4)
	- [Actualizar servicio por su id](#actualizar-servicio-por-su-id)
		- [Request](#request-5)
		- [Response](#response-5)

## .ENV
Para conectarse a la base de datos de mongodb, se necesitas adicionar en el archivo `.env` la cadena de texto de conexion en la variable `MONGO_DB_URI`.


````bash
MONGO_DB_URI = '<string connection>'
````

## Instalación
Para instalar todas las dependencias necesarias
````bash
npm install
````
## Correr la Aplicación
````bash
npm run dev
````

# Lista de Endpoint
Ejemplos de los endpoint creados en la restAPi

## Loguear usuario
### Request
`GET /api/user?usuario=<USUARIO>&password=<PASSWORD>`

### Response
````JSON
{
	"error": false,
	"data": {
		"nombreCompleto": "kelly Perez",
		"correo": "kelly@mail.com",
		"usuario": "kelly",
		"id": "63813916ed895bf90f0f11a2"
	}
}
````

## Registrar usuario
### Request
`POST /api/user`

````JSON
// Propiedades del objeto que debe ser enviado
{
	"usuario": "kelly",
	"nombreCompleto": "kelly Perez",
	"correo": "kelly@mail.com",
	"password": "123456"
}
````
### Response
````JSON
{
	"error": false,
	"message": "Usuario guardado"
}
````

## Obtener todos los servicios por id del usuario
### Request
`GET /api/service/gestion?idUsuario=<ID_USUARIO>`


### Response
````JSON
{
	"error": false,
	"data": [
		{
			"destinatario": {
				"nombre": "Max Power",
				"nit": "1047893456",
				"direccion": "Carrera 7F N 34 567",
				"ciudad": "Bogota"
			},
			"_id": "63813af9ed895bf90f0f11a6",
			"fecha": "2022-11-16T05:00:00.000Z",
			"estado": "Guardado",
			"id": "63813af9ed895bf90f0f11a6"
		}
	]
}
````

## Obtener información de un servicio por su id
### Request
`GET /api/service?id=<ID_SERVICE>`

### Response
````JSON
{
	"error": false,
	"data": [
		{
			"dimensiones": {
				"ancho": 4,
				"largo": 3,
				"alto": 5,
				"peso": 21
			},
			"recogida": {
				"nombre": "Molly Patricia",
				"nit": "1129567890",
				"direccion": "Calle 44 N 176 10",
				"ciudad": "Cartagena"
			},
			"destinatario": {
				"nombre": "Max Power",
				"nit": "1047893456",
				"direccion": "Carrera 7F N 34 567",
				"ciudad": "Bogota"
			},
			"usuario": {
				"id": "6380e29a40ca6978b4f375cc",
				"name": "Carlos Delbarre"
			},
			"_id": "63813af9ed895bf90f0f11a6",
			"fecha": "2022-11-16T05:00:00.000Z",
			"hora": "10:30:00",
			"estado": "Guardado",
			"createdAt": "2022-11-25T22:00:25.334Z",
			"updatedAt": "2022-11-25T22:00:25.334Z",
			"id": "63813af9ed895bf90f0f11a6"
		}
	]
}
````

## Guardar orden de servicio
### Request
`POST /api/service`
````JSON
// Propiedades del objeto que debe ser enviado
{
	"fecha": "16 Nov 2022",
	"hora": "10:30:00",
	"alto": "5",
	"ancho": "4",
	"largo": "3",
	"peso": "21",
	"nombreRecogida": "Molly Patricia",
	"ciudadRecogida": "Cartagena",
	"direccionRecogida": "Calle 44 N 176 10",
	"nitRecogida": "1129567890",
	"nombreDestinatario": "Max Power",
	"direccionDestinatario": "Carrera 7F N 34 567",
	"ciudadDestinatario": "Bogota",
	"nitDestinatario": "1047893456",
	"idUsuario": "6380e29a40ca6978b4f375cc",
	"nombreCompleto": "Carlos Delbarre"
}
````

### Response
````JSON
{
	"error": false,
	"message": "Orden guardadada"
}
````

## Actualizar servicio por su id
### Request
`PUT /api/service?id=<ID_SERVICE>`

````JSON
// Propiedades del objeto con los valores a actualizar
{
	"fecha": "16 Nov 2022",
	"hora": "10:30:00",
	"alto": "5",
	"ancho": "4",
	"largo": "3",
	"peso": "21",
	"nombreRecogida": "Molly Patricia",
	"ciudadRecogida": "Cartagena",
	"direccionRecogida": "Calle 44 N 176 10",
	"nitRecogida": "1129567890",
	"nombreDestinatario": "Max Power",
	"direccionDestinatario": "Carrera 7F N 34 567",
	"ciudadDestinatario": "Bogota",
	"nitDestinatario": "1047893456",
	"idUsuario": "6380e29a40ca6978b4f375cc",
	"nombreCompleto": "Carlos Delbarre"
}
````

### Response
````JSON
{
	"error": false,
	"message": "Servicio actualizado."
}
````


