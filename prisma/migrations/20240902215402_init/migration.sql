/*
  Warnings:

  - Added the required column `booked_timestamp` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reservation` ADD COLUMN `booked_timestamp` DATETIME(3) NOT NULL;
