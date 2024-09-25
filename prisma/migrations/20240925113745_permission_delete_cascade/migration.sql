-- DropForeignKey
ALTER TABLE `PostPermission` DROP FOREIGN KEY `PostPermission_userId_fkey`;

-- AddForeignKey
ALTER TABLE `PostPermission` ADD CONSTRAINT `PostPermission_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
