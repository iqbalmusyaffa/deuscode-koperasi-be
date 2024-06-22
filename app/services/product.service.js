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
      const productId = parseInt(id, 10);
      if (isNaN(productId) || productId <= 0) {
        throw new Error('Invalid ID provided');
      }

      const product = await prisma.product.findUnique({ where: { id: productId } });
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (error) {
      throw new Error(`Error in getProductById: ${error.message}`);
    }
  }

  static async create(data) {
    try {
      const { seller_id, price, stock, ...productData } = data;
      return await prisma.product.create({
        data: {
          ...productData,
          price: parseFloat(price),
          stock: parseInt(stock, 10),
          seller_id: parseInt(seller_id, 10),
        },
      });
    } catch (error) {
      throw new Error(`Error in createProduct: ${error.message}`);
    }
  }

  static async update(id, data) {
    try {
      const productId = parseInt(id, 10);
      if (isNaN(productId) || productId <= 0) {
        throw new Error('Invalid ID provided. Please provide a positive integer ID.');
      }

      const updatedProduct = await prisma.product.update({
        where: { id: productId },
        data: {
          name: data.name,
          description: data.description,
          price: parseFloat(data.price),
          stock: parseInt(data.stock, 10),
          image: data.image
        },
      });
      return updatedProduct;
    } catch (error) {
      throw new Error(`Error in updateProduct: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      const productId = parseInt(id, 10);
      if (isNaN(productId) || productId <= 0) {
        throw new Error('Invalid ID provided');
      }

      const deletedProduct = await prisma.product.delete({ where: { id: productId } });
      if (!deletedProduct) {
        throw new Error('Product not found');
      }
      return deletedProduct;
    } catch (error) {
      throw new Error(`Error in deleteProduct: ${error.message}`);
    }
  }
}

export { ProductService };
