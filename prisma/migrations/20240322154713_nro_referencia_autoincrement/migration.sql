/*
  Warnings:

  - The primary key for the `Nota` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Nota` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Seguimiento` DROP FOREIGN KEY `Seguimiento_notaId_fkey`;

-- DropIndex
DROP INDEX `Nota_nro_pedido_key` ON `Nota`;

-- DropIndex
DROP INDEX `Nota_nro_referencia_key` ON `Nota`;

-- AlterTable
ALTER TABLE `Nota` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    MODIFY `nro_referencia` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`nro_referencia`);

-- AddForeignKey
ALTER TABLE `Seguimiento` ADD CONSTRAINT `Seguimiento_notaId_fkey` FOREIGN KEY (`notaId`) REFERENCES `Nota`(`nro_referencia`) ON DELETE RESTRICT ON UPDATE CASCADE;
