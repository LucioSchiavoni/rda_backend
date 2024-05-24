/*
  Warnings:

  - You are about to drop the column `archivoId` on the `Seguimiento` table. All the data in the column will be lost.
  - You are about to drop the `_ArchivoToCarpeta` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_ArchivoToCarpeta` DROP FOREIGN KEY `_ArchivoToCarpeta_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ArchivoToCarpeta` DROP FOREIGN KEY `_ArchivoToCarpeta_B_fkey`;

-- AlterTable
ALTER TABLE `Archivo` ADD COLUMN `carpetaId` INTEGER NULL,
    ADD COLUMN `seguimientoId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Nota` MODIFY `estado` ENUM('PUBLICO', 'PRIVADO') NOT NULL DEFAULT 'PUBLICO';

-- AlterTable
ALTER TABLE `Seguimiento` DROP COLUMN `archivoId`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_ArchivoToCarpeta`;

-- AddForeignKey
ALTER TABLE `Archivo` ADD CONSTRAINT `Archivo_seguimientoId_fkey` FOREIGN KEY (`seguimientoId`) REFERENCES `Seguimiento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Archivo` ADD CONSTRAINT `Archivo_carpetaId_fkey` FOREIGN KEY (`carpetaId`) REFERENCES `Carpeta`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
