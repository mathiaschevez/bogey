import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

export const articleRouter = createTRPCRouter({
  saveArticle: publicProcedure
    .input(z.object({ userId: z.string(), title: z.string(), content: z.string(), image: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      if (!input.title || !input.content) return 'Error'
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
            content: input.content,
          }
        })

        return newArticle
      } catch (error) {
        console.log(error)
        return 'Error'
      }
    }),

  publishArticle: publicProcedure
    .input(z.object({ userId: z.string(), title: z.string(), content: z.string(), image: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      if (!input.title || !input.content) return 'Error'
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
            content: input.content,
          }
        })

        return newArticle
      } catch (error) {
        console.log(error)
        return 'Error'
      }
    }),
});
