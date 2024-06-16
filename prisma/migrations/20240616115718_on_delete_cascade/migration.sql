-- DropForeignKey
ALTER TABLE `Complaint` DROP FOREIGN KEY `Complaint_order_id_fkey`;

-- DropForeignKey
ALTER TABLE `Complaint` DROP FOREIGN KEY `Complaint_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Fund_Transfer` DROP FOREIGN KEY `Fund_Transfer_receiver_id_fkey`;

-- DropForeignKey
ALTER TABLE `Fund_Transfer` DROP FOREIGN KEY `Fund_Transfer_sender_id_fkey`;

-- DropForeignKey
ALTER TABLE `Fund_Transfer` DROP FOREIGN KEY `Fund_Transfer_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Gold_Deposit` DROP FOREIGN KEY `Gold_Deposit_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Loan_Application` DROP FOREIGN KEY `Loan_Application_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Loan_Status` DROP FOREIGN KEY `Loan_Status_application_id_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_seller_id_fkey`;

-- DropForeignKey
ALTER TABLE `Purchase` DROP FOREIGN KEY `Purchase_buyer_id_fkey`;

-- DropForeignKey
ALTER TABLE `Purchase` DROP FOREIGN KEY `Purchase_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `Referral_Code` DROP FOREIGN KEY `Referral_Code_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Savings_Balance` DROP FOREIGN KEY `Savings_Balance_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Shipment` DROP FOREIGN KEY `Shipment_purchase_id_fkey`;

-- DropForeignKey
ALTER TABLE `Transaction_History` DROP FOREIGN KEY `Transaction_History_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_role_id_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_status_id_fkey`;

-- DropForeignKey
ALTER TABLE `User_Balance` DROP FOREIGN KEY `User_Balance_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `User_Profile` DROP FOREIGN KEY `User_Profile_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `User_Status`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Profile` ADD CONSTRAINT `User_Profile_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Balance` ADD CONSTRAINT `User_Balance_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Referral_Code` ADD CONSTRAINT `Referral_Code_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Savings_Balance` ADD CONSTRAINT `Savings_Balance_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Gold_Deposit` ADD CONSTRAINT `Gold_Deposit_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction_History` ADD CONSTRAINT `Transaction_History_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fund_Transfer` ADD CONSTRAINT `Fund_Transfer_sender_id_fkey` FOREIGN KEY (`sender_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fund_Transfer` ADD CONSTRAINT `Fund_Transfer_receiver_id_fkey` FOREIGN KEY (`receiver_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fund_Transfer` ADD CONSTRAINT `Fund_Transfer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Loan_Application` ADD CONSTRAINT `Loan_Application_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Loan_Status` ADD CONSTRAINT `Loan_Status_application_id_fkey` FOREIGN KEY (`application_id`) REFERENCES `Loan_Application`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_seller_id_fkey` FOREIGN KEY (`seller_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Purchase` ADD CONSTRAINT `Purchase_buyer_id_fkey` FOREIGN KEY (`buyer_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Purchase` ADD CONSTRAINT `Purchase_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shipment` ADD CONSTRAINT `Shipment_purchase_id_fkey` FOREIGN KEY (`purchase_id`) REFERENCES `Purchase`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Complaint` ADD CONSTRAINT `Complaint_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Complaint` ADD CONSTRAINT `Complaint_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Purchase`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
