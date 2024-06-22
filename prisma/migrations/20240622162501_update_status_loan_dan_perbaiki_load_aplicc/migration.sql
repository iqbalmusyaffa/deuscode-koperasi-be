/*
  Warnings:

  - You are about to drop the column `status` on the `loan_application` table. All the data in the column will be lost.
  - You are about to drop the column `application_id` on the `loan_status` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Loan_Application` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `statusloan_id` to the `Loan_Application` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `loan_status` DROP FOREIGN KEY `Loan_Status_application_id_fkey`;

-- AlterTable
ALTER TABLE `loan_application` DROP COLUMN `status`,
    ADD COLUMN `statusloan_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `loan_status` DROP COLUMN `application_id`;

-- CreateIndex
CREATE UNIQUE INDEX `Loan_Application_user_id_key` ON `Loan_Application`(`user_id`);

-- AddForeignKey
ALTER TABLE `Loan_Application` ADD CONSTRAINT `Loan_Application_statusloan_id_fkey` FOREIGN KEY (`statusloan_id`) REFERENCES `Loan_Status`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
