/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `User_Balance` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `User_Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `User_Balance_user_id_key` ON `User_Balance`(`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `User_Profile_user_id_key` ON `User_Profile`(`user_id`);
