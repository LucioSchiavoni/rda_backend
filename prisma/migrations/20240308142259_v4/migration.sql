/*
  Warnings:

  - Added the required column `notaId` to the `Archivo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notaId` to the `Seguimiento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Archivo` ADD COLUMN `notaId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Seguimiento` ADD COLUMN `notaId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Archivo` ADD CONSTRAINT `Archivo_notaId_fkey` FOREIGN KEY (`notaId`) REFERENCES `Nota`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Seguimiento` ADD CONSTRAINT `Seguimiento_notaId_fkey` FOREIGN KEY (`notaId`) REFERENCES `Nota`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
