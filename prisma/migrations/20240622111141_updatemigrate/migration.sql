/*
  Warnings:

  - You are about to drop the column `remarks` on the `loan_status` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `loan_status` table. All the data in the column will be lost.
  - You are about to drop the column `status_date` on the `loan_status` table. All the data in the column will be lost.
  - Added the required column `name_status` to the `Loan_Status` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `loan_status` DROP COLUMN `remarks`,
    DROP COLUMN `status`,
    DROP COLUMN `status_date`,
    ADD COLUMN `name_status` VARCHAR(191) NOT NULL;
