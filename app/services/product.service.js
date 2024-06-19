// app/services/ProductService.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ProductService {
  static async getAll() {
    try {
      return await prisma.product.findMany();
    } catch (error) {
      throw new Error(`Error in getAll products: ${error.message}`);
    }
  }

  static async getById(id) {
    try {
      return await prisma.product.findUnique({ where: { id: parseInt(id, 10) } });
    } catch (error) {
      throw new Error(`Error in getProductById: ${error.message}`);
    }
  }

  static async create(data) {
    try {
      // Ensure seller_id is provided in data and convert it to an integer
      const { seller_id, price, stock, ...productData } = data;

      return await prisma.product.create({
        data: {
          ...productData,
          price: parseFloat(price), // Convert price to float
          stock: parseInt(stock, 10), // Convert stock to integer
          seller_id: parseInt(seller_id, 10), // Use seller_id as defined in your schema
        },
      });
    } catch (error) {
      throw new Error(`Error in createProduct: ${error.message}`);
    }
  }

  static async update(id, data) {
    try {
      // Ensure id is provided and convert it to an integer
      const productId = parseInt(id, 10);
  
      // Log the parsed productId for debugging
      console.log(`Parsed productId: ${productId}`);
  
      // Check if id is a valid integer
      if (isNaN(productId) || productId <= 0) {
        console.error(`Invalid id provided: ${id}`);
        throw new Error('Invalid id provided');
      }
  
      // Check if the product exists
      const product = await prisma.product.findUnique({ where: { id: productId } });
  
      if (!product) {
        throw new Error(`Product with id ${productId} not found`);
      }
  
      // Extract and convert fields from data
      const { seller_id, price, stock, ...updateData } = data;
  
      // Prepare the update data
      const updatedData = {
        ...updateData,
        ...(price !== undefined && { price: parseFloat(price) }), // Convert price to float if provided
        ...(stock !== undefined && { stock: parseInt(stock, 10) }), // Convert stock to integer if provided
        ...(seller_id !== undefined && { seller_id: parseInt(seller_id, 10) }), // Convert seller_id to integer if provided
      };
  
      // Update the product using Prisma
      const updatedProduct = await prisma.product.update({
        where: { id: productId },
        data: updatedData,
      });
  
      // Log success message
      console.log(`Product with id ${productId} successfully updated`);
  
      return updatedProduct;
    } catch (error) {
      throw new Error(`Error in updateProduct: ${error.message}`);
    }
  }
  
  
  

  static async delete(id) {
    try {
      // Ensure id is provided and convert it to an integer
      const productId = parseInt(id, 10);

      if (!productId || isNaN(productId)) {
        throw new Error('Invalid id provided');
      }

      return await prisma.product.delete({ where: { id: productId } });
    } catch (error) {
      throw new Error(`Error in deleteProduct: ${error.message}`);
    }
  }
}

export { ProductService };
