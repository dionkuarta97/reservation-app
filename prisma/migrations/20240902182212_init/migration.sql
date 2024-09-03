-- DropForeignKey
ALTER TABLE `reservation` DROP FOREIGN KEY `Reservation_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `reservation` DROP FOREIGN KEY `Reservation_table_id_fkey`;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_table_id_fkey` FOREIGN KEY (`table_id`) REFERENCES `Table`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
