/*
  Warnings:

  - You are about to drop the column `observaciones` on the `Nota` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Nota` DROP COLUMN `observaciones`,
    ADD COLUMN `asunto` VARCHAR(191) NULL,
    MODIFY `titulo` VARCHAR(191) NULL;
