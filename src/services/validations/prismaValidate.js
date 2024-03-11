import prisma from "../../config/db.js";


export const pedidoExist = async(nro_pedido) => {

    const pedidoInt = parseInt(nro_pedido)
    const pedido =  await prisma.nota.findFirst({
        where:{
            nro_pedido: pedidoInt
        }
    })

    return pedido !== null

}


export const referenciaExist = async(nro_referencia) => {

    const referenciaInt = parseInt(nro_referencia)
    const referencia = await prisma.nota.findFirst({
        where: {
            nro_referencia: referenciaInt
        }
    })

    return referencia !== null
}

