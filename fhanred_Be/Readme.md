#FHANRED API



![FlowChart](https://latidocreativo3w.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fa981a8e8-05ad-4bab-9989-dd95af4145a7%2F86b5494e-b6dc-43e8-a5d6-a845196d771e%2Fb69a24a5-872e-4e37-a065-b42d1d2d2adc.jpg?table=block&id=17d75eec-5381-4555-b081-fc4743c78c43&spaceId=a981a8e8-05ad-4bab-9989-dd95af4145a7&width=2000&userId=&cache=v2)
## Introduccion
La Api de ****FHANRED**** permite hacer solicitudes de creacion o de consultas acerca de usuarios, contratos y tickects
## Configuración y Requisitos

- Node.js 12.0 o superior
- npm (Node Package Manager) instalado

Para ejecutar la API, sigue estos pasos:
- Desde la raiz del proyecto donde se encuentra el archivo package.json
```bash
npm install
```
```bash
npm start
```

## Endpoints and methods


### URL Base 
```http:localhost:3001```

### Estructura de la respuesta
Todas las respuestas son en formato JSON y siguen el siguiente formato:

```bash 
{
 "error":false,
 "data":{}
}
 ```
### Users:

#### listar todos los personajes
- Método: ****GET****
- Endpoint: ****'/users'****
##### Obtener un personaje espesifico
- Método: ****GET****
- Endpoint: ****'/users/:id'****
- Parámetros URL:
    id (String): Identificador único del personaje
#### Crear un nuevo personaje 
- Método: ****POST****
- Endpoint: ****'/users'**** 
- Cuerpo de la Solicitud (JSON):
```

 {
     
    }
```


### Contracts:

#### listar todas las peliculas 
- Método: ****GET****
- Endpoint: ****'/contract'****
##### Obtener un personaje espesifico
- Método: ****GET****
- Endpoint: ****'/contract/:id'****
- Parámetros URL:
    id (String): Identificador de la pelicula 
#### Crear una nueva pelicula
- Método: ****POST****
- Endpoint: ****'/contract'****
- Cuerpo de la Solicitud (JSON):
```
{
   
  }

```

### Tickets:

#### listar todos los planetas 
- Método: ****GET****
- Endpoint: ****'/tickects'****
#### Obtener un planeta especifico
- Método: ****GET****
- Endpoint: ****'tickects/:id'****
- Parámetros URL:
    id (String): Identificador del planeta
#### Crear un nuevo planeta
- Método: ****POST****
- Endpoint: ****'/tickects'****
- Cuerpo de la Solicitud (JSON):
```
{
   
}

```

## Errores y Códigos de Estado HTTP

- ****400**** Bad Request: Se produce si la solicitud es inválida o está mal formada.

- ****404**** Not Found: Se produce si la tarea no se encuentra.

- ****500**** Internal Server Error: Se produce en caso de un error interno del servidor.
