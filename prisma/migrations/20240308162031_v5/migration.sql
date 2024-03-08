/*
  Warnings:

  - You are about to drop the column `notaId` on the `Archivo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Archivo` DROP FOREIGN KEY `Archivo_notaId_fkey`;

-- AlterTable
ALTER TABLE `Archivo` DROP COLUMN `notaId`;
