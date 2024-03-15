# Seguimiento de pedidos



### Creacion de datos en postman:

-POST  /create
raw:
```

{
    "nro_referencia": INT,
    "motivo": " ",
    "nro_pedido": INT,
    "observaciones": "",
    "estado": "EN_PROCESO",
    "seguimiento": {
         "destino": "",
            "archivo": {
                "ruta": "",
                "nombre": ""
         }
     }
}
```

-POST  /createFile
form-data:
```
    name: seguimiento[archivo][ruta]
    id (id de nota)  
```

