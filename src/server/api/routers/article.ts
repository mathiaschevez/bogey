import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

export const articleRouter = createTRPCRouter({
  createArticle: publicProcedure
    .input(z.object({ title: z.string(), content: z.string(), image: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      const newArticle = await ctx.prisma.article.create({
        data: {
          title: input.title,
          content: input.content,
        }
      })

      return newArticle
    }),
});
