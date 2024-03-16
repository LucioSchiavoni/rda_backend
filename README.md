# Seguimiento de pedidos



### Creacion de datos en postman:

-POST  /create
Formdata:
```
seguimiento[destino]
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
