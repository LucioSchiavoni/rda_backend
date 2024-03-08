/*
  Warnings:

  - Added the required column `observaciones` to the `Nota` table without a default value. This is not possible if the table is not empty.
  - Made the column `motivo` on table `Nota` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Nota` ADD COLUMN `observaciones` VARCHAR(191) NOT NULL,
    MODIFY `motivo` VARCHAR(191) NOT NULL;
