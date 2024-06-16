/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Referral_Code` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Referral_Code_user_id_key` ON `Referral_Code`(`user_id`);
