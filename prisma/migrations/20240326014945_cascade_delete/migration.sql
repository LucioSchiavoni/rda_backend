-- DropForeignKey
ALTER TABLE `Seguimiento` DROP FOREIGN KEY `Seguimiento_notaId_fkey`;

-- AddForeignKey
ALTER TABLE `Seguimiento` ADD CONSTRAINT `Seguimiento_notaId_fkey` FOREIGN KEY (`notaId`) REFERENCES `Nota`(`nro_referencia`) ON DELETE CASCADE ON UPDATE CASCADE;
