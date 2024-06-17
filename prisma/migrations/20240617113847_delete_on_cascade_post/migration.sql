-- DropForeignKey
ALTER TABLE `File` DROP FOREIGN KEY `File_postId_fkey`;

-- DropForeignKey
ALTER TABLE `Folder` DROP FOREIGN KEY `Folder_postId_fkey`;

-- DropForeignKey
ALTER TABLE `PostPermission` DROP FOREIGN KEY `PostPermission_postId_fkey`;

-- AddForeignKey
ALTER TABLE `File` ADD CONSTRAINT `File_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Folder` ADD CONSTRAINT `Folder_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostPermission` ADD CONSTRAINT `PostPermission_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
