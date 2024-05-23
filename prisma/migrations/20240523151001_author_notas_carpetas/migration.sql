/*
  Warnings:

  - Added the required column `autorId` to the `Nota` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Nota` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Seguimiento` DROP FOREIGN KEY `Seguimiento_archivoId_fkey`;

-- AlterTable
ALTER TABLE `Nota` ADD COLUMN `autorId` INTEGER NOT NULL,
    ADD COLUMN `estado` ENUM('PUBLICO', 'PRIVADO') NOT NULL;

-- CreateTable
CREATE TABLE `Carpeta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `seguimientoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ArchivoToCarpeta` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ArchivoToCarpeta_AB_unique`(`A`, `B`),
    INDEX `_ArchivoToCarpeta_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Nota` ADD CONSTRAINT `Nota_autorId_fkey` FOREIGN KEY (`autorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carpeta` ADD CONSTRAINT `Carpeta_seguimientoId_fkey` FOREIGN KEY (`seguimientoId`) REFERENCES `Seguimiento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ArchivoToCarpeta` ADD CONSTRAINT `_ArchivoToCarpeta_A_fkey` FOREIGN KEY (`A`) REFERENCES `Archivo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ArchivoToCarpeta` ADD CONSTRAINT `_ArchivoToCarpeta_B_fkey` FOREIGN KEY (`B`) REFERENCES `Carpeta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
