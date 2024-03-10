import prisma from "../../config/db.js";


export const pedidoExist = async(nro_pedido) => {

    const pedido =  await prisma.nota.findFirst({
        where:{
            nro_pedido: nro_pedido
        }
    })

    return pedido !== null

}


export const referenciaExist = async(nro_referencia) => {

    const referencia = await prisma.nota.findFirst({
        where: {
            nro_referencia: nro_referencia
        }
    })

    return referencia !== null
}

