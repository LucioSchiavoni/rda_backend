import prisma from "../../config/db.js";


export const pedidoExist = async(nro_pedido) => {

    if (nro_pedido === null || nro_pedido === undefined) {
        return false; 
    }

    const pedidoInt = parseInt(nro_pedido)
    const pedido =  await prisma.nota.findFirst({
        where:{
            nro_pedido: pedidoInt
        }
    })

    return pedido !== null

}

export const destinoId = async (nro_referencia) => {
    try {
      
        const nota = await prisma.nota.findUnique({
            where: {
                nro_referencia: nro_referencia
            }
        });

        
        if (!nota) {
            throw new Error('La nota no existe');
        }


        const seguimientos = await prisma.seguimiento.findMany({
            where: {
                notaId: nro_referencia
            }
        });

        
        const destinos = seguimientos.map(seguimiento => seguimiento.destino);
        
        return destinos;
    } catch (error) {
        throw new Error('Error al buscar el destino del seguimiento: ' + error.message);
    }
};

