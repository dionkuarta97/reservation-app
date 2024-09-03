/*
  Warnings:

  - A unique constraint covering the columns `[table_number]` on the table `Table` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Table_table_number_key` ON `Table`(`table_number`);
