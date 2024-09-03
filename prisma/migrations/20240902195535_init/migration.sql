/*
  Warnings:

  - Added the required column `date_booked` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reservation` ADD COLUMN `date_booked` VARCHAR(191) NOT NULL,
    MODIFY `hours_booked` VARCHAR(191) NOT NULL;
