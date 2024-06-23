import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createComment = async (articleId, content) => {
  return await prisma.comment.create({
    data: {
      articleId,
      content
    },
  });
};

export const getCommentsByArticleId = async (articleId) => {
  return await prisma.comment.findMany({
    where: { articleId },
  });
};
