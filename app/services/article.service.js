import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createArticle = async (data) => {
  const { title, description, imageUrl } = data;
  return await prisma.article.create({
    data: {
      title,
      description,
      imageUrl
    },
  });
};

export const getArticles = async () => {
  return await prisma.article.findMany({
    include: {
      comments: true,
    },
  });
};

export const updateArticle = async (id, data) => {
  return await prisma.article.update({
    where: { id },
    data,
  });
};

export const deleteArticle = async (id) => {
  return await prisma.article.delete({
    where: { id },
  });
};

export const incrementViewCount = async (id) => {
  return await prisma.article.update({
    where: { id },
    data: {
      viewCount: {
        increment: 1
      }
    }
  });
};
