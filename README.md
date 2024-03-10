Seguimiento de pedidos



Creacion de datos en postman:

POST  /create
raw:

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