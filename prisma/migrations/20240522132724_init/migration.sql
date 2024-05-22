/*
  Warnings:

  - You are about to drop the column `estado` on the `Nota` table. All the data in the column will be lost.
  - You are about to drop the column `motivo` on the `Nota` table. All the data in the column will be lost.
  - You are about to drop the column `nro_pedido` on the `Nota` table. All the data in the column will be lost.
  - You are about to drop the column `destino` on the `Seguimiento` table. All the data in the column will be lost.
  - Added the required column `titulo` to the `Nota` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Nota` DROP COLUMN `estado`,
    DROP COLUMN `motivo`,
    DROP COLUMN `nro_pedido`,
    ADD COLUMN `titulo` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Seguimiento` DROP COLUMN `destino`;
