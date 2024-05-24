# Gestor de archivos

### Creacion de datos en postman:

-POST  /create
Formdata
```
nro_referencia(id)
titulo
asunto
seguimiento[carpeta][nombre] 
seguimiento[archivo][ruta]
```

Crear nuevo seguimiento con un nuevo archivo
-POST  /createFile
form-data:
```
    name: seguimiento[archivo][ruta]
    id (id de nota)  
```

Crear user, login y auth en formato raw

post /register
post /login : Devuelve el token
get /auth : Devuelve  {"auth": true}



-GET /seguimiento/:id (id de nota)

devuelve los datos de seguimiento de esa nota 

-GET /nota/:id (id de nota)

devuelve el dato de la nota con su seguimiento y archivo
