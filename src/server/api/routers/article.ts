import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

export interface ArticleResponse {
  createdAt: Date
  id: string
  image: string | null
  title: string
  updatedAt: Date
  userId: string
}

export const articleRouter = createTRPCRouter({
  getUserArticles: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!input.userId) return 'Error'

      try {
        const articles = await ctx.prisma.article.findMany({
          where: {
            userId: input.userId
          }
        })

        return articles
      } catch (error) {
        console.log(error)
        return 'Error'
      }
    }),

  saveParagraph: publicProcedure
    .input(z.object({ userId: z.string(), title: z.string(), articleId: z.string().optional(), content: z.string(), image: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      if (!input.userId || !input.content) return 'Error'

      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input.userId
        }
      })

      if(!user) return 'Error'

      if (!input.articleId) {
        const newArticle = await ctx.prisma.article.create({
          data: {
            userId: user.id,
            title: input.title,
          }
        })

        const paragraph = await ctx.prisma.paragraph.create({
          data: {
            articleId: newArticle.id,
            content: input.content,
          }
        })

        const updatedArticle = await ctx.prisma.article.update({
          where: {
            id: newArticle.id
          },
          data: {
            paragraphs: { connect: { id: paragraph.id } }
          }
        })

        return updatedArticle as ArticleResponse
      } else {
        const paragraph = await ctx.prisma.paragraph.create({
          data: {
            articleId: input.articleId,
            content: input.content,
          }
        })

        const updatedArticle = await ctx.prisma.article.update({
          where: {
            id: input.articleId
          },
          data: {
            paragraphs: { connect: { id: paragraph.id } }
          }
        })

        return updatedArticle as ArticleResponse
      }
    }),

  publishArticle: publicProcedure
    .input(z.object({ userId: z.string(), title: z.string(), content: z.string(), image: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      if (!input.userId || !input.title) return 'Error'
      try {
        const user = await ctx.prisma.user.findUnique({
          where: {
            id: input.userId
          }
        })

        if(!user) return 'Error'

        const newArticle = await ctx.prisma.article.create({
          data: {
            userId: user.id,
            title: input.title,
          }
        })

        return newArticle
      } catch (error) {
        console.log(error)
        return 'Error'
      }
    }),
});
