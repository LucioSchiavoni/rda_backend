/*
  Warnings:

  - A unique constraint covering the columns `[ruta]` on the table `Archivo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nro_referencia]` on the table `Nota` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nro_pedido]` on the table `Nota` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Archivo_ruta_key` ON `Archivo`(`ruta`);

-- CreateIndex
CREATE UNIQUE INDEX `Nota_nro_referencia_key` ON `Nota`(`nro_referencia`);

-- CreateIndex
CREATE UNIQUE INDEX `Nota_nro_pedido_key` ON `Nota`(`nro_pedido`);
